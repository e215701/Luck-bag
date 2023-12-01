import React, { useState } from "react";
import OpenAI from "openai";

const openAi = new OpenAI({
  apiKey: process.env.REACT_APP_API_KEY,
  dangerouslyAllowBrowser: true,
});

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [response, setResponse] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    console.log("感想生成中")
    if (!selectedImage) return;

    const base64Str = selectedImage.split(",")[1];
    try {
      // 画像の説明を生成
      const descriptionCompletion = await openAi.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "この画像の服のポイントを簡単に説明して",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Str}`,
                  detail: "low",
                },
              },
            ],
          },
        ],
        max_tokens: 500,
      });

      const description = descriptionCompletion.choices[0].message.content;
      setResponse(description);

      console.log(descriptionCompletion)
      console.log("画像生成中")

      // 生成された説明に基づいて新しい画像を生成
      const imageGenerationCompletion = await openAi.images.generate({
        model: "dall-e-3",
        prompt: "今から送る文章の服を着けたコーディネートの人の全身画像を生成してください。" + description,
        n: 1,
        size: "1024x1024",
        quality: "standard",
      });

      const generatedImageUrl = imageGenerationCompletion.data[0].url;
      setGeneratedImage(generatedImageUrl);

      console.log(imageGenerationCompletion)

    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  return (
    <div className="App">
      <h1>OpenAI Image Description and Generation</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleSubmit}>画像を説明し生成する</button>
      {selectedImage && (
        <div className="preview-container">
          <img src={selectedImage} alt="Selected" className="preview-image" />
        </div>
      )}
      {response && (
        <div className="response-container">
          <h2>説明:</h2>
          <p>{response}</p>
        </div>
      )}
      {generatedImage && (
        <div className="generated-image-container">
          <h2>生成された画像:</h2>
          <img src={generatedImage} alt="Generated" />
        </div>
      )}
    </div>
  );
};

export default App;
