import fetch from "node-fetch";

export default async function handler(req, res) {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: "Missing video URL" });

  try {
    const response = await fetch(videoUrl);
    if (!response.ok) throw new Error("Failed to fetch video");

    const buffer = Buffer.from(await response.arrayBuffer());

    res.setHeader("Content-Type", "video/mp4");
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
