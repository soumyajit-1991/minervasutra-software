const express = require("express");
const router = express.Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

router.post("/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Build Gemini-compatible contents
    const contents = [
      ...history
        .filter(h => h?.role && h?.parts?.[0]?.text)
        .map(h => ({
          role: h.role,
          parts: [{ text: h.parts[0].text }],
        })),
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
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
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);
      return res.status(500).json(data);
    }

    res.json({
      reply: data.candidates[0].content.parts[0].text,
    });
  } catch (err) {
    console.error("AI ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
