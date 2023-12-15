import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import "@splidejs/react-splide/css";
import "../css/global.css";
import "../css/top.css";

const Toppage = () => {
  const [showPage, setShowPage] = useState(false);
  const [screenHeight, setScreenHeight] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
      setScreenWidth(window.innerWidth);
    };
    // 0.5秒後にページを表示するように設定
    const timeoutId = setTimeout(() => {
      setShowPage(true);
    }, 500);

    window.addEventListener("resize", handleResize);

    // 最初の一回だけ取得する
    handleResize();

    const cleanupFunctions = () => {
      // コンポーネントがアンマウントされたらここでリスナーを削除
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId); // タイムアウトのクリアもここで行う
    };
    return () => cleanupFunctions; // コンポーネントがアンマウントされたらクリア
  }, []);

  return (
    <div id="toppage">
      <div className={`loading-icon-container ${showPage ? "fade-out" : ""}`}>
        <img
          className="loading-icon"
          src="./images/icon1.png"
          width="auto"
          height="auto"
          alt="logo"
        />
      </div>
      {/* <> */}

      {/* <> */}

      {showPage && (
        <div id="wrapper">
          <div id="content" className="fade-in">
            {/* <div className="header">LuckBag</div> */}
            <header class="header">
              <div class="navtext-container">
                <div class="navtext">company</div>
              </div>
              <input type="checkbox" class="menu-btn" id="menu-btn" />
              <label for="menu-btn" class="menu-icon">
                <span class="navicon"></span>
              </label>
              <ul class="menu">
                <li class="top">
                  <a href="#home">home</a>
                </li>
                <li>
                  <a href="#skills">skills</a>
                </li>
                <li>
                  <a href="#projects">projects</a>
                </li>
                <li>
                  <a href="#contact">contact</a>
                </li>
              </ul>
            </header>

            <div className="top-top">
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
                    src="https://www.pakutaso.com/shared/img/thumb/shikun20220402_114719-2_TP_V.jpg"
                    alt="かわいい猫の画像 part1"
                    style={{
                      height: `${screenHeight}px`,
                      width: `${screenWidth}px`,
                    }}
                  />
                </SplideSlide>
                <SplideSlide>
                  <img
                    className="top-image"
                    src="https://www.pakutaso.com/shared/img/thumb/shikun20220402_122123_TP_V.jpg"
                    alt="かわいい猫の画像 part2"
                    style={{
                      height: `${screenHeight}px`,
                      width: `${screenWidth}px`,
                    }}
                  />
                </SplideSlide>
                <SplideSlide>
                  <img
                    className="top-image"
                    src="https://www.pakutaso.com/shared/img/thumb/sikun_20220402-180657-2_TP_V.jpg"
                    alt="かわいい猫の画像 part3"
                    style={{
                      height: `${screenHeight}px`,
                      width: `${screenWidth}px`,
                    }}
                  />
                </SplideSlide>
              </Splide>

              <div className="top-item-container">
                <div className="top-item-headline">PRODUCT</div>
                <div className="top-item-text">
                  "LuckBag"は、手持ちの洋服を活用したいけれど、どうコーディネートしたらいいか迷っている方々のためのWebアプリです。シンプルなデザインが好きな方にぴったり。日常のスタイリングをもっと楽しく、おしゃれにアップデートしましょう。
                </div>
              </div>
              <div className="top-item-container">
                <div className="top-item-headline">LUCK BAGの特徴</div>
                <div className="top-item-text">
                  UPROADを押すと、写真に写っている服を使ったおすすめコーデを見ることができます。
                </div>
                <div className="top-item-text">
                  HISTORYでは、これまでのコーデの履歴を見ることができます。
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
