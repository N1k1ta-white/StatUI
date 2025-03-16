import json
import pandas as pd
from correlation import Correlation
from werkzeug.datastructures import FileStorage
from regression import Regression

correlation = Correlation()
regression = Regression()

clustering = ["K-means Clustering", "Hierarchical Clustering", "DBSCAN", "Gaussian Mixture Model"]

correlation_methods = {
    "Pearson's Correlation Coefficient": correlation.pearson_correlation,
    "Spearman's Rank Correlation": correlation.spearman_correlation,
    "Kendall's Tau": correlation.kendall_correlation,
    "Cross-Correlation": correlation.cross_correlation,
    "Variance Inflation Factor": correlation.vif
}

regression_methods = {
    "Linear Regression": regression.linear_regression,
    "Multiple Regression": regression.multiple_regression,
    "Logistic Regression": regression.logistic_regression,
    "Polynomial Regression": regression.polynomial_regression,
    "Lasso Regression": regression.lasso_regression,
    "Probit & Tobit Regression": regression.probit_tobit_regression,
    "Cox Regression": regression.cox_regression
}

method_field = 0
attribute_analysis_field = 1
expected_results_field = 2

def parse_analysis_method(item):
    method = item["method"]
    attribute_analysis = item["attribute_analysis"]
    expected_results = item["expected_results"]
    return (method, attribute_analysis, expected_results)

def get_analysis_methods(json_array):
    analysis_methods = []
    data = json.loads(json_array)
    for el_json in data:
        analysis_methods.append(parse_analysis_method(el_json))
    return analysis_methods

def apply_methods(file : FileStorage, json_array):
    methods = get_analysis_methods(json_array)
    df = pd.read_csv(file)

    for method in methods:
        if method[method_field] in clustering:
           print("Clustering")
           pass
        
        elif method[method_field] in correlation_methods:
            return correlation_methods[method[method_field]](methods[attribute_analysis_field])
        
        elif method[method_field] in regression:
            y = df[method[attribute_analysis_field].first()]
            X = df[method[attribute_analysis_field].drop(method[attribute_analysis_field].first())]
            return clustering[method[method_field]](X, y)
        else:
            return "Method not found"