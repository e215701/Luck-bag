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
            <img
              className="login-image"
              src="./images/clothes.jpg"
              alt="logo"
              style={{ height: `${screenHeight}`, width: `${screenWidth}px` }}
            />
            <div
              className="login-back"
              style={{ height: `${screenHeight}`, width: `${screenWidth}px` }}
            >
              <div className="login-luck-bag">Luck bag</div>
              <div className="login-container">
                <div className="login-input-container">
                  <label htmlFor="your_name" className="login-text">
                    Name&thinsp;:
                  </label>
                  <input
                    id="your_name"
                    type="text"
                    className="login-transparent-input"
                    placeholder="○○ △△"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="login-input-container">
                  <label htmlFor="password" className="login-text">
                    Password&thinsp;:
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="login-transparent-input"
                    placeholder="************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="login-error-message">{error ? error : ""}</div>
              <div className="login-button" onClick={handleLogin}>
                <div className="log-in">Log in</div>
              </div>
              <div
                className="sign-in-button"
                onClick={() => navigate("/Signup")}
              >
                <div className="sign-in">新規登録はこちらから</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
