import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/download", async (req, res) => {
  try {
    const videoUrl = req.query.url;
    if (!videoUrl) return res.status(400).send("URL ausente.");

    const response = await fetch(videoUrl);
    if (!response.ok) throw new Error("Erro ao acessar.");

    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Disposition", "attachment; filename=video.mp4");

    response.body.pipe(res);
  } catch (err) {
    console.error("Erro:", err);
    res.status(500).send("Erro ao baixar.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Proxy na porta ${PORT}`));

