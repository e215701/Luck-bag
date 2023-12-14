import React, { useState } from "react";

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
    console.log("感想生成中");
    if (!selectedImage) return;

    const base64Str = selectedImage.split(",")[1];
    try {
      const response = await fetch("http://localhost:8080/generateVision", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: selectedImage }),
      });

      const data = await response.json();
      const description = data.choices[0].message.content;
      setResponse(description);

      console.log("画像生成中");

      const responseImage = await fetch("http://localhost:8080/generate", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: description }),
      });

      const dataImage = await responseImage.json();
      console.log(dataImage);
      const generatedImageUrl = dataImage.image.data[0].url;
      setGeneratedImage(generatedImageUrl);

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
