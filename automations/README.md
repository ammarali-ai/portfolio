# Automations that power this site

Workflows you can import into n8n (or rebuild in Zapier) to connect the portfolio to your tools.

## Portfolio contact → Discord alert

Every message sent through the site's contact form is emailed with Resend **and** forwarded to an
automation webhook, so you get a Discord alert the moment someone gets in touch.

### n8n

1. In n8n: **Workflows → Import from file** and choose `n8n/portfolio-contact-alert.json`.
2. In **Check secret & format**, replace `CHANGE_ME` with a long random string.
3. In **Post to Discord**, replace the URL with your Discord channel webhook URL
   (Discord: _Channel settings → Integrations → Webhooks → New webhook → Copy URL_).
4. Activate the workflow and copy the **Production URL** of the **Contact webhook** node.
5. On the website (`.env.local` locally, or Vercel → Settings → Environment Variables):
   ```
   AUTOMATION_WEBHOOK_URL=<the production URL from step 4>
   AUTOMATION_WEBHOOK_SECRET=<the same string as step 2>
   ```

The workflow rejects calls without the secret, trims long messages, and blocks `@everyone` and other
mentions, so a visitor can't ping your whole server.

### Zapier

1. Create a Zap with the trigger **Webhooks by Zapier → Catch Hook** and copy its URL.
2. Set `AUTOMATION_WEBHOOK_URL` to that URL on the website and send a test message from the contact form.
3. Add any action you like: Discord, Slack, Gmail, Google Sheets (log every enquiry) or a CRM.
   Optionally add a **Filter** step that only continues when the `X-Webhook-Secret` header matches
   `AUTOMATION_WEBHOOK_SECRET`.

### Payload

```json
{
  "event": "contact.submitted",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Hiring for an AI automation role",
  "message": "…",
  "submittedAt": "2026-10-04T12:00:00.000Z",
  "source": "portfolio"
}
```
