import React from "react";
import axios from "axios";

class PreviewUpload extends React.Component {
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
    } catch (error) {
      console.error("API通信エラー:", error);
      this.setState({
        loading: false,
        error: "データを取得できませんでした。",
      });
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      imageData: null,
      logs: null,
      loading: false,
      error: null,
    };
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
    const { responseData, loading, imageData, error } = this.state;

    return (
      <div>
        <input
          id="upload"
          type="file"
          name="image"
          accept="image/*"
          capture="camera"
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
          </div>
        ) : null}
      </div>
    );
  }
}

export default PreviewUpload;
