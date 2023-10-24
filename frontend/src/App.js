import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//この行以降に、遷移するpageの読み込み文を宣言する。
import Toppage from "./Toppage";
import Costume from "./Costume";
import PreviewUpload from "./PreviewUpload";
import SelectTags from "./SelectTags"; //追加した部分

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Toppage />} />
          <Route path="/Costume" element={<Costume />} />
          <Route path="/PreviewUpload" element={<PreviewUpload />} />
          <Route path="/SelectTags" element={<SelectTags />} /> //追加した部分
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
