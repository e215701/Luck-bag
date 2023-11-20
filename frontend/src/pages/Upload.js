import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Upload = () => {
  const [imageData, setImageData] = useState(null);
  const navigate = useNavigate();

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
    <div>
      <input
        id="upload"
        type="file"
        name="image"
        accept="image/*"
        onChange={onFileChange}
      />
      {imageData ? (
        <div>
          <h2>画像</h2>
          <img src={imageData} alt="Uploaded" width="200" height="60" />
          <br />
          <button onClick={goToRecommend}>Recommend Pageへ</button>
        </div>
      ) : null}
      <div>
        <Link to={`/`}>TOP</Link>
      </div>
    </div>
  );
};

export default Upload;
