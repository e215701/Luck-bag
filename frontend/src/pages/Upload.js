import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../css/global.css";
import "../css/upload.css";

const Upload = () => {
  const navigate = useNavigate();
  const [imageData, setImageData] = useState(null);
  const [screenHeight, setScreenHeight] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [gender, setGender] = useState("anything")
  const [genderImage, setGenderImage] = useState({male: './images/gender_male_image.png', female: './images/gender_female_image.png', anything: './images/gender_anything_image.png'});

  useEffect(() => {
    if (imageData) {
    //   goToRecommend();
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
    navigate("/Recommend", { state: { image: imageData, gender: gender } });
  };

  const selectGender = (selectedGender) => {
    setGender(selectedGender);
    setGenderImage({
      ...genderImage,
      [selectedGender]: selectedGender === 'male' ? './images/gender_anything_image.png' : selectedGender === 'female' ? './images/gender_anything_image.png' : './images/gender_male_image.png'
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
            
            <div className="upload-page"
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
            <label className={`gender-label ${gender === 'anything' ? 'selected' : ''}`}>
                <input
                type="radio"
                name="gender"
                value="anything"
                checked={gender === 'anything'}
                onChange={() => selectGender('anything')}
                className="gender-input"
                />
                <img src="./images/gender_anything_image.png" alt="Anything" className="gender-image" />
            </label>

            <label className={`gender-label ${gender === 'male' ? 'selected' : ''}`}>
                <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={() => selectGender('male')}
                className="gender-input"
                />
                <img src="./images/gender_male_image.png" alt="Male" className="gender-image" />
            </label>

            <label className={`gender-label ${gender === 'female' ? 'selected' : ''}`}>
                <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={() => selectGender('female')}
                className="gender-input"
                />
                <img src="./images/gender_female_image.png" alt="Female" className="gender-image" />
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
                <label
                htmlFor="upload"
                class="select-button"
            >
                <div class="select-button-text">
                    <p>写真を</p>
                    <p>アップロードする</p>
                </div>
                </label>
            )}

            {imageData && (
                // <div className="upload-image-container">
                <img src={imageData} alt="Uploaded" className="upload-image" />

                // </div>
            )}

            <div className="upload-item-container">
                <div className="upload-item-text-left">
                    ※服の形がはっきりとわかる写真にしましょう
                </div>
            </div>
            <div className="upload-item-container">
                <div className="upload-item-text-left">
                    ※写真に複数の服が写っていると、うまくいかない場合があります。              
                </div>
            </div>

            <div className="upload-item-container">
            <label
                htmlFor="upload"
                class="upload-button"
            >
                <div class="upload-button-text">送信</div>
            </label>
            </div> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
