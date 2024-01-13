import React, { useState, useEffect} from "react";
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
          window.removeEventListener('resize', handleResize);
        };
  
      
    }, []);

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
                            id='your_name'
                            type='text'
                            className="transparent-input"
                            placeholder='○○ △△'
                            />
                        <p>&nbsp;</p>
                        <label htmlFor='password' className='text-sm block'>
                        Password :&thinsp;
                        </label>
                            <input
                            id="password"
                            type="password"
                            className="transparent-input"
                            placeholder='************'
                            />
                    </span>
                    </div>
                    <div
                    className="sign-up-button"
                    onClick={() => navigate("/")}
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
