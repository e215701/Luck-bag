import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../css/global.css";
import "../css/upload.css";

const Upload = ({ onLogout }) => {
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
                  <button onClick={() => navigate("/Howtouse")}>
                    HOW TO USE
                  </button>
                </li>
                <li>
                  <button onClick={onLogout}>LOGOUT</button>
                </li>
              </ul>
            </div>
            <div class="navtext-container">
              <button class="navtext" onClick={() => navigate("/")}>
                Luck bag
              </button>
            </div>
            <img className="top-login-icon" src="./images/login-icon.png"></img>
          </header>

          <div
            className="upload-page"
            style={{
              width: `${screenWidth}px`,
              height: `${screenHeight}px`,
            }}
          >
            <p>&thinsp;</p>
            <div className="upload-item-headline">
              <p>どのスタイルの</p>
              <p>コーデが見たいですか？</p>
            </div>
            <div className="gender-item-container">
              <label
                className={`gender-label ${
                  gender === "not specified" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value="not specified"
                  checked={gender === "not specified"}
                  onChange={() => selectGender("not specified")}
                  className="gender-input"
                />
                <img
                  src="./images/gender_anything_image.png"
                  alt="Anything"
                  className="gender-image"
                />
              </label>

              <label
                className={`gender-label ${
                  gender === "mens" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value="mens"
                  checked={gender === "mens"}
                  onChange={() => selectGender("mens")}
                  className="gender-input"
                />
                <img
                  src="./images/gender_male_image.png"
                  alt="Male"
                  className="gender-image"
                />
              </label>

              <label
                className={`gender-label ${
                  gender === "ladies" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value="ladies"
                  checked={gender === "ladies"}
                  onChange={() => selectGender("ladies")}
                  className="gender-input"
                />
                <img
                  src="./images/gender_female_image.png"
                  alt="Female"
                  className="gender-image"
                />
              </label>
            </div>

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
                <div class="select-button-text">
                  <img
                    className="select-button-image"
                    src="./images/camera-icon.png"
                  ></img>
                </div>
              </label>
            )}

            {imageData && (
              <label htmlFor="upload" class="selected-button">
                <div class="select-button-text">
                  <img
                    src={imageData}
                    alt="Uploaded image"
                    className="upload-image"
                  />
                  <div className="upload-icon-container">
                    <img
                      className="select-button-image"
                      src="./images/camera-icon-white.png"
                    ></img>
                  </div>
                </div>
              </label>

              // </div>
            )}
            <div className="upload-spacer"></div>
            <div className="upload-item-container">
              <div className="upload-item-text-left">
                ※服の形がはっきりとわかる写真にしましょう
              </div>
            </div>
            <div className="upload-item-container">
              <div className="upload-item-text-left">
                ※アップロードする写真には服が1点のみ映るようご配慮ください。
                衣類以外の他のアイテムが含まれている写真をアップロードされますと、
                想定外の動作をする恐れがありますのでご注意ください。
              </div>
            </div>
            <div className="upload-spacer" style={{ height: "40px" }}></div>
            <label htmlFor="upload" class="upload-button">
              <div class="upload-button-text" onClick={() => goToRecommend()}>
                送信
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
