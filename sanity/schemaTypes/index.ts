import { contactSubmissionType } from "./documents/contactSubmission";
import { eventType } from "./documents/event";
import { newsType } from "./documents/news";
import { newsletterSubscriberType } from "./documents/newsletterSubscriber";
import { publicationType } from "./documents/publication";
import { researchSubmissionType } from "./documents/researchSubmission";

export const schemaTypes = [
  eventType,
  publicationType,
  researchSubmissionType,
  contactSubmissionType,
  newsletterSubscriberType,
  newsType
];
