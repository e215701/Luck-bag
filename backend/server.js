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
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const PORT = process.env.PORT || 8080;
const allowedOrigins = [
  `http://${process.env.REACT_BASE_URL}:3000`,
  `http://${process.env.REACT_BASE_URL}`,
];

console.log(allowedOrigins);
const corsOptions = {
  origin: function (origin, callback) {
    // originが許可されたリストに含まれているか確認
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
console.log("cors setting complete");

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Node.js!" });
});

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
            {
              type: "text",
              text: "画像の服のを使ったコーディネートを紹介して",
            },
            {
              type: "image_url",
              image_url: { url: `data:image/jpeg;base64,${url}` },
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
