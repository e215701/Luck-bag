import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "@splidejs/react-splide/css";
import "../css/global.css";
import "../css/login.css";

const Loginpage = () => {
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState(false);
  const [screenHeight, setScreenHeight] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
//   const [showTooltip, setShowTooltip] = useState(true);

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
    
  }, []);

  return (
    <div id="loginpage">
      {showPage && (
        <div id="wrapper">
          <div id="content" className="fade-in">
            {/* <div
            //   className={`tooltip-container ${showTooltip ? "visible" : ""}`}
            >
            </div> */}
            <div className="login-back" style={{ width: `${screenWidth}px` }}>
                <img className="login-image" src="./images/clothes.jpg" alt="logo" style={{ height: `${screenHeight}px`, width: '100%' }} />
                <div className="login-container" />
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
                        <label htmlFor='email' className='text-sm block'>
                        Password :&thinsp;
                        </label>
                            <input
                            id='email'
                            type='text'
                            className="transparent-input"
                            placeholder='test@example.com'
                            />
                    </span>
                    </div>
                    <div
                    className="login-button"
                    onClick={() => navigate("/")}
                    >
                    <div className="log-in">Log in</div>
                    <div/>
        
                {/* <div className="login-text-container">
                    <div className="login-text">
                    <span>Luckbag</span>
                    
                    <div className="name-pass-container">
                    <span className="name-pass-container1">
                    <p className="name-">{`Name: _________________ `}</p>
                    <p className="name-">&nbsp;</p>
                    <p className="name-">{`Password: _________________ `}</p>
                    </span>
                    <div className="iphone-14-15-pro-max-18-item" />
                    <div className="log-in">Log in</div>
                    </div>  */}
                    



        {/* <div
            className={`loading-icon-container ${showPage ? "fade-in" : ""}`}
            style={{ width: `${screenWidth}px`, height: `${screenHeight}px` }}
        >
            <div
              className="login-back"
              style={{
                width: `${screenWidth}px`,
              }}
            >
            <img className="loading-image" src="./images/clothes.jpg" alt="logo" />
            <div className="loading-icon">
            <div className="loading-text">
                <span>Luckbag</span>
            </div>
            <div className="loading-text">
                日常のスタイリングを<br></br>もっと楽しく、おしゃれに
            </div>
            </div>
        </div> */}
                

                {/* <div className="iphone-14-15-pro-max-18">
                <img className="clothes-1-icon" alt="" src="/clothes-1@2x.png" />
                <div className="iphone-14-15-pro-max-18-child" />
                <div className="luck-bag">Luck bag</div>
                <div className="name-pass-container">
                    <span className="name-pass-container1">
                    <p className="name-">{`Name: _________________ `}</p>
                    <p className="name-">&nbsp;</p>
                    <p className="name-">Password: ______________</p>
                    </span>
                </div>
                <div className="iphone-14-15-pro-max-18-item" />
                <div className="log-in">Log in</div>
                </div> */}


              {/* <div
                className="fade-text"
                ref={(el) => textItemsRef.current.push(el)}
              >
                <div className="top-item-headline">PRODUCT</div>
                <div className="top-item-text">
                  "LuckBag"は、手持ちの洋服を活用したいけれど、どうコーディネートしたらいいか迷っている方々のためのWebアプリです。シンプルなデザインが好きな方にぴったり。日常のスタイリングをもっと楽しく、おしゃれにアップデートしましょう。
                </div>
              </div> */}
              {/* <div
                className="fade-text"
                ref={(el) => textItemsRef.current.push(el)}
              >
                <div className="top-item-headline">
                  <span className="luckbag"> Luck Bag</span>の特徴
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
                </div> */}
            </div> 
            </div> 
          </div> 
        </div> 
      )}
    </div>
  );
};

export default Loginpage;
