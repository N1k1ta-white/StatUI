from flask import Flask, request
from dotenv import load_dotenv
from flask_cors import CORS, cross_origin
from werkzeug.datastructures import FileStorage
from pandas import DataFrame, read_csv
from fileManager.fileManager import check_file, upload_file, get_file

from regression.regression import Regression
from clustering.clustering import Clustering
from correlation.correlation import Correlation
from descriptive.descriptive import getDescriptiveStatistics, getGraphics
from methodsHandler import apply_methods
import numpy as np

load_dotenv()

app = Flask(__name__)

CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

clustering = Clustering()
regression = Regression()
correlation = Correlation()

@app.route("/check-file/<name>", methods=["GET"])
def isExistsFile(name):
    return check_file(name)

@app.route("/upload-file", methods=["POST"])
def uploadFile():
    file: FileStorage = request.files["file"]
    return upload_file(file)

@app.route("/analyze/<name>", methods=["POST"])
def analyze_dataset(name):
    json_data = request.get_json()
    file = get_file(name)
    print(name)
    df = read_csv(file)
    return { "analysis": apply_methods(df, json_data) }
    
@app.route("/descriptive/<name>", methods=["GET"])
def descriptiveStatistics(name):
    file = get_file(name)
    df = read_csv(file)
    # Replace infinity values with NaN
    df = df.replace([np.inf, -np.inf], np.nan)

    # Option 1: Drop rows with NaN values
    df = df.dropna()

    # Or Option 2: Fill NaN values with a specific value (e.g., 0)
    # df = df.fillna(0)
    return df.describe().to_dict()

@app.route("/graphics", methods=["POST"])
def graphics():
    file: FileStorage = request.files["file"]
    df : DataFrame = read_csv(file)
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