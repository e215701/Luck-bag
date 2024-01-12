import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/global.css";
import "../css/history.css";
import "../css/top.css";

const History = () => {
  const navigate = useNavigate();
  const [imageData, setImageData] = useState([
    {
      id: 1,
      src: "./images/clothes.jpg",
      fav: true,
      // その他のプロパティ...
    },
    {
      id: 2,
      src: "./images/clothes1.jpg",
      fav: true,
      // その他のプロパティ...
    },
    {
      id: 3,
      src: "./images/clothes3.jpg",
      fav: false,
      // その他のプロパティ...
    },
    {
      id: 4,
      src: "./images/clothes2.jpeg",
      fav: true,
      // その他のプロパティ...
    },
    {
      id: 5,
      src: "./images/clothes.jpg",
      fav: false,
      // その他のプロパティ...
    },
    // 他の画像オブジェクト...
  ]);

  const [filteredData, setFilteredData] = useState([]);
  const [filterChecked, setFilterChecked] = useState(false);
  const [originalOrder, setOriginalOrder] = useState([...imageData]);
  const [sortAscending, setSortAscending] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSortCheckboxChange = () => {
    let sortedData;
    if (filterChecked) {
      sortedData = [...filteredData].sort((a, b) => {
        return sortAscending ? b.id - a.id : a.id - b.id;
      });
      setFilteredData(sortedData);
    } else {
      sortedData = [...originalOrder].sort((a, b) => {
        return sortAscending ? b.id - a.id : a.id - b.id;
      });
      setImageData(sortedData);
      setOriginalOrder(sortedData); // ソート後の順序を新しい原本として保存
      setSortAscending(!sortAscending);
    }
    console.log("並べ替え");
  };

  const handleFilterCheckboxChange = () => {
    if (!filterChecked) {
      const filteredData = imageData.filter((item) => item.fav == true);
      setFilteredData(filteredData);
    } else {
      setFilteredData([]);
    }
    setFilterChecked(!filterChecked);
    console.log("絞り込み");
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    setOriginalOrder([...imageData]);
  }, [imageData]);

  return (
    <div className="history-page">
      <header className="history-header">
        <div className="top-hum-icon">
          <input type="checkbox" className="menu-btn" id="menu-btn" />
          <label htmlFor="menu-btn" className="menu-icon">
            <span className="navicon"></span>
          </label>
          <ul className="menu">
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
        </div>
        <div className="navtext-container">
          <div className="navtext" onClick={() => navigate("/")}>
            History
          </div>
        </div>
        <img className="top-login-icon" src="./images/login-icon.png"></img>

        <div className="history-header-button">
          <input
            type="checkbox"
            className="history-header-checkbox"
            id="sortCheckbox"
            onChange={handleSortCheckboxChange}
          />
          <label htmlFor="sortCheckbox" className="history-header-text">
            並べ替え
          </label>
          <input
            type="checkbox"
            className="history-header-checkbox"
            id="filterCheckbox"
            onChange={handleFilterCheckboxChange}
            checked={filterChecked}
          />
          <label htmlFor="filterCheckbox" className="history-header-text">
            絞り込み
          </label>
        </div>
      </header>
      <div className="history-container">
        {filteredData.length > 0
          ? filteredData.map((image) => (
              <img
                key={image.id}
                src={image.src}
                className="history-image"
                onClick={() => handleImageClick(image)}
              />
            ))
          : imageData.map((image) => (
              <img
                key={image.id}
                src={image.src}
                className="history-image"
                onClick={() => handleImageClick(image)}
              />
            ))}
      </div>
      {selectedImage && (
        <div className="history-popup">
          <span className="history-popup-close" onClick={closePopup}>
            &times;
          </span>
          <div className="history-popup-text">コーデについて</div>
          <div className="history-popup-content">
            <img
              className="history-popup-image"
              src={selectedImage.src}
              alt={`Image ${selectedImage.id}`}
            />
            <p>ここに詳細な説明やテキストが入ります。</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
