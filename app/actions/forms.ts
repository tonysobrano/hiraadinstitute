"use server";

import { createHash, randomUUID } from "node:crypto";

import { createClient } from "@sanity/client";
import { Resend } from "resend";

export interface PublicFormState {
  status: "idle" | "success" | "error";
  message: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const defaultNotificationEmail = "info@hiraadinstitute.org";

function readText(formData: FormData, name: string, maxLength: number): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function getSanityWriteClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId || !token) {
    return null;
  }

  return createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    token,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01",
    useCdn: false
  });
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      })[character] ?? character
  );
}

function getResendNotificationConfig(toEnvName: "CONTACT_NOTIFICATION_EMAIL" | "NEWSLETTER_NOTIFICATION_EMAIL") {
  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env[toEnvName] ?? defaultNotificationEmail;

  if (!resendApiKey || !from) {
    return null;
  }

  return {
    resend: new Resend(resendApiKey),
    from,
    to
  };
}

export async function subscribeToNewsletter(
  _previousState: PublicFormState,
  formData: FormData
): Promise<PublicFormState> {
  if (readText(formData, "company", 200)) {
    return { status: "success", message: "You’re subscribed. Thank you for joining us." };
  }

  const email = readText(formData, "email", 180).toLowerCase();

  if (!emailPattern.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const client = getSanityWriteClient();

  if (!client) {
    console.error("Newsletter signup failed: Sanity write credentials are not configured.");
    return {
      status: "error",
      message: "Subscriptions are temporarily unavailable. Please try again later."
    };
  }

  try {
    const now = new Date().toISOString();
    const emailHash = createHash("sha256").update(email).digest("hex");
    const documentId = `newsletterSubscriber.${emailHash}`;

    await client.createIfNotExists({
      _id: documentId,
      _type: "newsletterSubscriber",
      email,
      status: "subscribed",
      source: "website-cta",
      subscribedAt: now,
      lastSubscribedAt: now
    });

    await client
      .patch(documentId)
      .set({
        email,
        status: "subscribed",
        source: "website-cta",
        lastSubscribedAt: now,
        notificationStatus: "pending"
      })
      .setIfMissing({ subscribedAt: now })
      .commit();

    const notificationConfig = getResendNotificationConfig("NEWSLETTER_NOTIFICATION_EMAIL");

    if (!notificationConfig) {
      console.warn("Newsletter notification skipped: Resend credentials are not configured.");
      await client.patch(documentId).set({ notificationStatus: "notConfigured" }).commit().catch(console.error);
      return { status: "success", message: "You’re subscribed. Thank you for joining us." };
    }

    try {
      const result = await notificationConfig.resend.emails.send({
        from: notificationConfig.from,
        to: notificationConfig.to,
        subject: `New Hiraad newsletter signup: ${email}`,
        text: [
          "New Hiraad newsletter signup",
          "",
          `Email: ${email}`,
          `Source: website-cta`,
          `Subscribed at: ${now}`
        ].join("\n"),
        html: `
          <h2>New Hiraad newsletter signup</h2>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Source:</strong> website-cta</p>
          <p><strong>Subscribed at:</strong> ${escapeHtml(now)}</p>
        `
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      await client
        .patch(documentId)
        .set({
          notificationStatus: "sent",
          notificationId: result.data?.id
        })
        .commit();
    } catch (error) {
      console.error("Newsletter signup was saved, but its email notification failed.", error);
      await client.patch(documentId).set({ notificationStatus: "failed" }).commit().catch(console.error);
    }

    return { status: "success", message: "You’re subscribed. Thank you for joining us." };
  } catch (error) {
    console.error("Newsletter signup failed.", error);
    return {
      status: "error",
      message: "We couldn’t save your subscription. Please try again."
    };
  }
}

export async function submitContactMessage(
  _previousState: PublicFormState,
  formData: FormData
): Promise<PublicFormState> {
  if (readText(formData, "website", 200)) {
    return { status: "success", message: "Thank you. Your message has been received." };
  }

  const fullName = readText(formData, "fullName", 120);
  const email = readText(formData, "email", 180).toLowerCase();
  const organization = readText(formData, "organization", 180);
  const interest = readText(formData, "interest", 160);
  const message = readText(formData, "message", 5000);

  if (!fullName || !email || !interest || !message) {
    return { status: "error", message: "Please complete all required fields." };
  }

  if (!emailPattern.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const client = getSanityWriteClient();

  if (!client) {
    console.error("Contact submission failed: Sanity write credentials are not configured.");
    return {
      status: "error",
      message: "The contact form is temporarily unavailable. Please email info@hiraadinstitute.org."
    };
  }

  const submissionId = randomUUID();
  const documentId = `contactSubmission.${submissionId}`;
  const reference = `CONTACT-${new Date().getUTCFullYear()}-${submissionId.slice(0, 8).toUpperCase()}`;

  try {
    await client.create({
      _id: documentId,
      _type: "contactSubmission",
      reference,
      status: "new",
      submittedAt: new Date().toISOString(),
      fullName,
      email,
      organization,
      interest,
      message,
      source: "website-contact-form",
      notificationStatus: "pending"
    });
  } catch (error) {
    console.error("Contact submission could not be saved.", error);
    return {
      status: "error",
      message: "We couldn’t send your message. Please try again or email info@hiraadinstitute.org."
    };
  }

  const notificationConfig = getResendNotificationConfig("CONTACT_NOTIFICATION_EMAIL");

  if (!notificationConfig) {
    console.warn("Contact notification skipped: Resend credentials are not configured.");
    await client.patch(documentId).set({ notificationStatus: "notConfigured" }).commit().catch(console.error);
    return { status: "success", message: "Thank you. Your message has been received." };
  }

  try {
    const result = await notificationConfig.resend.emails.send({
      from: notificationConfig.from,
      to: notificationConfig.to,
      replyTo: email,
      subject: `${reference}: ${interest}`,
      text: [
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Organization: ${organization || "Not provided"}`,
        `Interest: ${interest}`,
        "",
        message
      ].join("\n"),
      html: `
        <h2>New Hiraad website inquiry</h2>
        <p><strong>Reference:</strong> ${escapeHtml(reference)}</p>
        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Organization:</strong> ${escapeHtml(organization || "Not provided")}</p>
        <p><strong>Interest:</strong> ${escapeHtml(interest)}</p>
        <h3>Message</h3>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    await client
      .patch(documentId)
      .set({
        notificationStatus: "sent",
        notificationId: result.data?.id
      })
      .commit();
  } catch (error) {
    console.error("Contact submission was saved, but its email notification failed.", error);
    await client.patch(documentId).set({ notificationStatus: "failed" }).commit().catch(console.error);
  }

  return { status: "success", message: "Thank you. Your message has been received." };
}
