import React from "react";

class PreviewUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageData: null,
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
          this.queryAPI(this.state.imageData);
        });
      };
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageData: null });
    }
  }

  async queryAPI(imageData) {
	const response = await fetch(
	  "https://api-inference.huggingface.co/models/valentinafeve/yolos-fashionpedia",
	  {
		headers: {
		  Authorization: "Bearer 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", // トークンを追加
		  "Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify({ image: imageData }), // 画像データを送信
	  }
	);
  
	if (response.ok) {
	  const result = await response.json();
	  console.log(JSON.stringify(result));
	  // ここで結果を表示するか、他の適切な処理を行います。
	} else {
	  console.error("APIエラー:", response.status, response.statusText);
	}
  }

  render() {
    const imageData = this.state.imageData;
    let preview = "";

    if (imageData != null) {
      preview = (
        <div>
          <img src={imageData} alt="Uploaded" />
        </div>
      );
    }

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
        {preview}
      </div>
    );
  }
}

export default PreviewUpload;
