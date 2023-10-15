import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // データをフェッチする関数
    const fetchData = async () => {
      try {
        const response = await fetch("/api/hello");

        if (!response.ok) {
          // もしレスポンスが200系のステータスコードでなければエラーを投げる
          throw new Error("Network response was not ok");
        }

        const data = await response.json(); // JSONとしてデータを解析
        setMessage(data.message); // メッセージを設定
      } catch (error) {
        console.error("Error fetching the message:", error);
      }
    };

    fetchData();
  }, []); // 空の依存配列を渡して、このeffectはコンポーネントがマウントされた時にのみ実行されるようにします

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {message || "Loading..."}{" "}
          {/* メッセージが存在しない場合は "Loading..." を表示 */}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
