from flask import Flask, request
from dotenv import load_dotenv
from flask_cors import CORS, cross_origin
from werkzeug.datastructures import FileStorage
from pandas import DataFrame, read_csv
from fileManager.fileManager import check_file, upload_file

from regression.regression import Regression
from clustering.clustering import Clustering
from correlation.correlation import Correlation
from descriptive.descriptive import getDescriptiveStatistics, getGraphics

load_dotenv()

app = Flask(__name__)

CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

clustering = Clustering()
regression = Regression()
correlation = Correlation()

@app.route("/check-file/:name", methods=["GET"])
def check_file():
    fileName = request.args.get("name")
    check_file(fileName)

@app.route("/upload-file", methods=["POST"])
def upload_file():
    file: FileStorage = request.files["file"]
    upload_file(file.filename)

@app.route("/descriptive", methods=["POST", "OPTIONS"])
def descriptiveStatistics():
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

@app.route("/correlation", methods=["POST"])
def correlation():
    file: FileStorage = request.files["file"]
    df : DataFrame = read_csv(file)
    correlation_matrix = correlation.pearson_correlation_matrix(df)
    return {
        "type": "heatmap",
        "name": "Pearson's Correlation Coefficient",
        "description": "The correlation matrix is visualized in this plot.",
        "data": {
            "correlationMatrix": correlation_matrix.values.tolist(),
            "values": correlation_matrix.columns.tolist
        }
    }

@app.route("/regression", methods=["POST"])
def regression():
    file: FileStorage = request.files["file"]
    df : DataFrame = read_csv(file)
    y = df['Social_Media_Hours']
    X = df[['Age', 'Exercise_Hours', 'Sleep_Hours']]

    return {
        'type': 'regression',
        'name': 'Linear Regression',
        "data": regression.linear_regression(X, y),
        "description": "The dimensionality of the data has been reduced to 1D using LSA. The regression line is visualized in this plot."
    }

if __name__ == "__main__":
    app.run()