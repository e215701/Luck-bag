import React from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

class Recommend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: null,
      image: null,
      loading_image: false,
      error_image: null,
      loading: false,
      error: null,
      responseData: null,
    };
  }

  componentDidMount() {
    const imageData = this.props.location.state?.image;
    if (imageData) {
      this.setState({ imageData: imageData }, () => {
        this.fetchData(imageData);
      });
    }
  }

  async query(data) {
    this.setState({ loading_image: true, error_image: null });

    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/goofyai/Leonardo_Ai_Style_Illustration",
        data,
        {
          //headers: { Authorization: "Bearer {API_TOKEN}" },
          responseType: "blob",
        }
      );

      const blob = URL.createObjectURL(response.data);
      this.setState({ image: blob, loading_image: false });
      console.log("成功");
    } catch (error) {
      // エラーハンドリングを行うことをお勧めします
      console.error("エラー:", error);
      this.setState({
        loading_image: false,
        error_image: "画像を生成できませんでした。",
      });
      throw error;
    }
  }

  async fetchData(file) {
    this.setState({ loading: true, error: null });

    try {
      // Base64エンコードされたデータをBlobに変換
      const response = await fetch(file);
      const blob = await response.blob();

      // BlobをPNGファイルに変換
      const pngFile = new File([blob], "image.png", { type: "image/png" });

      // FormDataオブジェクトを作成し、PNGファイルを追加
      // const formData = new FormData();
      // formData.append("file", pngFile);

      // APIリクエスト
      const responseAPI = await axios.post(
        "https://api-inference.huggingface.co/models/valentinafeve/yolos-fashionpedia",
        pngFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(JSON.stringify(responseAPI.data));
      //this.setState({ responseData: response.data, loading: false });
      const labels = responseAPI.data.map((item) => item.label);
      const splitlabels = labels.flatMap((label) =>
        label.split(",").map((s) => s.trim())
      );

      //console.log(JSON.stringify(labels));
      console.log(JSON.stringify(splitlabels));
      this.setState({ responseData: splitlabels, loading: false });

      // query関数を呼び出す例
      const infomation = JSON.stringify(splitlabels);
      this.query({ inputs: infomation });
    } catch (error) {
      console.error("API通信エラー:", error);
      this.setState({
        loading: false,
        error: "データを取得できませんでした。",
      });
    }
  }

  render() {
    const { imageData, image, loading, error } = this.state;

    return (
      <div className="App">
        <h1>コーディネートを紹介するページ</h1>
        {loading && <p>読み込み中...</p>}
        {error && <p>エラー: {error}</p>}
        {image && (
          <div>
            <h2>生成された画像</h2>
            <img src={image} alt="Generated" width="200" height="60" />
            <a href={image} download>
              <button style={{ padding: "5px" }}>画像をダウンロード</button>
            </a>
          </div>
        )}
        {imageData && (
          <div>
            <h2>アップロードした画像</h2>
            <img src={imageData} alt="Uploaded" width="200" height="60" />
          </div>
        )}
        <Link to={`/`}>TOP</Link>
      </div>
    );
  }
}

export default (props) => <Recommend {...props} location={useLocation()} />;