import fetch from "node-fetch";

export default async function handler(req, res) {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: "URL ausente." });

  try {
    const response = await fetch(videoUrl);
    if (!response.ok) throw new Error("Erro ao acessar o vídeo.");

    const buffer = Buffer.from(await response.arrayBuffer());
    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Disposition", 'attachment; filename="video.mp4"');
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
