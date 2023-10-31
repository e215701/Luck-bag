import requests

API_URL = "https://api-inference.huggingface.co/models/valentinafeve/yolos-fashionpedia"
# headers = {"Authorization": "Bearer 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"}

def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.post(API_URL, data=data)
    return response.json()

output = query("/Users/tacks/Downloads/160579.jpg")
print(output)