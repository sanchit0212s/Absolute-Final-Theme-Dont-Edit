import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body as { email?: string };
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Valid email required" });
  }

  const adminApiKey = process.env.SHOPIFY_ADMIN_API_KEY;
  const shopDomain = process.env.SHOPIFY_STORE_DOMAIN;

  if (!adminApiKey || !shopDomain) {
    console.error("Missing SHOPIFY_ADMIN_API_KEY or SHOPIFY_STORE_DOMAIN env vars");
    return res.status(500).json({ error: "Server misconfigured" });
  }

  const url = `https://${shopDomain}/admin/api/2025-07/customers.json`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": adminApiKey,
    },
    body: JSON.stringify({
      customer: {
        email,
        tags: "quiz-lead",
        email_marketing_consent: {
          state: "subscribed",
          opt_in_level: "single_opt_in",
        },
      },
    }),
  });

  if (response.status === 422) {
    // Shopify returns 422 with errors when email already exists
    const body = await response.json();
    const errors = (body as any)?.errors?.email;
    if (errors && errors.some((e: string) => e.includes("taken"))) {
      return res.status(409).json({ error: "Email already subscribed" });
    }
    return res.status(422).json({ error: "Invalid data" });
  }

  if (!response.ok) {
    console.error("Shopify Admin API error", response.status, await response.text());
    return res.status(500).json({ error: "Failed to subscribe" });
  }

  return res.status(200).json({ success: true });
}
