from flask import Flask, request
from dotenv import load_dotenv
from werkzeug.datastructures import FileStorage

from descriptive import getDescriptiveStatistics

load_dotenv()

app = Flask(__name__)

@app.route("/descriptive", methods=["POST"])
def hello_world():
    file: FileStorage = request.files["file"]
    statistics = getDescriptiveStatistics(file)
    return statistics.to_json()

if __name__ == "__main__":
    app.run()