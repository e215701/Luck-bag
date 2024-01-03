import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@splidejs/react-splide/css";
import "../css/global.css";
import "../css/top.css";
import "../css/howtouse.css";

const Howtouse = () => {
  const navigate = useNavigate();
  const [screenHeight, setScreenHeight] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    // 画面サイズの取得
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
      setScreenWidth(window.innerWidth);
    };
  }, []);
  return (
    <>
      <header class="header">
        <div class="navtext-container">
          <div class="navtext" onClick={() => navigate("/")}>
            LuckBag
          </div>
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
        </ul>
      </header>
      <body>
        <div className="howtouse-howtouse">
          <div className="howtouse-item-container">
            <div className="howtouse-item-headline">
              おすすめコーディネートの見方
            </div>
            <div className="howtouse-item-text">①UPLOADページを開きます。</div>
            <img
              className="howtouse-item-image"
              src="./images/howtouse-img1.png"
            ></img>
            <div className="howtouse-item-text">
              ②UPLOADページで「写真をアップロードする」ボタンをタップ
            </div>
            <img
              className="howtouse-item-image"
              src="./images/howtouse-img2.png"
            ></img>
            <div className="howtouse-item-text">
              ③洋服が写っている写真をアップロード
            </div>
            <div className="howtouse-item-text">
              ④お勧めコーディネートの画像が表示されます。
            </div>
            <img
              className="howtouse-item-image"
              src="./images/howtouse-img3.png"
            ></img>
            <div className="howtouse-item-text">
              「他のコーデを見る」をタップすると新しいコーディネートを見ることができます。
            </div>
          </div>
          <div className="howtouse-item-container">
            <div className="howtouse-item-headline">コーデの履歴</div>
            <div className="howtouse-item-text">
              これまでにAIがお勧めしたコーデはHISTORYページで見ることができます。
              <br></br>
              日付で並び変えたり、お気に入りで絞り込むことが出来ます。
            </div>
            <img
              className="howtouse-item-image"
              src="./images/howtouse-img4.png"
            ></img>
          </div>
        </div>
      </body>
    </>
  );
};

export default Howtouse;
