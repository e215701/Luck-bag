import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/global.css";
import "../css/recommend.css";
import animation1 from "../gif/Luck-bag_Animation_v3_1.gif";
import animation2 from "../gif/Luck-bag_Animation_v3_2.gif";


const Recommend = () => {
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [response, setResponse] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);

  // 初期値に画像を設定
  // const [generatedImage, setGeneratedImage] = useState("./images/clothes.jpg");
  const [isChecked, setIsChecked] = useState(true);
  const imgElement = document.getElementById("heart-icon");
  const [showPage, setShowPage] = useState(false);
  const [screenHeight, setScreenHeight] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);

  // GIFのパスを配列として定義
  const gifs = [
    animation1,
    animation2 // 仮の2つ目のGIFパスを設定
    ];
    
  // useStateを追加して選択されたGIFを管理
  const [selectedGif, setSelectedGif] = useState(gifs[0]);

  useEffect(() => {
    const imageData = location.state?.image;
    if (imageData) {
      setSelectedImage(imageData);
      console.log("イメージ設定");
      createCoordinate(imageData);
      console.log("通信開始");
    }

    const handleResize = () => {
      setScreenHeight(window.innerHeight);
      setScreenWidth(window.innerWidth);
    };
    // 0.5秒後にページを表示するように設定
    const timeoutId = setTimeout(() => {
      setShowPage(true);
    }, 2500);

    window.addEventListener("resize", handleResize);

    // 最初の一回だけ取得する
    handleResize();

    const cleanupFunctions = () => {
      // コンポーネントがアンマウントされたらここでリスナーを削除
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId); // タイムアウトのクリアもここで行う
      textItems.forEach((text) => {
        observer.unobserve(text);
      });
    };

    // 監視対象の要素を取得
    const textItems = document.querySelectorAll(".fade-text");

    // 監視対象の要素に対する処理
    const showElements = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 監視対象の条件を満たしたら .reveal を追加
          entry.target.classList.add("reveal");
        } else {
          // 監視対象の条件から外れたら .reveal を削除
          // ※アニメーションを繰り返さない場合はコメントアウト
          entry.target.classList.remove("reveal");
        }
      });
    };
    // 監視対象が到達したとみなす条件
    const options = {
      rootMargin: "0px",
      threshold: 1.0, // [0-1]
    };

    const observer = new IntersectionObserver(showElements, options);

    // 対象要素すべてについて監視を開始
    textItems.forEach((text) => {
      observer.observe(text);
    });

    const newSelectedGif = gifs[Math.floor(Math.random() * gifs.length)];
    setSelectedGif(newSelectedGif);
    console.log(Math.floor(Math.random() * gifs.length), newSelectedGif)

    return () => cleanupFunctions; // コンポーネントがアンマウントされたらクリア
  }, [location.state]);

  const handleClick = () => {
    console.log("ボタンがクリックされました！");
    setResponse(null);
    setGeneratedImage(null);
    createCoordinate(selectedImage);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      console.log("checked");
      if (imgElement) {
        imgElement.src = "./images/pushed-heart-icon.png"; // 新しい画像のパスに変更してください
      }
    } else {
      imgElement.src = "./images/heart-icon.png";
    }
  };

  const createCoordinate = (imageFile) => {
    // fetchData(imageFile);
  };

  const fetchData = async (imageFile) => {
    console.log("感想生成中");

    const base64 = imageFile.split(",")[1];

    try {
      const imageResponse = await fetch("/api/convertJPEG", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageData: base64 }),
      });

      const base64img = await imageResponse.json();
      const base64Str = base64img.imageJpeg; //生成前の画像データ
      console.log(base64img);

      const response = await fetch(`/api/generateVision`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: base64Str }),
      });

      const data = await response.json();
      const description = data.choices[0].message.content; //生成されたコーデの文章
      setResponse(description);

      console.log("画像生成中");

      const responseImage = await fetch(`/api/generate`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: description }),
      });

      const dataImage = await responseImage.json();
      console.log(dataImage);
      const generatedImageUrl = dataImage.image;
      setGeneratedImage(generatedImageUrl); //生成されたコーデの画像
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  return (
    <>
      {!generatedImage && (
        // <div>
        //   <div className="recommend-page">ローディングアニメーション</div>
        // </div>

        <div className="loading-animation">
            <img
                className="loading-icon"
                src={selectedGif} // srcをselectedGifに設定してランダムなGIFを表示
                alt="loading animation"
                style={{
                height: `${screenHeight}px`,
                width: `${screenWidth}px`,
                }}
            />
            {/* New div for loading text */}
            <div className="load-text">
                Now Loading...
            </div>
        </div>
      )}
      {generatedImage && (
        <div className="recommend-page">
          <div className="recommend-up">
            <img className="recommend-up-image" src={selectedImage}></img>
            <img
              className="recommend-x"
              src="./images/x-button.png"
              onClick={() => navigate("/Upload")}
            ></img>
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
              <input
                type="checkbox"
                className="recommend-heart-btn"
                id="heart-btn"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="heart-btn" className="recommend-icon-container">
                <img
                  className="recommend-heart-icon"
                  src="./images/heart-icon.png"
                  id="heart-icon"
                />
              </label>
            </div>
            <div className="recommend-code-text">{response}</div>
            <button
              className="recommend-code-button"
              onClick={() => navigate("/")}
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
