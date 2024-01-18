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
  const [selectedGender, setSelectedGender] = useState("");
  const [response, setResponse] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [pushedHurtButton, setPushedHurtButton] = useState(false);
  const [generatedImageID, setGeneratedImageID] = useState(-1);

  // 初期値に画像を設定
  // const [generatedImage, setGeneratedImage] = useState("./images/clothes.jpg");
  const [isChecked, setIsChecked] = useState(false);
  const [imgSrc, setImgSrc] = useState("./images/heart-icon.png");
  const [showPage, setShowPage] = useState(false);
  const [screenHeight, setScreenHeight] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);

  // GIFのパスを配列として定義
  const gifs = [
    animation1,
    animation2, // 仮の2つ目のGIFパスを設定
  ];

  // useStateを追加して選択されたGIFを管理
  const [selectedGif, setSelectedGif] = useState(gifs[0]);

  useEffect(() => {
    const imageData = location.state?.image;
    const gender = location.state?.gender;
    if (imageData && gender) {
      setSelectedImage(imageData);
      setSelectedGender(gender);
      console.log("イメージ設定");
      createCoordinate(imageData, gender);
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

    return () => cleanupFunctions; // コンポーネントがアンマウントされたらクリア
  }, [location.state]);

  const handleClick = () => {
    console.log("再作成開始");
    setResponse(null);
    setGeneratedImage(null);
    setPushedHurtButton(false);
    setImgSrc("./images/heart-icon.png");
    createCoordinate(selectedImage, selectedGender);
  };

  const handleCheckboxChange = async () => {
    if (!pushedHurtButton) {
      setIsChecked(!isChecked);
      if (!isChecked) {
        console.log("checked");
        setImgSrc("./images/pushed-heart-icon.png");
        setPushedHurtButton(true);
        try {
          const favoriteResponse = await fetch("/api/changeFavorite", {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageID: generatedImageID }),
          });

          if (favoriteResponse.ok) {
            console.log(favoriteResponse.message);
          }
        } catch (error) {
          console.error("Error fetching response:", error);
        }
      } else {
        console.log("not checked");
        setImgSrc("./images/heart-icon.png");
      }
    }
  };

  const createCoordinate = (imageFile, gender) => {
    fetchData(imageFile, gender);
  };

  const fetchData = async (imageFile, gender) => {
    console.log("fetchData開始");

    const base64 = imageFile.split(",")[1];

    try {
      // 画像データをサーバーに送信し、サーバーでデータベースに追加
      const responseProcess = await fetch("/api/processImage", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageData: base64,
          gender: gender,
        }),
      });

      const processData = await responseProcess.json();
      setSelectedImage(processData.before_image);
      setResponse(processData.description);
      setGeneratedImage(processData.after_image);

      console.log("生成終了");
      // 画像データをサーバーに送信し、サーバーでデータベースに追加
      const token = localStorage.getItem("token");

      // 画像データをサーバーに送信し、サーバーでデータベースに追加
      const responseDatabase = await fetch("/api/addToDatabase", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          before_image: processData.before_image,
          after_image: processData.after_image,
          is_favorite: "f",
          description: processData.description,
        }),
      });

      const dataDatabase = await responseDatabase.json();
      setGeneratedImageID(dataDatabase.id);
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
          <div className="load-text">Now Loading...</div>
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
              <div className="recommend-code-recreate" onClick={handleClick}>
                <img
                  className="recommend-code-icon"
                  src="./images/recreate-button.png"
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
                  className="recommend-download-icon"
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
                  src={imgSrc}
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
