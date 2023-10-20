import React from 'react';              //Reactを読み込んでいる
import { Link } from 'react-router-dom';// 追加 Linkタブを読み込む

class Costume extends React.Component {
  render() {
    return (
      // <div className="App">
      //     <h1>Hello World</h1>
      // </div>
          <div id="wrapper">
            <div id="sidebar">
              <div id="sidebarWrap">
                <h1><img src="images/icon2.png" width="200" height="60" alt="logo" /></h1>
                <nav id="mainnav">
                  <p id="menuWrap">
                    <a id="menu">
                      <span id="menuBtn"></span>
                    </a>
                  </p>
                  <div className="panel">
                    <ul>
                      <li><Link to={`/`}>TOP</Link></li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
      
            <div id="content">
              {/* <p id="mainImg"><img src="images/mainImg.jpg" alt="" /></p> */}
              <div id="splash">
                <div id="splash-logo">Loading...</div>
              </div>
              <div className="splashbg"></div>
              <div id="container">
                <p>
                  <p id="mainImg">
                    <div className="flexbox1">
                      <img src="images/avater/avater_male.png" alt="" width="55%" height="30%" />
                      <div className="flexbox2">
                        <img src="images/clothes/shirt.png" alt="" />
                        <img src="images/clothes/pants.png" alt="" />
                        <img src="image.png" alt="" />
                      </div>
                    </div>
                  </p>
                  ここにメインコンテンツが入ります。
                </p>
              </div>
                      </div>
              <footer id="footer">
                Copyright(c) 2016 Sample Inc. All Rights Reserved. Design by{' '}
                <a href="http://f-tpl.com" target="_blank">
                  http://f-tpl.com
                </a>
                {/* ←クレジット表記を外す場合はシリアルキーが必要です http://f-tpl.com/credit/ */}
              </footer>
            </div>
      
    );
  }
}

export default Costume;
