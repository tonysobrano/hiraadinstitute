"use client";

import { useActionState, useEffect, useRef } from "react";

import { submitContactMessage, type PublicFormState } from "@/app/actions/forms";

interface ContactFormContent {
  fullNameLabel: string;
  fullNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  organizationLabel: string;
  organizationPlaceholder: string;
  interestLabel: string;
  interestPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  note: string;
  success: string;
  interests: string[];
}

interface ContactFormProps {
  content: ContactFormContent;
}

const initialState: PublicFormState = {
  status: "idle",
  message: ""
};

export function ContactForm({ content }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(submitContactMessage, initialState);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form ref={formRef} className="contact-form" action={formAction}>
      <input
        className="form-honeypot"
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <div className="contact-form-grid">
        <label className="contact-form-field">
          <span>{content.fullNameLabel}</span>
          <input
            name="fullName"
            type="text"
            autoComplete="name"
            required
            placeholder={content.fullNamePlaceholder}
          />
        </label>

        <label className="contact-form-field">
          <span>{content.emailLabel}</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder={content.emailPlaceholder}
          />
        </label>

        <label className="contact-form-field">
          <span>{content.organizationLabel}</span>
          <input
            name="organization"
            type="text"
            autoComplete="organization"
            placeholder={content.organizationPlaceholder}
          />
        </label>

        <label className="contact-form-field">
          <span>{content.interestLabel}</span>
          <select name="interest" required defaultValue="">
            <option value="">{content.interestPlaceholder}</option>
            {content.interests.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="contact-form-field">
        <span>{content.messageLabel}</span>
        <textarea
          name="message"
          required
          rows={6}
          placeholder={content.messagePlaceholder}
        />
      </label>

      <div className="contact-form-actions">
        <button type="submit" className="btn btn-primary contact-form-submit" disabled={isPending}>
          {isPending ? "Sending…" : content.submitLabel}
        </button>
        <p className="contact-form-note">{content.note}</p>
      </div>

      {state.status !== "idle" ? (
        <p
          className={state.status === "success" ? "form-message form-message--success" : "form-message form-message--error"}
          role={state.status === "error" ? "alert" : "status"}
        >
          {state.message || content.success}
        </p>
      ) : null}
    </form>
  );
}
