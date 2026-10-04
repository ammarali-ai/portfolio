/** Contact form limits and types, shared by client and server (no zod, so the client bundle stays small). */
export const CONTACT_LIMITS = {
  name: 200,
  email: 200,
  subject: 200,
  message: 4000,
  messageMin: 10,
} as const;

export type ContactField = "name" | "email" | "subject" | "message";

export interface ContactResponse {
  ok?: boolean;
  error?: string;
  fields?: Partial<Record<ContactField, string[]>>;
}
