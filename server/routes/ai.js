const express = require("express");
const router = express.Router();
// Prefer the platform's global fetch (Node 18+) and fall back to dynamic import of node-fetch
let fetchFn;
if (typeof globalThis.fetch === "function") {
  fetchFn = globalThis.fetch.bind(globalThis);
} else {
  fetchFn = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
}

// Timeout in ms for external API requests
const EXTERNAL_API_TIMEOUT = 30000; // 30s - must be less than Vercel function maxDuration

router.post("/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("AI ERROR: GEMINI_API_KEY not configured");
      return res.status(500).json({ error: "Server misconfiguration: GEMINI_API_KEY missing" });
    }

    // Build Gemini-compatible contents
    const contents = [
      ...history
        .filter((h) => h?.role && h?.parts?.[0]?.text)
        .map((h) => ({
          role: h.role,
          parts: [{ text: h.parts[0].text }],
        })),
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    // Use AbortController to enforce a fetch timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), EXTERNAL_API_TIMEOUT);

    let response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            maxOutputTokens: 1024,
          },
        }),
        signal: controller.signal,
      });
    } catch (err) {
      clearTimeout(timeout);
      if (err.name === "AbortError") {
        console.error("AI ERROR: Gemini request timed out");
        return res.status(504).json({ error: "Upstream request timed out" });
      }
      console.error("AI ERROR: Network error to Gemini API:", err.stack || err.message);
      return res.status(502).json({ error: "Upstream network error" });
    }

    clearTimeout(timeout);

    let data;
    try {
      data = await response.json();
    } catch (err) {
      console.error("AI ERROR: Failed to parse Gemini response", err.stack || err.message);
      return res.status(502).json({ error: "Invalid response from upstream" });
    }

    if (!response.ok) {
      // Log status and a limited view of the response (avoid logging secrets)
      console.error(`Gemini API error: status=${response.status}`, {
        // show top-level keys only to avoid logging long content
        keys: Object.keys(data).slice(0, 5),
        status: response.status,
      });

      return res.status(502).json({ error: "Upstream Gemini API error", details: data });
    }

    // Defensive: ensure structure exists
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) {
      console.error("AI ERROR: Unexpected Gemini response structure", Object.keys(data));
      return res.status(502).json({ error: "Unexpected upstream response" });
    }

    res.json({ reply });
  } catch (err) {
    console.error("AI ERROR:", err.stack || err.message);
    res.status(500).json({ error: "Internal AI handler error" });
  }
});

module.exports = router;
