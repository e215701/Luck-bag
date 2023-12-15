import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/global.css";
import "../css/upload.css";
import "../css/top.css";

const Upload = () => {
  const navigate = useNavigate();
  const [imageData, setImageData] = useState(null);

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
    navigate("/recommend", { state: { image: imageData } });
  };

  return (
    <div className="upload-upload">
      <div className="header">LuckBag</div>
      <div className="upload-container">
        <label
          htmlFor="upload"
          // style={{
          //   alignItems: "center",
          //   outline: "2px solid blue",
          // }}
        >
          <div className="upload-picture-container">
            <img className="upload-picture" alt="" src={imageData}></img>
            <input
              id="upload"
              type="file"
              name="image"
              accept="image/*"
              onChange={onFileChange}
              style={{ display: "none" }}
            />
          </div>
        </label>

        <button className="upload-button" onClick={goToRecommend}>
          Coordinate
        </button>
      </div>

      {/* {imageData && (
        <div>
          <img src={imageData} alt="Uploaded" width="200" height="60" />
        </div>
      )} */}
    </div>
  );
};

export default Upload;
