import React from "react"; //Reactを読み込んでいる
import { Link } from "react-router-dom"; // 追加 Linkタブを読み込む
import "../css/style.css";
//import "./script";

class Toppage extends React.Component {
  render() {
    return (
      // <div className="App">
      //     <h1>Hello World</h1>
      // </div>
      <body id="top">
        <div id="wrapper">
          <div id="sidebar">
            <div id="sidebarWrap">
              <h1>
                <img
                  src="./images/icon2.png"
                  width="auto"
                  height="auto"
                  alt="logo"
                />
              </h1>
              <nav id="mainnav">
                <p id="menuWrap">
                  <a id="menu">
                    <span id="menuBtn"></span>
                  </a>
                </p>
                <div className="panel">
                  <ul>
                    <li>
                      <div className="App"></div>
                    </li>
                    <li>
                      <Link to={`/Upload`}>Upload</Link>
                    </li>
                    <li>
                      <Link to={`/History`}>History</Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
          <div id="content">
            <p id="mainImg">
              <img src="images/mainImg.jpg" alt="" />
            </p>
            <section id="sec01">
              <header>
                <h2>
                  <span>MESSAGE</span>
                </h2>
              </header>
              <div className="innerS">
                手持ちの服の使い道が思い浮かばない、お蔵入りした洋服がある人向けのファッション系webアプリです。
              </div>
            </section>
            <section id="sec04">
              <header>
                <h2>
                  <span>PROJECT</span>
                </h2>
              </header>
              <div className="inner">
                <div className="article">
                  <img
                    src="images/photo14.jpg"
                    width="370"
                    height="224"
                    alt=""
                  />
                  <p>
                    ホームページサンプル株式会社では最新技術と自然との調和を目指します。革新的な革新的な革新的な技術で世の中を技術で世の中を技術で世の中を動かす企業を目指します。
                  </p>
                  <p>
                    ホームページサンプル株式会社。ホームページサンプル最新技術と自然との調和を目指します。革新的な技術で世の中を動かす企業を目指します。ホームページサンプル株式会社。ホームページサンプル最新技術と自然との調和を目指し調和を目指し調和を目指します。革新的な技術で世の中を動かす企業を目指します。
                  </p>
                </div>
                <div className="article">
                  <img
                    src="images/photo15.jpg"
                    width="370"
                    height="224"
                    alt=""
                  />
                  <p>
                    ホームページサンプル株式会社では最新技術と自然との調和を目指します。革新的な革新的な革新的な技術で世の中を技術で世の中を技術で世の中を動かす企業を目指します。
                  </p>
                  <p>
                    ホームページサンプル株式会社。ホームページサンプル最新技術と自然との調和を目指します。革新的な技術で世の中を動かす企業を目指します。ホームページサンプル株式会社。ホームページサンプル最新技術と自然との調和を目指し調和を目指し調和を目指します。革新的な技術で世の中を動かす企業を目指します。
                  </p>
                </div>
              </div>
            </section>
            <section id="sec05">
              <header>
                <h2>
                  <span>UNIVERSITY</span>
                </h2>
              </header>
              <div className="inner">
                <ul className="col2">
                  <li>
                    <p>
                      〒903-0129
                      <br />
                      沖縄県中頭郡西原町千原１ 工学部 1号館
                    </p>
                    <p>TEL 098-895-8589</p>
                    <p>営業時間 8:00〜17:00（土日定休）</p>
                    <p>※都合により休業する場合がございます</p>
                  </li>
                  <li>
                    <div id="map">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.277873440419!2d127.76391827541698!3d26.252643527046793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34e56cfdeeb55c65%3A0xdb6b98665209c283!2z55CJ55CD5aSn5a2m5bel5a2m6YOoIOS6i-WLmeWupA!5e0!3m2!1sja!2sjp!4v1696404613793!5m2!1sja!2sjp"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
            <footer id="footer">
              Copyright(c) 2016 Sample Inc. All Rights Reserved. Design by{" "}
              <a href="http://f-tpl.com" target="_blank" rel="noreferrer">
                http://f-tpl.com
              </a>
            </footer>
          </div>
        </div>
      </body>
    );
  }
}

export default Toppage;
// import "./App.css";
// function App() {

// }

//export default App;
