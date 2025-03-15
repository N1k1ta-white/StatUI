from flask import Flask, request
from dotenv import load_dotenv
from werkzeug.datastructures import FileStorage

from descriptive.descriptive import getDescriptiveStatistics, getGraphics

load_dotenv()

app = Flask(__name__)

@app.route("/descriptive", methods=["POST"])
def descriptiveStatistics():
    file: FileStorage = request.files["file"]
    statistics = getDescriptiveStatistics(file)
    return statistics

@app.route("/graphics", methods = ["POST"])
def graphics():
    file: FileStorage = request.files["file"]
    graphics = getGraphics(file)
    return graphics

if __name__ == "__main__":
    app.run()