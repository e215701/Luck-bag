import React, { useState, useEffect, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useNavigate } from "react-router-dom";
import "@splidejs/react-splide/css";
import "../css/global.css";
import "../css/top.css";
import "../css/custom-style.css";

const Toppage = () => {
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState(false);
  const [screenHeight, setScreenHeight] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [showTooltip, setShowTooltip] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const textItemsRef = useRef([]);

  const clickLoginIcon = () => {
    if (!isAuthenticated) {
      navigate("/Login");
      console.log("loginしていません");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
      setScreenWidth(window.innerWidth);
    };

    const timeoutId = setTimeout(() => {
      setShowPage(true);
    }, 500);

    window.addEventListener("resize", handleResize);
    handleResize();

    const cleanupFunctions = () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        } else {
          entry.target.classList.remove("fade-in");
        }
      });
    };

    const observerOptions = {
      rootMargin: "0px",
      threshold: 0.5, // 画面内に50%以上入ったら発火
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (textItemsRef.current.length > 0) {
      textItemsRef.current.forEach((text) => {
        observer.observe(text);
      });
    }

    const fetchAuthenticatedStatus = async () => {
      try {
        const response = await fetch("/api/authenticate", {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(data.isAuthenticated);
          setShowTooltip(false);
        }
      } catch (error) {
        console.error("Error fetching authentication status:", error);
      }
    };

    fetchAuthenticatedStatus();

    return cleanupFunctions;
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("ログアウトしますか？");

    if (confirmLogout) {
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      window.alert("ログアウト完了しました。");

      // Topページを再読み込み
      window.location.reload();
    }
    // キャンセルの場合は何もしない
  };

  return (
    <div id="toppage">
      <div
        className={`loading-icon-container ${showPage ? "fade-out" : ""}`}
        style={{
          width: `${screenWidth}px`,
          height: `${screenHeight}px`,
        }}
      >
        <img className="loading-image" src="./images/clothes.jpg" alt="logo" />
        <div className="loading-icon">
          <div className="loading-text">
            <span>Luck bag</span>
          </div>
          <div className="loading-text">
            日常のスタイリングを<br></br>もっと楽しく、おしゃれに
          </div>
        </div>
      </div>
      {/* <> */}

      {/* <> */}

      {showPage && (
        <div id="wrapper">
          <div id="content" className="fade-in">
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
                    <button onClick={() => navigate("/History")}>
                      HISTORY
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigate("/Howtouse")}>
                      HOW TO USE
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={
                        isAuthenticated
                          ? handleLogout
                          : () => navigate("/Login")
                      }
                    >
                      {isAuthenticated ? "LOGOUT" : "LOGIN"}
                    </button>
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
                    : "./images/login-icon-solid.png"
                }
                alt="login icon"
                onClick={() => clickLoginIcon()}
              />
            </header>

            <div
              className={`tooltip-container ${showTooltip ? "visible" : ""}`}
            >
              <span
                className="close-button"
                onClick={() => setShowTooltip(false)}
              >
                ×
              </span>
              <div className="tooltip-content">
                <div className="top-item-text">初めての方へ🔰</div>
                <div className="top-item-text">
                  使い方は
                  <span
                    className="colored"
                    onClick={() => navigate("/Howtouse")}
                  >
                    ココをタップ
                  </span>
                  👆
                </div>
              </div>
            </div>

            <div
              className="top-upload-button"
              onClick={() => navigate("/Upload")}
            >
              <img
                className="top-upload-button-icon"
                src="./images/upload-button.png"
              ></img>
            </div>

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

              <div
                ref={(el) => textItemsRef.current.push(el)}
                className="fade-text"
              >
                <div className="top-item-headline">PRODUCT</div>
                <div className="top-item-text">
                  "<span>Luckbag</span>
                  "は、手持ちの洋服を活用したいけれど、どうコーディネートしたらいいか迷っている方々のためのWebアプリです。シンプルなデザインが好きな方にぴったり。日常のスタイリングをもっと楽しく、おしゃれにアップデートしましょう。
                </div>
              </div>
              <div
                ref={(el) => textItemsRef.current.push(el)}
                className="fade-text"
              >
                <div className="top-item-headline">
                  <span className="luckbag"> Luck bag</span>の特徴
                </div>
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
