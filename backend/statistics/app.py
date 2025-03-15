from flask import Flask, request
from dotenv import load_dotenv
from flask_cors import CORS, cross_origin
from werkzeug.datastructures import FileStorage
from pandas import DataFrame, read_csv

from clustering.clustering import Clustering
from descriptive.descriptive import getDescriptiveStatistics, getGraphics

load_dotenv()

app = Flask(__name__)

CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

clustering = Clustering()

@app.route("/descriptive", methods=["POST", "OPTIONS"])
def descriptiveStatistics():
    print(request.files)
    file: FileStorage = request.files["file"]
    df : DataFrame = read_csv(file)
    statistics = getDescriptiveStatistics(df)
    return statistics

@app.route("/graphics", methods=["POST"])
def graphics():
    file: FileStorage = request.files["file"]
    df : DataFrame = file.read()
    graphics = getGraphics(df)
    return graphics

@app.route("/clustering", methods=["POST"])
def createClusters():
    file: FileStorage = request.files["file"]
    df : DataFrame = read_csv(file)
    clusters = clustering.kmeans(df)
    return {
        "data": clusters,
        "type": "cluster",
        "name": "Plot of the clusters",
        "description": "The dimensionality of the data has been reduced to 2D using PCA. The clusters are visualized in this plot."
    }

if __name__ == "__main__":
    app.run()