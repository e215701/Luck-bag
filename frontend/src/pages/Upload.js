import React from "react";
import axios from "axios";

class PreviewUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageData: null,
      logs: null,
      loading: false,
      error: null,
      loading_image: false,
      image: null,
      error_image: null,
    };
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
      const fileData = file;

      const response = await axios.post(
        "https://api-inference.huggingface.co/models/valentinafeve/yolos-fashionpedia",
        fileData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(JSON.stringify(response.data));
      //this.setState({ responseData: response.data, loading: false });
      const labels = response.data.map((item) => item.label);
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

  onFileChange(e) {
    const files = e.target.files;

    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.setState({ imageData: e.target.result }, () => {
          // 画像が読み込まれたらAPIを呼び出す
          this.fetchData(file);
        });
      };
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageData: null });
    }
  }

  render() {
    const {
      responseData,
      loading,
      imageData,
      error,
      loading_image,
      error_image,
      image,
    } = this.state;

    return (
      <div>
        <input
          id="upload"
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => {
            this.onFileChange(e);
          }}
        />
        {loading ? (
          <p>データを取得中...</p>
        ) : error ? (
          <p>{error}</p>
        ) : responseData ? (
          <div>
            <h2>画像データ:</h2>
            <img src={imageData} alt="Image" width="200" height="60" />
            <h2>APIからのデータ:</h2>
            <pre>{JSON.stringify(responseData, null, 2)}</pre>
            {loading_image ? (
              <p>画像を生成中...</p>
            ) : error_image ? (
              <p>{error_image}</p>
            ) : image ? (
              <>
                <img src={image} alt="Image" width="200" height="60" />
                <a href={image} download>
                  <button style={{ padding: "5px" }}>画像をダウンロード</button>
                </a>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default PreviewUpload;
