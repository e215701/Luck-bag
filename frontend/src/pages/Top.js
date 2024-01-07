


import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useNavigate } from "react-router-dom";
import "@splidejs/react-splide/css";
import "../css/global.css";
import "../css/top.css";

const Toppage = () => {
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState(false);
  const [screenHeight, setScreenHeight] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);

  // GIFのパスを配列として定義
  const gifs = [
    "./images/Luck-Bag_Animation_v2_1.gif",
    "./images/Luck-Bag_Animation_v2_2.gif" // 仮の2つ目のGIFパスを設定
  ];

  // useStateを追加して選択されたGIFを管理
  const [selectedGif, setSelectedGif] = useState(gifs[0]);


  useEffect(() => {
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

    // GIFをランダムに選択する処理を追加
    setSelectedGif(gifs[Math.floor(Math.random() * gifs.length)]);

    return () => cleanupFunctions; // コンポーネントがアンマウントされたらクリア
  }, []);

  return (
    <div id="toppage">
      <div className={`loading-icon-container ${showPage ? "fade-out" : ""}`}>
        <img
          className="loading-icon"
          src={selectedGif} // srcをselectedGifに設定してランダムなGIFを表示
          alt="loading animation"
          style={{
            height: `${screenHeight}px`,
            width: `${screenWidth}px`,
          }}
        />
      </div>
      {/* <> */}

      {/* <> */}

      {showPage && (
        <div id="wrapper">
          <div id="content" className="fade-in">
            <header class="header">
              <div class="navtext-container">
                <div class="navtext">LuckBag</div>
              </div>
              <input type="checkbox" class="menu-btn" id="menu-btn" />
              <label for="menu-btn" class="menu-icon">
                <span class="navicon"></span>
              </label>
              <ul class="menu">
                <li class="top">
                  <a onClick={() => navigate("/")}>TOP</a>
                </li>
                <li>
                  <a onClick={() => navigate("/Upload")}>UPLOAD</a>
                </li>
                <li>
                  <a onClick={() => navigate("/History")}>HISTORY</a>
                </li>
                <li>
                  <a onClick={() => navigate("/Howtouse")}>HOW TO USE</a>
                </li>
                <li>
                  <a onClick={() => navigate("/Home")}>HOME</a>
                </li>
              </ul>
            </header>

            <div
              className="top-top"
              style={{
                width: `${screenWidth}px`,
              }}
            >
              <Splide
                className="top-image-container"
                aria-label="私のお気に入りの画像集"
                options={{
                  rewind: true,
                  autoplay: true, // 自動再生を有効
                  interval: 5000, // 自動再生の間隔を3秒に設定
                  arrows: false,
                }}
              >
                <SplideSlide>
                  <img
                    className="top-image"
                    src="./images/clothes1.jpg"
                    alt="服1"
                    style={{
                      height: `${screenHeight}px`,
                      width: `${screenWidth}px`,
                    }}
                  />
                </SplideSlide>
                <SplideSlide>
                  <img
                    className="top-image"
                    src="./images/clothes2.jpeg"
                    alt="服2"
                    style={{
                      height: `${screenHeight}px`,
                      width: `${screenWidth}px`,
                    }}
                  />
                </SplideSlide>
                <SplideSlide>
                  <img
                    className="top-image"
                    src="./images/clothes3.jpg"
                    alt="服3"
                    style={{
                      height: `${screenHeight}px`,
                      width: `${screenWidth}px`,
                    }}
                  />
                </SplideSlide>
              </Splide>

              <div className="fade-text">
                <div className="top-item-headline">PRODUCT</div>
                <div className="top-item-text">
                  "LuckBag"は、手持ちの洋服を活用したいけれど、どうコーディネートしたらいいか迷っている方々のためのWebアプリです。シンプルなデザインが好きな方にぴったり。日常のスタイリングをもっと楽しく、おしゃれにアップデートしましょう。
                </div>
              </div>
              <div className="fade-text">
                <div className="top-item-headline">LUCK BAGの特徴</div>
                <div className="top-item-container">
                  <div className="top-item-text-title">コーディネート提案</div>
                  <div className="top-item-text">
                    コーディネートの組み方を知りたい手持ちの洋服の写真から、その服を使ったベーシックなコーデをAIが提案します。
                  </div>
                </div>
                <div className="top-item-container">
                  <div className="top-item-text-title">
                    ファッションの知識不要
                  </div>
                  <div className="top-item-text">
                    洋服の形や素材などの、特徴について入力が不要で、どなたでも簡単にお使いいただけるアプリです。
                  </div>
                </div>
                <div className="top-item-container">
                  <div className="top-item-text-title">新しい着こなし方</div>
                  <div className="top-item-text">
                    今までしたことがなかったコーディネートを知るきっかけになります。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Toppage;

