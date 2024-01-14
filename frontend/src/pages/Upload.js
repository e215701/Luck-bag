import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../css/global.css";
import "../css/upload.css";

const Upload = () => {
  const navigate = useNavigate();
  const [imageData, setImageData] = useState(null);
  const [screenHeight, setScreenHeight] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [gender, setGender] = useState("not specified");
  const [genderImage, setGenderImage] = useState({
    male: "./images/gender_male_image.png",
    female: "./images/gender_female_image.png",
    anything: "./images/gender_anything_image.png",
  });
  const [error, setError] = useState("");

  useEffect(() => {
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
    if (imageData) {
      console.log(gender);
      navigate("/Recommend", { state: { image: imageData, gender: gender } });
    } else {
      setError("画像を選択してください。");
    }
  };

  const selectGender = (selectedGender) => {
    setGender(selectedGender);
    setGenderImage({
      ...genderImage,
      [selectedGender]:
        selectedGender === "male"
          ? "./images/gender_anything_image.png"
          : selectedGender === "female"
          ? "./images/gender_anything_image.png"
          : "./images/gender_male_image.png",
    });
  };

  return (
    <div id="upload-page">
      <div id="wrapper">
        <div id="content" className="fade-in">
          {/* <div className="header">LuckBag</div> */}
          <header class="header">
            <div class="navtext-container">
              <div class="navtext">Luck Bag</div>
            </div>
            <input type="checkbox" class="menu-btn" id="menu-btn" />
            <label for="menu-btn" class="menu-icon">
              <span class="navicon"></span>
            </label>
            <ul class="menu">
              <div className="menu-spacer"></div>
              <li>
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

          <div
            className="upload-page"
            style={{
              width: `${screenWidth}px`,
              height: `${screenHeight}px`,
            }}
          >
            <p>&thinsp;</p>
            <p>&thinsp;</p>
            <div className="upload-item-headline">
              <p>あなたの気になっている</p>
              <p>性別を選んでください</p>
            </div>
            <div className="gender-item-container">
              <label className="gender-label">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "mens"}
                  onChange={() => selectGender("mens")}
                  className="gender-input"
                />
                <span className="gender-custom-radio"></span>
                Male
              </label>

              <label className="gender-label">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "ladies"}
                  onChange={() => selectGender("ladies")}
                  className="gender-input"
                />
                <span className="gender-custom-radio"></span>
                Female
              </label>

              <label className="gender-label">
                <input
                  type="radio"
                  name="gender"
                  value="anything"
                  checked={gender === "not specified"}
                  onChange={() => selectGender("not specified")}
                  className="gender-input"
                />
                <span className="gender-custom-radio"></span>
                Anything
              </label>
            </div>

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
            </div>

            {/* <button className="upload-button" onClick={goToRecommend}>
                        写真をアップロードする
                    </button> */}

            {/* <img className="upload-picture" alt="" src={imageData}></img> */}
            <input
              id="upload"
              type="file"
              name="image"
              accept="image/*"
              onChange={onFileChange}
              style={{ display: "none" }}
            />

            {!imageData && (
              // <div className="upload-image-container">
              <label htmlFor="upload" class="select-button">
                <div class="select-button-text">写真をアップロードする</div>
              </label>
            )}

            {imageData && (
              // <div className="upload-image-container">
              <img src={imageData} alt="Uploaded" className="upload-image" />

              // </div>
            )}

            <div className="upload-item-container">
              <label htmlFor="upload" class="upload-button">
                <div class="upload-button-text" onClick={() => goToRecommend()}>
                  送信
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
