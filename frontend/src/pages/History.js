import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "../css/global.css";
import "../css/history.css";
import "../css/top.css";

const History = () => {
  const navigate = useNavigate();
  const [screenHeight, setScreenHeight] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
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
  const [sortChecked, setSortChecked] = useState(false);

  const handleSortCheckboxChange = () => {
    let sortedData;
    if (filterChecked) {
      sortedData = [...filteredData].sort((a, b) => {
        return sortChecked ? a.id - b.id : b.id - a.id; // 修正点
      });
      setFilteredData(sortedData);
    } else {
      sortedData = [...originalOrder].sort((a, b) => {
        return sortChecked ? a.id - b.id : b.id - a.id; // 修正点
      });
      setImageData(sortedData);
      setOriginalOrder(sortedData); // ソート後の順序を新しい原本として保存
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
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    // cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
            Luck bag
          </div>
        </div>
        <img className="top-login-icon" src="./images/login-icon.png"></img>

        <div className="history-header-button">
          <div className="history-header-sort">
            <input
              type="checkbox"
              className="history-header-checkbox"
              id="sortCheckbox"
              onChange={() => {
                setSortChecked(!sortChecked);
                handleSortCheckboxChange();
              }}
              checked={sortChecked}
            />
            <label htmlFor="sortCheckbox">
              {sortChecked ? "↓降順" : "↑昇順"}
            </label>
          </div>
          <div className="history-header-filter">
            <input
              type="checkbox"
              id="filterCheckbox"
              onChange={handleFilterCheckboxChange}
              checked={filterChecked}
            />
            <label htmlFor="filterCheckbox">お気に入り</label>
          </div>
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
        <>
          <div
            className="history-popup-bg"
            onClick={closePopup}
            style={{ width: `${screenWidth}px`, height: `${screenHeight}px` }}
          />
          <div className="history-popup">
            <div className="history-popup-close" onClick={closePopup}>
              &times;
            </div>
            <div className="history-popup-text">コーデについて</div>
            <Splide
              className="history-popup-container"
              hasTrack={false}
              id="image-carousel"
              options={{ arrows: false }}
            >
              <div className="history-popup-image">
                <SplideTrack>
                  <SplideSlide>
                    <img
                      className="history-popup-img-item"
                      src={selectedImage.src}
                    />
                  </SplideSlide>
                  <SplideSlide>
                    <img
                      className="history-popup-img-item"
                      src={selectedImage.src}
                    />
                  </SplideSlide>
                </SplideTrack>
              </div>
              <div
                className="splide__pagination"
                style={{
                  color: "pink",
                  position: "relative",
                  bottom: "0px",
                  margin: "5px 0 0 0",
                }}
              />
            </Splide>

            {/* </div> */}
            <p className="history-popup-content-text">
              ここに詳細な説明やテキストが入ります。
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default History;
