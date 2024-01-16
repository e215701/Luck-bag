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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const clickLoginIcon = () => {
    if (!isAuthenticated) {
      navigate("/Login");
      console.log("loginしていません");
    }
  };

  const fetchAuthenticatedStatus = async () => {
    try {
      const response = await fetch("/api/authenticate", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setIsAuthenticated(data.isAuthenticated);
      }
    } catch (error) {
      console.error("Error fetching authentication status:", error);
    }
  };

  fetchAuthenticatedStatus();
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
            Luck bag
          </button>
        </div>
        <img
          className="top-login-icon"
          src={
            isAuthenticated
              ? "./images/login-icon.png"
              : "./images/login-icon-dash.png"
          }
          alt="login icon"
          onClick={() => clickLoginIcon()}
        />
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
              ②UPLOADページでどのスタイルのコーデが見たいか選択します。
            </div>
            <img
              className="howtouse-item-image"
              src="./images/howtouse-img2.png"
            ></img>
            <div className="howtouse-item-text">
              ③カメラアイコンをタップして洋服が写っている写真をアップロードした後、送信ボタンを押します。
            </div>
            <img
              className="howtouse-item-image"
              src="./images/howtouse-img3.png"
            ></img>
            <div className="howtouse-item-text">
              ④お勧めコーディネートの画像が表示されます。
            </div>
            <div className="howtouse-item-text">
              「他のコーデを見る」をタップすると新しいコーディネートを見ることができます。
              <br></br>
              ♡ボタンを押すとコーデをお気に入り登録することが出来ます。<br></br>
              画像をダウンロードすることもできます。
            </div>

            <img
              className="howtouse-item-image"
              src="./images/howtouse-img4.png"
            ></img>
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
              src="./images/howtouse-img5.png"
            ></img>
          </div>
        </div>
      </body>
    </>
  );
};

export default Howtouse;
