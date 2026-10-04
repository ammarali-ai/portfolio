import "server-only";
import { z } from "zod";
import { CONTACT_LIMITS } from "./contact";

/** Server-side validation for the contact form. Limits mirror the form's HTML attributes. */
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(CONTACT_LIMITS.name),
  email: z
    .string()
    .trim()
    .max(CONTACT_LIMITS.email)
    .pipe(z.email("Please enter a valid email address.")),
  subject: z.string().trim().min(1, "Please add a subject.").max(CONTACT_LIMITS.subject),
  message: z
    .string()
    .trim()
    .min(CONTACT_LIMITS.messageMin, "Please write at least a sentence.")
    .max(CONTACT_LIMITS.message),
  /** Honeypot: humans never see or fill this field. */
  company: z.string().max(200).optional(),
});
