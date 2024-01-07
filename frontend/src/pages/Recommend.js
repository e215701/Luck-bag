import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/global.css";
import "../css/recommend.css";

const Recommend = () => {
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [response, setResponse] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);

  useEffect(() => {
    const imageData = location.state?.image;
    console.log(location.state);
    if (imageData) {
      setSelectedImage(imageData);
      console.log("イメージ設定");
      createCoordinate(imageData);
      console.log("通信開始");
    }
  }, [location.state]);

  const handleClick = () => {
    console.log("ボタンがクリックされました！");
    setResponse(null);
    setGeneratedImage(null);
    createCoordinate(selectedImage);
  };

  const createCoordinate = (imageFile) => {
    fetchData(imageFile);
  };

  const fetchData = async (imageFile) => {
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
      const generatedImageUrl = dataImage.image;
      setGeneratedImage(generatedImageUrl);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  return (
    <>
      {!generatedImage && (
        <div>
          <div className="recommend-page">ローディングアニメーション</div>
        </div>
      )}
      {generatedImage && (
        <div className="recommend-page">
          <div className="recommend-up">
            <img className="recommend-up-image" src={selectedImage}></img>
            <img className="recommend-x" src="./images/x-button.png"></img>
          </div>
          <div className="recommend-code">
            <div className="recommend-headline">おすすめコーデ</div>
            <img className="recommend-code-img" src={generatedImage}></img>
            <div className="recommend-code-bar">
              <div className="recommend-code-recreate">
                <img
                  className="recommend-code-icon"
                  src="./images/recreate-button.png"
                  onClick={handleClick}
                ></img>
                <div className="recommend-code-recreate-text">
                  他のコーデを見る
                </div>
              </div>
              <div className="recommend-code-spacer"></div>
              <a
                className="recommend-icon-container"
                href={generatedImage}
                download
              >
                <img
                  className="recommend-code-icon"
                  src="./images/download-button.png"
                ></img>
              </a>
              <img
                className="recommend-code-icon"
                src="./images/heart-button.png"
              ></img>
            </div>
            <div className="recommend-code-text">{response}</div>
            <button
              className="recommend-code-button"
              onClick={() => navigate("/Top")}
            >
              トップに戻る
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Recommend;
