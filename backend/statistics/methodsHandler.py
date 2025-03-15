import json
import pandas as pd
from correlation import Correlation
from werkzeug.datastructures import FileStorage

correlation = Correlation()

clustering = ["K-means Clustering", "Hierarchical Clustering", "DBSCAN", "Gaussian Mixture Model"]

correlation_methods = {
    "Pearson's Correlation Coefficient": correlation.pearson_correlation,
    "Spearman's Rank Correlation": correlation.spearman_correlation,
    "Kendall's Tau": correlation.kendall_correlation,
    "Cross-Correlation": correlation.cross_correlation,
    "Variance Inflation Factor": correlation.vif
}

regression = ["Linear Regression", "Multiple Regression", "Logistic Regression", 
              "Polynomial Regression", "Lasso Regression", "Probit & Tobit Regression", 
              "Cox Regression"]

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
            # Call the appropriate clustering method here
            print("Clustering method")
            pass
        elif method[method_field] in correlation_methods:
            return correlation_methods[method[method_field]](methods[attribute_analysis_field])
        elif method[method_field] in regression:
            print("Regression method")
            # Call the appropriate regression method here
            pass
        else:
            return "Method not found"