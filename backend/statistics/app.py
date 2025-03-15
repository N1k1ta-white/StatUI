from flask import Flask, request
from dotenv import load_dotenv
from flask_cors import CORS, cross_origin
from werkzeug.datastructures import FileStorage

from descriptive.descriptive import getDescriptiveStatistics, getGraphics, clustering

load_dotenv()

app = Flask(__name__)

CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/descriptive", methods=["POST", "OPTIONS"])
def descriptiveStatistics():
    print(request.files)
    file: FileStorage = request.files["file"]
    statistics = getDescriptiveStatistics(file)
    return statistics

@app.route("/graphics", methods=["POST"])
def graphics():
    file: FileStorage = request.files["file"]
    graphics = getGraphics(file)
    return graphics

@app.route("/clustering", methods=["POST"])
def createClusters():
    file: FileStorage = request.files["file"]
    clusters = clustering(file)
    return {
        "clusters": clusters
    }

if __name__ == "__main__":
    app.run()