from flask import Flask
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

@app.route("/")
def hello_world():
    return {
        "max": 100
    }

if __name__ == "__main__":
    app.run()