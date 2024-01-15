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
        <div className="top-hum-icon">
          <input type="checkbox" class="menu-btn" id="menu-btn" />
          <label for="menu-btn" class="menu-icon">
            <span class="navicon"></span>
          </label>
          <ul class="menu">
            <div className="menu-spacer"></div>
            <li>
              <button onClick={() => navigate("/")}>TOP</button>
            </li>
            <li>
              <button onClick={() => navigate("/Upload")}>UPLOAD</button>
            </li>
            <li>
              <button onClick={() => navigate("/History")}>HISTORY</button>
            </li>
            <li>
              <button onClick={() => navigate("/Howtouse")}>HOW TO USE</button>
            </li>
          </ul>
        </div>
        <div class="navtext-container">
          <button class="navtext" onClick={() => navigate("/")}>
            Luck Bag
          </button>
        </div>
        <img className="top-login-icon" src="./images/login-icon.png"></img>
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
