import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "../css/global.css";
import "../css/top.css";
import "../css/history.css";
import "../css/custom-style.css";

const History = () => {
  const navigate = useNavigate();
  const [screenHeight, setScreenHeight] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [imageData, setImageData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  const [filterChecked, setFilterChecked] = useState(false);
  const [originalOrder, setOriginalOrder] = useState([...imageData]);
  const [sortAscending, setSortAscending] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [sortChecked, setSortChecked] = useState(true);
  const [sortFileter, setSortFilter] = useState(false);

  const handleSortCheckboxChange = () => {
    const newSortChecked = !sortChecked;
    setSortChecked(newSortChecked); // ステートを更新

    const sortData = (data) => {
      return [...data].sort((a, b) => {
        // image_id を数値として比較
        return !newSortChecked
          ? a.image_id - b.image_id
          : b.image_id - a.image_id;
      });
    };

    if (filterChecked) {
      const sortedData = sortData(filteredData);
      setFilteredData(sortedData);
      setSortFilter(newSortChecked);
    } else {
      const sortedData = sortData(imageData);
      setImageData(sortedData);
      setOriginalOrder(sortedData);
    }
  };

  const handleFilterCheckboxChange = () => {
    // filterChecked の反転後の値を取得
    const newFilterChecked = !filterChecked;

    // setFilterChecked を実行
    setFilterChecked(newFilterChecked);

    // console.log を filterChecked の反転後の値を使用して実行
    console.log(newFilterChecked ? "絞り込み ON" : "絞り込み OFF");

    // filterChecked の値に基づいてデータを絞り込む
    if (newFilterChecked) {
      const filteredData = imageData.filter(
        (item) => item.is_favorite === true
      );

      setFilteredData(filteredData);
      setSortChecked(sortChecked);
    } else {
      setFilteredData([]);
    }
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

    handleSortCheckboxChange(); // 初回のレンダリング時に実行

    const token = localStorage.getItem("token");

    const fetchImageData = async () => {
      try {
        const histroyResponse = await fetch("/api/getHistory", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const data = await histroyResponse.json();
        setImageData(data.history_data); // ここでステートを更新
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchImageData();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
              <button onClick={() => navigate("/")}>TOP</button>
            </li>
            <li>
              <button onClick={() => navigate("/Upload")}>UPLOAD</button>
            </li>
            <li>
              <button onClick={() => navigate("/History")}>HISTORY</button>
            </li>
            <li>
              <button onClick={() => navigate("/Howtouse")}>HOW TO USE</button>
            </li>
          </ul>
        </div>
        <div className="navtext-container">
          <button className="navtext" onClick={() => navigate("/")}>
            Luck bag
          </button>
        </div>
        <img className="top-login-icon" src="./images/login-icon.png"></img>

        <div className="history-header-button">
          <div className="history-header-sort">
            <input
              type="checkbox"
              className="history-header-checkbox"
              id="sortCheckbox"
              onChange={() => {
                handleSortCheckboxChange();
              }}
              checked={sortChecked}
            />
            <label htmlFor="sortCheckbox">
              {sortChecked ? "日付順(↑昇順)" : "日付順(↓降順)"}
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
                key={image.image_id}
                src={image.after_image}
                className="history-image"
                onClick={() => handleImageClick(image)}
              />
            ))
          : imageData.map((image) => (
              <img
                key={image.image_id}
                src={image.after_image}
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
                      src={selectedImage.after_image}
                    />
                  </SplideSlide>
                  <SplideSlide>
                    <img
                      className="history-popup-img-item"
                      src={selectedImage.before_image}
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
              {selectedImage.description}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default History;
