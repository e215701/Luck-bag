import React from "react"; //Reactを読み込んでいる
import { Link } from "react-router-dom"; // 追加 Linkタブを読み込む
import "../css/style.css"; //CSSを適用したい場合はimportで

class SelectTags extends React.Component {
  //必要になる関数の定義はrender(){}以前に

  //render(){}がページ描画部分関連
  render() {
    //ページ描画で必要な変数はここで定義
    // 例: Text = "HelloWorld"
    return (
      //ここにページ描画部分
      <body>
        //ここにページ描画部分
        <div className="App">
          <h1>コーディネートを紹介するページ</h1>
        </div>
        //画面遷移はLinkタグを用いる。{}の中は、遷移先のパス
        <Link to={`/`}>TOP</Link>
      </body>
    );
  }
}

export default SelectTags; //ここで実際にPage表示（これがないと表示されない）
