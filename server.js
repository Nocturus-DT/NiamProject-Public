import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.get("/privado", async (req, res) => {
  const response = await fetch(
    "https://github.com/Nocturus-DT/NiamProject-Private/blob/main/index.html",
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json"
      }
    }
  );

  if (!response.ok) {
    return res.status(500).send("Erro ao buscar arquivo");
  }

  const data = await response.json();

  const html = Buffer.from(data.content, "base64").toString("utf-8");

  res.send(html);
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
