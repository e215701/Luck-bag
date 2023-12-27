const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const crypto = require("crypto");
const http = require("http");
const WebSocket = require("ws");
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

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
    // メッセージを処理したり、クライアントに返信したりする処理を記述
    ws.send("Server received your message");
  });

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
  });
});

server.listen(8080, () => {
  console.log("WebSocket server is running on port 8080");
});

const processedRequestsOfVision = new Set();
const processedRequestsOfGenerate = new Set();

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Node.js!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/generateVision", async (req, res) => {
  // リクエストボディからユニークな識別子を生成（ここでは簡単なハッシュを使用）
  const requestBodyHashOfVision = crypto
    .createHash("sha256")
    .update(JSON.stringify(req.body))
    .digest("hex");

  // ユニークなIDが既に処理されたリクエストのセットに含まれているか確認
  if (processedRequestsOfVision.has(requestBodyHashOfVision)) {
    return;
  }

  // 新しいリクエストIDをセットに追加
  processedRequestsOfVision.add(requestBodyHashOfVision);

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
              text: "#Instruction\nYou are a stylist tasked with creating a basic fashion look. Please output the best basic fashion coordinates considering the following constraints:\n#Constraints\n- Take into account the given clothing\n- Keep the text within approximately 200 characters\n- Keep the language concise\n- Output in Japanese\n#Output",
            },
            {
              type: "image_url",
              image_url: { url: `data:image/jpeg;base64,${url}` },
            },
          ],
        },
      ],
      max_tokens: 500,
    });
    processedRequestsOfVision.delete(requestBodyHashOfVision);
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
  // リクエストボディからユニークな識別子を生成（ここでは簡単なハッシュを使用）
  const requestBodyHashOfGenerate = crypto
    .createHash("sha256")
    .update(JSON.stringify(req.body))
    .digest("hex");

  // ユニークなIDが既に処理されたリクエストのセットに含まれているか確認
  if (processedRequestsOfGenerate.has(requestBodyHashOfGenerate)) {
    return;
  }

  // 新しいリクエストIDをセットに追加
  processedRequestsOfGenerate.add(requestBodyHashOfGenerate);

  try {
    const prompt = req.body.prompt;
    //生成された説明に基づいて新しい画像を生成
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: `#Instruction\nYou are a stylist who specializes in creating basic fashion. Please generate the best basic fashion coordinate based on the following constraints:\n#Constraints\n- Consider the input text\n- Output a full-body image, including the person's face\n#Input Text\n${prompt}\n#Output Image`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    const imageUrl = imageResponse;
    if (!imageUrl) {
      return res.status(500).send({ error: "画像の生成に失敗しました。" });
    }

    processedRequestsOfGenerate.delete(requestBodyHashOfGenerate);

    // 成功した場合、画像URLを含むオブジェクトを返す
    res.status(200).json({ image: imageUrl });
  } catch (error) {
    res.status(500).send({
      error: "画像の生成に失敗しました。",
      details: error.message,
    });
  }
});
