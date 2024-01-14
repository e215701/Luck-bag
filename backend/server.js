const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const Jimp = require("jimp");
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
  `http://frontend:3000`,
  `http://backend:8080`,
  `http://${process.env.REACT_BASE_URL}:8080`,
];

//console.log(allowedOrigins);
const corsOptions = {
  origin: function (origin, callback) {
    // originが許可されたリストに含まれているか確認
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(origin);
      console.log("Not existing in Origins");
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

const pool = new Pool({
  user: `${process.env.POSTGRES_USER}`,
  host: `db`,
  database: `${process.env.POSTGRES_DB}`,
  password: `${process.env.POSTGRES_PASSWORD}`,
  port: 5432,
});

// JWTの検証と認証ミドルウェア
const authenticateToken = (req, res, next) => {
  console.log("確認中");
  const token = req.header("Authorization");
  console.log(token);
  if (!token) {
    console.log("ログインしていないです。");
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, `${process.env.SECRET_KEY}`, (err, user) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(401).json({ message: "Invalid token" });
    }
    console.log("Token verified successfully");
    console.log(user);
    req.user = user;
    next();
  });
};

const convertPngToJpeg = async (inputBase64) => {
  try {
    const inputImageData = inputBase64;

    // 200KB以下にするための品質設定
    const targetFileSizeInBytes = 200 * 1024; // 200KB
    let quality = 80; // 初期の品質

    // 画像データをBufferに変換
    const inputImageBuffer = Buffer.from(inputImageData, "base64");

    // JPEGファイルに変換して出力
    const outputBase64 = await new Promise((resolve, reject) => {
      Jimp.read(inputImageBuffer)
        .then((image) => {
          // 出力画像の品質を調整
          while (
            Buffer.byteLength(image.bitmap.data) > targetFileSizeInBytes &&
            quality > 10
          ) {
            quality -= 5;
            image.quality(quality);
          }

          // 最終的なJPEGデータをBufferとして取得
          image
            .getBufferAsync(Jimp.MIME_JPEG)
            .then((outputBuffer) => {
              // 最終的なJPEGデータをBase64エンコードして出力
              const outputBase64 = `data:image/jpeg;base64,${outputBuffer.toString(
                "base64"
              )}`;
              resolve(outputBase64);
            })
            .catch((err) => {
              console.error("Error processing image data:", err);
              reject(err);
            });
        })
        .catch((err) => {
          console.error("Error reading image:", err);
          reject(err);
        });
    });

    return outputBase64;
  } catch {
    console.error("convertPNGToJPEGエラー:", error);
    res.status(500).send({
      error: "ファイルの変換で失敗しました。",
      details: error.message,
    });
  }
};

app.post("/api/convertJPEG", async (req, res) => {
  try {
    const inputImageData = req.body.imageData;

    // 400KB以下にするための品質設定
    const targetFileSizeInBytes = 400 * 1024; // 400KB
    let quality = 80; // 初期の品質

    // 画像データをBufferに変換
    const inputImageBuffer = Buffer.from(inputImageData, "base64");

    // JPEGファイルに変換して出力
    Jimp.read(inputImageBuffer)
      .then((image) => {
        // 出力画像の品質を調整
        while (
          Buffer.byteLength(image.bitmap.data) > targetFileSizeInBytes &&
          quality > 10
        ) {
          quality -= 5;
          image.quality(quality);
        }

        // 最終的なJPEGデータをBufferとして取得
        return image.getBufferAsync(Jimp.MIME_JPEG);
      })
      .then((outputBuffer) => {
        // 最終的なJPEGデータをBase64エンコードして出力
        const outputBase64 = `data:image/jpeg;base64,${outputBuffer.toString(
          "base64"
        )}`;

        res.status(200).json({ imageJpeg: outputBase64 });
      })
      .catch((err) => {
        console.error("Error processing image data:", err);
      });
  } catch {
    console.error("convertJPEGエラー:", error);
    res.status(500).send({
      error: "ファイルの変換で失敗しました。",
      details: error.message,
    });
  }
});

// 認証情報を提供するエンドポイント
app.get("/api/authenticate", authenticateToken, (req, res) => {
  res.json({ isAuthenticated: true });
});

const processedRequestsOfVision = new Set();
const processedRequestsOfGenerate = new Set();

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Node.js!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/api/generateVision", async (req, res) => {
  console.log("通信重複確認");
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
    console.log("コーディネート作成中");
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
              image_url: { url: `${url}` },
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

app.post("/api/generate", async (req, res) => {
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
    console.log("画像作成中");
    const prompt = req.body.prompt;
    const gender = req.body.fashion;
    //生成された説明に基づいて新しい画像を生成
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: `#Instruction\nYou are a stylist tasked with envisioning basic fashion. Please generate the best basic fashion coordination based on the following constraints:\n#Constraints\n- Consider the input text\n- Output a full-body image including the person's face\n- The clothing is ${gender}\n- Keep expressions of gender moderate\n#Input Text\n${prompt}\n#Output Image`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      response_format: "b64_json",
    });

    const imageUrl = imageResponse.data[0].b64_json;
    const imageData = imageUrl;
    const imageJpeg = await convertPngToJpeg(imageData);

    if (!imageJpeg) {
      return res.status(500).send({ error: "画像の生成に失敗しました。" });
    }

    processedRequestsOfGenerate.delete(requestBodyHashOfGenerate);

    // 成功した場合、画像URLを含むオブジェクトを返す
    res.status(200).json({ image: imageJpeg });
  } catch (error) {
    res.status(500).send({
      error: "画像の生成に失敗しました。",
      details: error.message,
    });
  }
});

// ユーザー登録のエンドポイント
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // ユーザーが既に存在するか確認
    const userExists = await pool.query(
      "SELECT * FROM accounts WHERE username = $1",
      [username]
    );

    if (userExists.rows.length > 0) {
      // ユーザーが既に存在する場合はエラーを返す
      console.error("Error registering user: Used same username");
      return res
        .status(401)
        .json({ error: "このユーザー名は既に使用されています" });
    }

    // パスワードをハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);
    // PostgreSQLに新しいユーザーを追加

    await pool.query(
      "INSERT INTO accounts (username, password) VALUES ($1, $2)",
      [username, hashedPassword]
    );
    console.log("追加完了");
    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "サーバー側でエラーが発生しました" });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // PostgreSQLでユーザー認証を行う
    const result = await pool.query(
      "SELECT * FROM accounts WHERE username = $1",
      [username]
    );

    if (result.rows.length === 1) {
      console.log("ユーザーが存在します。");
      // パスワードの比較
      const isPasswordValid = await bcrypt.compare(
        password,
        result.rows[0].password
      );

      if (isPasswordValid) {
        console.log("パスワード認証完了");
        // 認証成功時にJWTを発行
        const account_id = result.rows[0].account_id;
        const token = jwt.sign({ account_id }, `${process.env.SECRET_KEY}`);
        res.json({ token });
        console.log("トークン発行完了");
      } else {
        // パスワードが一致しない場合
        res.status(401).json({ error: "パスワードが違います。" });
      }
    } else {
      // ユーザーが存在しない場合
      res.status(401).json({ error: "ユーザーが存在しません。" });
    }
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "サーバー側でエラーが発生しました。" });
  }
});
