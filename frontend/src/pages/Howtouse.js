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
        </ul>
      </header>
      <div className="howtouse-howtouse">
        <div className="howtouse-item-container">
          <div className="howtouse-item-headline">
            ハンバーガーメニューについて
          </div>
          <div className="howtouse-item-text">ハンバーガーメニューを押すと</div>
          <div className="howtouse-item-text">・TOPページ</div>
          <div className="howtouse-item-text">・UPLOADページ</div>
          <div className="howtouse-item-text">・HISTORYページ</div>
          <div className="howtouse-item-text">・HOW TO USEページ</div>
          <div className="howtouse-item-text">に移動することができます。</div>
          <img
            className="howtouse-item-image"
            src="./images/howtouse-img1.png"
          ></img>
        </div>
        <div className="howtouse-item-container">
          <div className="howtouse-item-headline">UPLOADページについて</div>
          <div className="howtouse-item-text">
            UPLOADページでは、洋服の写真をアップロードすると、その洋服を使ったおすすめコーディネートを見ることができます。
          </div>
        </div>
        <div className="howtouse-item-container">
          <div className="howtouse-item-headline">
            おすすめコーディネートの見方
          </div>
          <div className="howtouse-item-text">
            ①UPLOADページで「写真をアップロードする」ボタンをタップ
          </div>
          <img
            className="howtouse-item-image"
            src="./images/howtouse-img2.png"
          ></img>
          <div className="howtouse-item-text">
            ②洋服が写っている写真をアップロード
          </div>
          <div className="howtouse-item-text">
            ③お勧めコーディネートの画像が表示されます。
          </div>
          <img
            className="howtouse-item-image"
            src="./images/howtouse-img3.png"
          ></img>
          <div className="howtouse-item-text">
            「他のコーデを見る」をタップすると新しいコーディネートを見ることができます。
          </div>
        </div>
      </div>
    </>
  );
};

export default Howtouse;
