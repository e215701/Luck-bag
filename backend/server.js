const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config({ path: "./.env.local" });

const app = express();
const port = 8080;
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cors());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Node.js!" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/generateVision", async (req, res) => {
  try {
    const url = req.body.url;
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "What’s in this image?" },
            {
              type: "image_url",
              image_url: { url: url },
            },
          ],
        },
      ],
    });
    res.send(response);
  } catch (error) {
    console.error("generateVisionエラー:", error);
    res.status(500).send({
      error: "説明文の生成に失敗しました。",
      details: error.message,
    });
  }
});

app.post("/generate", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    //生成された説明に基づいて新しい画像を生成
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt:
        "今から送る文章の服を着けたコーディネートの人の全身画像を生成してください。" +
        prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    const imageUrl = imageResponse;
    if (!imageUrl) {
      return res.status(500).send({ error: "画像の生成に失敗しました。" });
    }

    // 成功した場合、画像URLを含むオブジェクトを返す
    res.status(200).json({ image: imageUrl });
  } catch (error) {
    res.status(500).send({
      error: "画像の生成に失敗しました。",
      details: error.message,
    });
  }
});
