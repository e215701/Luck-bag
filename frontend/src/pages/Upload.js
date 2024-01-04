import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../css/global.css";
import "../css/upload.css";

const Upload = () => {
  const navigate = useNavigate();
  const [imageData, setImageData] = useState(null);
  const [screenHeight, setScreenHeight] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    if (imageData) {
        goToRecommend();
      }
    

    const handleResize = () => {
      setScreenHeight(window.innerHeight);
      setScreenWidth(window.innerWidth);
    };

    
    window.addEventListener("resize", handleResize);

    // 最初の一回だけ取得する
    handleResize();

    const cleanupFunctions = () => {
      // コンポーネントがアンマウントされたらここでリスナーを削除
      window.removeEventListener("resize", handleResize);
    };
    return () => cleanupFunctions; // コンポーネントがアンマウントされたらクリア
}, [imageData]);



  const onFileChange = (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageData(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageData(null);
    }
  };

  const goToRecommend = () => {
    navigate("/Recommend", { state: { image: imageData } });
  };

  return (
    // <div className="upload-upload">
    //   <div className="header">LuckBag</div>
    //   <div className="upload-container">
    //     <label
    //       htmlFor="upload"
    //       // style={{
    //       //   alignItems: "center",
    //       //   outline: "2px solid blue",
    //       // }}
    //     >
        //   <div className="upload-picture-container">
        //     <img className="upload-picture" alt="" src={imageData}></img>
        //     <input
        //       id="upload"
        //       type="file"
        //       name="image"
        //       accept="image/*"
        //       onChange={onFileChange}
        //       style={{ display: "none" }}
        //     />
        //   </div>
    //     </label>

    //     <button className="upload-button" onClick={goToRecommend}>
    //       Coordinate
    //     </button>
    //   </div>

    //   {/* {imageData && (
    //     <div>
    //       <img src={imageData} alt="Uploaded" width="200" height="60" />
    //     </div>
    //   )} */}
    // </div>
    <div id="upload-page">
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

            <div className="upload-page"
                style={{
                  width: `${screenWidth}px`,
                }}
            >

            <img
                    className="upload-image"
                    src="./images/image-12_1.jpeg"
                    alt="image1"
                    style={{
                      height: `${screenHeight}px`,
                      width: `${screenWidth}px`,
                    }}
                  />

              <div className="upload-item-container">
                <div className="upload-item-headline">写真のポイント</div>
                <div className="upload-item-text-center">
                  服の形がはっきりとわかる写真にしましょう。
                </div>
              </div>
              <div className="upload-item-container">
                <div className="upload-item-text-center">
                  <p>写真に複数の服が写っていると、</p>
                  <p>うまくいかない場合があります。</p>                
                </div>
                <div className="upload-item-container">
                {/* <button className="upload-button" onClick={goToRecommend}>
                    写真をアップロードする
                </button> */}

                <div className="upload-picture-container">
                    {/* <img className="upload-picture" alt="" src={imageData}></img> */}
                    <input
                    id="upload"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={onFileChange}
                    style={{ display: "none" }}
                    />
                </div>

                <label
                    htmlFor="upload"
                    class="upload-button"
                >
                    <div class="upload-button-text">写真をアップロードする</div>
                </label>
                
                {/* {imageData && (
                    <div>
                        <img src={imageData} alt="Uploaded" width="200" height="60" />
                    </div>
                )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Upload;
