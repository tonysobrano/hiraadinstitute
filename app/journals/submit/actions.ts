"use server";

import { createClient } from "@sanity/client";

interface SubmissionState {
  status: "idle" | "success" | "error";
  message: string;
  reference?: string;
}

const MAX_FILE_SIZE = 4 * 1024 * 1024;
const acceptedExtensions = [".pdf", ".doc", ".docx"];
const acceptedMimeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
]);

function readText(formData: FormData, name: string, maxLength: number): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function hasAcceptedFileType(file: File): boolean {
  const lowerName = file.name.toLowerCase();
  const hasAcceptedExtension = acceptedExtensions.some((extension) => lowerName.endsWith(extension));
  return hasAcceptedExtension && (!file.type || acceptedMimeTypes.has(file.type));
}

function safeFilename(filename: string): string {
  return filename
    .normalize("NFKD")
    .replace(/[^\w.\- ]+/g, "")
    .replace(/\s+/g, "-")
    .slice(-120);
}

export async function submitResearch(
  _previousState: SubmissionState,
  formData: FormData
): Promise<SubmissionState> {
  if (readText(formData, "website", 200)) {
    return { status: "success", message: "Your submission has been received." };
  }

  const fullName = readText(formData, "fullName", 120);
  const email = readText(formData, "email", 180).toLowerCase();
  const organization = readText(formData, "organization", 180);
  const country = readText(formData, "country", 100);
  const manuscriptTitle = readText(formData, "manuscriptTitle", 240);
  const topic = readText(formData, "topic", 120);
  const manuscriptType = readText(formData, "manuscriptType", 100);
  const coAuthors = readText(formData, "coAuthors", 1200);
  const abstract = readText(formData, "abstract", 5000);
  const keywords = readText(formData, "keywords", 500);
  const methodology = readText(formData, "methodology", 1500);
  const funding = readText(formData, "funding", 1000);
  const conflicts = readText(formData, "conflicts", 1000);
  const coverNote = readText(formData, "coverNote", 2500);
  const manuscript = formData.get("manuscript");
  const originalityConfirmed = formData.get("originalityConfirmed") === "on";
  const reviewConsent = formData.get("reviewConsent") === "on";

  if (
    !fullName ||
    !email ||
    !organization ||
    !country ||
    !manuscriptTitle ||
    !topic ||
    !manuscriptType ||
    !abstract ||
    !keywords
  ) {
    return { status: "error", message: "Please complete all required fields before submitting." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  if (!originalityConfirmed || !reviewConsent) {
    return { status: "error", message: "Please confirm both submission declarations." };
  }

  if (!(manuscript instanceof File) || manuscript.size === 0) {
    return { status: "error", message: "Please attach your manuscript." };
  }

  if (!hasAcceptedFileType(manuscript)) {
    return { status: "error", message: "The manuscript must be a PDF, DOC, or DOCX file." };
  }

  if (manuscript.size > MAX_FILE_SIZE) {
    return { status: "error", message: "The manuscript must be 4 MB or smaller." };
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "jn5vyvdg";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!token) {
    console.error("Research submission failed: SANITY_API_WRITE_TOKEN is not configured.");
    return {
      status: "error",
      message: "Submissions are temporarily unavailable. Please email info@hiraadinstitute.org."
    };
  }

  const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01",
    useCdn: false
  });

  let uploadedAssetId: string | undefined;

  try {
    const submissionUuid = crypto.randomUUID();
    const reference = `HIR-${new Date().getUTCFullYear()}-${submissionUuid.slice(0, 8).toUpperCase()}`;
    const asset = await client.assets.upload("file", manuscript, {
      filename: safeFilename(manuscript.name),
      contentType: manuscript.type || undefined
    });
    uploadedAssetId = asset._id;

    await client.create({
      _id: `drafts.researchSubmission.${submissionUuid}`,
      _type: "researchSubmission",
      reference,
      status: "new",
      submittedAt: new Date().toISOString(),
      fullName,
      email,
      organization,
      country,
      manuscriptTitle,
      topic,
      manuscriptType,
      coAuthors,
      abstract,
      keywords,
      methodology,
      funding,
      conflicts,
      coverNote,
      originalityConfirmed,
      reviewConsent,
      manuscript: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: asset._id
        }
      }
    });

    return {
      status: "success",
      message: "Your manuscript has been submitted for editorial review.",
      reference
    };
  } catch (error) {
    console.error("Research submission failed.", error);

    if (uploadedAssetId) {
      try {
        await client.delete(uploadedAssetId);
      } catch (cleanupError) {
        console.error("Could not clean up an incomplete submission upload.", cleanupError);
      }
    }

    return {
      status: "error",
      message: "We could not submit your manuscript. Please try again or email info@hiraadinstitute.org."
    };
  }
}
