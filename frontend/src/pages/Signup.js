import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@splidejs/react-splide/css";
import "../css/global.css";
import "../css/signup.css";

const Signup = () => {
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
      }, 100);
  
      window.addEventListener("resize", handleResize);
      handleResize();
  
      // ローディング状態をフェードアウトするタイムアウトを設定
      const loadingTimeoutId = setTimeout(() => setLoadingState(false), 150);
    
      return () => {
          clearTimeout(loadingTimeoutId);
          window.removeEventListener('resize', handleResize);
        };
    }, []);
  

  const handleSignup = async () => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // ユーザー登録成功時の処理
        navigate("/Login");
      } else {
        // ユーザー登録失敗時の処理
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An error occurred during signup.");
    }
  };

  return (
    <div id="sign-up-page">
    <div className={`loading-overlay ${!loadingState ? "fade-Out" : ""}`}></div>
      {showPage && (
        <div id="wrapper">
          <div id="content" className="fade-In">
            {/* <div
            //   className={`tooltip-container ${showTooltip ? "visible" : ""}`}
            >
            </div> */}
            <div className="sign-up-back" style={{ width: `${screenWidth}px` }}>
                <img className="sign-up-image" src="./images/clothes.jpg" alt="logo" style={{ height: `${screenHeight}px`, width: '100%' }} />
                <div className="sign-up-container" />
                    <div className="luck-bag">Luck bag</div>
                    <div className="name-pass-container">
                    <span className="input-items">
                        <label htmlFor='your_name' className='text-sm block'>
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
                        <label htmlFor='password' className='text-sm block'>
                        Password :&thinsp;
                        </label>
                        <input
                            id="password"
                            type="password" // パスワード入力用のフィールドに変更
                            className="transparent-input"
                            placeholder="password1234"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </span>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <div
                    className="sign-up-button"
                    onClick={handleSignup}
                    >
                    <div className="sign-up">Sign up</div>
                    <div/>              
                  </div> 
                </div> 
              </div> 
            </div> 

      )}
    </div>
  );
};

export default Signup;
