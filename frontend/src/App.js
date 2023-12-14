import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//この行以降に、遷移するpageの読み込み文を宣言する。
import Top from "./pages/Top";
import Upload from "./pages/Upload";
import Recommend from "./pages/Recommend";
import History from "./pages/History";
import Test from "./pages/test";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/Upload" element={<Upload />} />
          <Route path="/Recommend" element={<Recommend />} />
          <Route path="/History" element={<History />} />
          <Route path="/Test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
