import ytdl from "@distube/ytdl-core";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL não fornecida" });
  }

  try {
    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality: "highest" });

    res.setHeader("Content-Disposition", `attachment; filename="video.mp4"`);
    res.setHeader("Content-Type", "video/mp4");

    ytdl(url, { format }).pipe(res);
  } catch (error) {
    console.error("Erro no download:", error);
    res.status(500).json({ error: "Falha ao baixar o vídeo" });
  }
}
