import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@splidejs/react-splide/css";
import "../css/global.css";
import "../css/login.css";

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState(false);
  const [screenHeight, setScreenHeight] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [loadingState, setLoadingState] = useState(true); // trueでロード時の黒画面を示す
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
      setScreenWidth(window.innerWidth);
    };

    const timeoutId = setTimeout(() => {
      setShowPage(true);
    }, 50);

    window.addEventListener("resize", handleResize);
    handleResize();

    // ローディング状態をフェードアウトするタイムアウトを設定
    const loadingTimeoutId = setTimeout(() => setLoadingState(false), 150);

    return () => {
      clearTimeout(loadingTimeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);

        // 認証情報を再取得
        await fetch("/api/authenticate", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // ログイン成功時のリダイレクト先
        navigate("/");

        // ログイン成功時のコールバック（認証情報の更新など）
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        setError("名前もしくはパスワードが違います。");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div id="loginpage">
      <div
        className={`loading-overlay ${!loadingState ? "fade-Out" : ""}`}
      ></div>
      {showPage && (
        <div id="wrapper">
          <div id="content" className="fade-In">
            {/* <div
            //   className={`tooltip-container ${showTooltip ? "visible" : ""}`}
            >
            </div> */}
            <div className="login-back" style={{ width: `${screenWidth}px` }}>
              <img
                className="login-image"
                src="./images/clothes.jpg"
                alt="logo"
                style={{ height: `${screenHeight}px`, width: "100%" }}
              />
              <div className="login-container" />
              <div className="login-luck-bag">Luck bag</div>
              <div className="name-pass-container">
                <span className="input-items">
                  <label htmlFor="your_name" className="text-sm block">
                    Name :&thinsp;
                  </label>
                  <input
                    id="your_name"
                    type="text"
                    className="transparent-input"
                    placeholder="○○ △△"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <p>&nbsp;</p>
                  <label htmlFor="password" className="text-sm block">
                    Password :&thinsp;
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="transparent-input"
                    placeholder="************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </span>
              </div>
              <div className="login-button" onClick={handleLogin}>
                <div className="log-in">Log in</div>
              </div>
              <div
                className="sign-in-button"
                onClick={() => navigate("/Signup")}
              >
                <div className="sign-in">新規登録はこちらから</div>
              </div>
              {error && <div className="error-message">{error}</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
