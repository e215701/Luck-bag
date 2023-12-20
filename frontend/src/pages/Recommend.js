import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const Recommend = () => {
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [response, setResponse] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    const imageData = location.state?.image;
    console.log(location.state);
    if (imageData) {
      setSelectedImage(imageData);
      console.log("イメージ設定");
      if (!connecting) {
        fetchData(imageData);
        setConnecting(true);
        console.log("通信開始");
      }
    }
  }, [location.state]);

  const handleClick = () => {
    console.log("ボタンがクリックされました！");
    setResponse(null);
    setGeneratedImage(null);
    fetchData(selectedImage);
  };

  const fetchData = async (imageFile) => {
    
    if (!imageFile || connecting) return;
    setConnecting(true); 
    console.log("感想生成中");

    const base64Str = imageFile.split(",")[1];

    try {
      const response = await fetch(`http://${baseURL}:8080/generateVision`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: base64Str }),
      });

      const data = await response.json();
      const description = data.choices[0].message.content;
      setResponse(description);

      console.log("画像生成中");

      const responseImage = await fetch(`http://${baseURL}:8080/generate`, {
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
      setConnecting(false);
    }
    setConnecting(false);
  };



  return (
    <div className="App">
      <h1>コーディネートを紹介するページ</h1>
      {selectedImage && (
        <div>
          <h2>アップロードした画像</h2>
          <img src={selectedImage} alt="Uploaded" width="200" height="60" />
        </div>
      )}
      {response && (
        <div>
          <h2>コーディネートの特徴</h2>
          {response}
        </div>
      )}
      {generatedImage && (
        <div>
          <h2>生成された画像</h2>
          <img src={generatedImage} alt="Generated" width="200" height="60" />
          <div>
            <a href={generatedImage} download>
              <button style={{ padding: "5px" }}>画像をダウンロード</button>
            </a>
          </div>
          <div>
            <button onClick={handleClick}>再生成する</button>
          </div>
        </div>
      )}
      
      <Link to={`/`}>TOP</Link>
    </div>
  );
};

export default Recommend;
