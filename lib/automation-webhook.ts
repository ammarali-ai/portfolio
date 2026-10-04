import "server-only";

/**
 * Forwards site events to an automation platform (n8n Webhook node or Zapier "Catch Hook").
 * Configure AUTOMATION_WEBHOOK_URL (and optionally AUTOMATION_WEBHOOK_SECRET, sent as the
 * X-Webhook-Secret header so the workflow can reject forged calls).
 * An importable n8n workflow lives in automations/n8n/portfolio-contact-alert.json.
 */
export interface ContactEvent {
  event: "contact.submitted";
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  source: "portfolio";
}

export function automationWebhookConfigured(): boolean {
  return Boolean(process.env.AUTOMATION_WEBHOOK_URL);
}

/** Returns true when the webhook accepted the event. Never throws. */
export async function sendToAutomation(payload: ContactEvent): Promise<boolean> {
  const url = process.env.AUTOMATION_WEBHOOK_URL;
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.AUTOMATION_WEBHOOK_SECRET
          ? { "X-Webhook-Secret": process.env.AUTOMATION_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) console.error("[automation] webhook responded", res.status);
    return res.ok;
  } catch (err) {
    console.error("[automation] webhook failed", err instanceof Error ? err.name : err);
    return false;
  }
}
