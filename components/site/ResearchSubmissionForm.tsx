"use client";

import { type ChangeEvent, useActionState, useEffect, useRef, useState } from "react";
import { CheckCircle2, FileText, UploadCloud } from "lucide-react";
import { useFormStatus } from "react-dom";

import { submitResearch } from "@/app/journals/submit/actions";

const initialState = {
  status: "idle" as const,
  message: ""
};

const topics = [
  "Governance and public institutions",
  "Peace, security, and conflict",
  "Economic development and livelihoods",
  "Climate, environment, and natural resources",
  "Education and human capital",
  "Public health and social policy",
  "Gender, youth, and social inclusion",
  "Migration, displacement, and urbanization",
  "Technology, data, and innovation",
  "Other policy-relevant research"
];

const manuscriptTypes = [
  "Research paper",
  "Policy brief",
  "Journal article",
  "Working paper",
  "Case study",
  "Literature review"
];

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="btn btn-primary research-submit-button" type="submit" disabled={pending}>
      {pending ? "Uploading manuscript…" : "Submit manuscript"}
    </button>
  );
}

export function ResearchSubmissionForm() {
  const [state, formAction] = useActionState(submitResearch, initialState);
  const [fileLabel, setFileLabel] = useState("No file selected");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      setFileLabel("No file selected");
    }
  }, [state.status]);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileLabel(file ? `${file.name} · ${(file.size / 1024 / 1024).toFixed(2)} MB` : "No file selected");
  };

  return (
    <form ref={formRef} action={formAction} className="research-submission-form">
      <input
        className="research-form-honeypot"
        type="text"
        name="website"
        hidden
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <fieldset className="research-form-section">
        <legend>
          <span>01</span>
          Corresponding author
        </legend>
        <p className="research-form-section-copy">Tell the editorial team who should receive updates about this submission.</p>

        <div className="research-form-grid">
          <label className="contact-form-field">
            <span>Full name *</span>
            <input name="fullName" type="text" autoComplete="name" maxLength={120} required placeholder="Your full name" />
          </label>

          <label className="contact-form-field">
            <span>Email address *</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              maxLength={180}
              required
              placeholder="name@example.com"
            />
          </label>

          <label className="contact-form-field">
            <span>Institution or organization *</span>
            <input
              name="organization"
              type="text"
              autoComplete="organization"
              maxLength={180}
              required
              placeholder="University, institute, or organization"
            />
          </label>

          <label className="contact-form-field">
            <span>Country or region *</span>
            <input name="country" type="text" maxLength={100} required placeholder="Country or region" />
          </label>
        </div>
      </fieldset>

      <fieldset className="research-form-section">
        <legend>
          <span>02</span>
          Research details
        </legend>
        <p className="research-form-section-copy">
          Provide the information editors need to assess fit, relevance, and review requirements.
        </p>

        <label className="contact-form-field">
          <span>Manuscript title *</span>
          <input name="manuscriptTitle" type="text" maxLength={240} required placeholder="Full title of your paper" />
        </label>

        <div className="research-form-grid">
          <label className="contact-form-field">
            <span>Primary topic *</span>
            <select name="topic" required defaultValue="">
              <option value="" disabled>
                Select a research topic
              </option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </label>

          <label className="contact-form-field">
            <span>Manuscript type *</span>
            <select name="manuscriptType" required defaultValue="">
              <option value="" disabled>
                Select a manuscript type
              </option>
              {manuscriptTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="contact-form-field">
          <span>Co-authors</span>
          <textarea
            name="coAuthors"
            rows={3}
            maxLength={1200}
            placeholder="List each co-author’s full name and affiliation, one per line"
          />
        </label>

        <label className="contact-form-field">
          <span>Abstract *</span>
          <textarea
            name="abstract"
            rows={8}
            maxLength={5000}
            required
            placeholder="Summarize the research question, methods, main findings, and policy relevance"
          />
        </label>

        <label className="contact-form-field">
          <span>Keywords *</span>
          <input
            name="keywords"
            type="text"
            maxLength={500}
            required
            placeholder="For example: governance, livelihoods, Somali Region"
          />
        </label>

        <label className="contact-form-field">
          <span>Methodology or data sources</span>
          <textarea
            name="methodology"
            rows={4}
            maxLength={1500}
            placeholder="Briefly describe the research design, data sources, fieldwork, or analytical approach"
          />
        </label>
      </fieldset>

      <fieldset className="research-form-section">
        <legend>
          <span>03</span>
          Disclosures and manuscript
        </legend>
        <p className="research-form-section-copy">
          Include funding and conflicts so the editorial team can assess the submission transparently.
        </p>

        <div className="research-form-grid">
          <label className="contact-form-field">
            <span>Funding or support</span>
            <textarea
              name="funding"
              rows={4}
              maxLength={1000}
              placeholder="Name funders or write “None”"
            />
          </label>

          <label className="contact-form-field">
            <span>Conflicts of interest</span>
            <textarea
              name="conflicts"
              rows={4}
              maxLength={1000}
              placeholder="Describe any conflicts or write “None”"
            />
          </label>
        </div>

        <label className="contact-form-field">
          <span>Note to the editorial team</span>
          <textarea
            name="coverNote"
            rows={4}
            maxLength={2500}
            placeholder="Why is this work a strong fit for Hiraad’s journals and policy audience?"
          />
        </label>

        <div className="research-file-field">
          <span className="research-file-title">Manuscript file *</span>
          <label className="research-file-drop">
            <input
              name="manuscript"
              type="file"
              required
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={onFileChange}
            />
            <UploadCloud aria-hidden="true" />
            <strong>Choose your manuscript</strong>
            <small>PDF, DOC, or DOCX · maximum 4 MB</small>
            <span className="research-file-name">
              <FileText aria-hidden="true" />
              {fileLabel}
            </span>
          </label>
        </div>

        <div className="research-form-declarations">
          <label>
            <input name="originalityConfirmed" type="checkbox" required />
            <span>
              I confirm this is original work, all authors have approved the submission, and it is not under
              review elsewhere.
            </span>
          </label>
          <label>
            <input name="reviewConsent" type="checkbox" required />
            <span>I consent to Hiraad storing this information and manuscript for editorial review.</span>
          </label>
        </div>
      </fieldset>

      <div className="research-form-footer">
        <SubmitButton />
        <p>
          Your file and details go directly to Hiraad’s editorial workspace. Required fields are marked with an
          asterisk.
        </p>
      </div>

      {state.status !== "idle" ? (
        <div
          className={`research-form-alert research-form-alert--${state.status}`}
          role={state.status === "error" ? "alert" : "status"}
        >
          {state.status === "success" ? <CheckCircle2 aria-hidden="true" /> : null}
          <div>
            <strong>{state.status === "success" ? "Submission received" : "Submission not completed"}</strong>
            <p>{state.message}</p>
            {state.reference ? (
              <p>
                Reference: <b>{state.reference}</b>. Save this number for follow-up.
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </form>
  );
}
