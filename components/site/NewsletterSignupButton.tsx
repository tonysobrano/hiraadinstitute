"use client";

import { useActionState, useId, useRef } from "react";

import { subscribeToNewsletter, type PublicFormState } from "@/app/actions/forms";

interface NewsletterSignupButtonProps {
  label: string;
}

const initialState: PublicFormState = {
  status: "idle",
  message: ""
};

export function NewsletterSignupButton({ label }: NewsletterSignupButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, initialState);

  const openModal = () => {
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <button className="btn btn-outline-light" type="button" onClick={openModal}>
        {label}
      </button>

      <dialog
        ref={dialogRef}
        className="newsletter-modal"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeModal();
          }
        }}
      >
        <div className="newsletter-modal-card">
          <button
            className="newsletter-modal-close"
            type="button"
            onClick={closeModal}
            aria-label="Close newsletter signup"
          >
            ×
          </button>

          {state.status === "success" ? (
            <div className="newsletter-modal-success" role="status">
              <span aria-hidden="true">✓</span>
              <p className="eyebrow eyebrow--accent">SUBSCRIPTION CONFIRMED</p>
              <h2 id={titleId}>You’re on the list</h2>
              <p id={descriptionId}>{state.message}</p>
              <button className="btn btn-dark" type="button" onClick={closeModal}>
                Done
              </button>
            </div>
          ) : (
            <>
              <p className="eyebrow eyebrow--accent">HIRAAD UPDATES</p>
              <h2 id={titleId}>Stay informed</h2>
              <p id={descriptionId} className="newsletter-modal-description">
                Get new research, policy insights, publications, and event updates from Hiraad Institute.
              </p>

              <form className="newsletter-form" action={formAction}>
                <input
                  className="form-honeypot"
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <label className="contact-form-field">
                  <span>Email address</span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="name@example.com"
                    required
                    autoFocus
                  />
                </label>
                <p className="newsletter-form-privacy">
                  By subscribing, you agree to receive Hiraad Institute news and updates. You can unsubscribe at
                  any time.
                </p>
                <button className="btn btn-dark newsletter-form-submit" type="submit" disabled={isPending}>
                  {isPending ? "Subscribing…" : "Subscribe"}
                </button>
                {state.status === "error" ? (
                  <p className="form-message form-message--error" role="alert">
                    {state.message}
                  </p>
                ) : null}
              </form>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
