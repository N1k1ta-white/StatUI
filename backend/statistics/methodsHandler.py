import json
from pandas import DataFrame
from correlation.correlation import Correlation
from regression.regression import Regression

correlation = Correlation()
regression = Regression()

clustering = ["K-means Clustering", "Hierarchical Clustering", "DBSCAN", "Gaussian Mixture Model"]

correlation_methods = {
    "Pearson's Correlation Coefficient": correlation.pearson_correlation_matrix,
    "Spearman's Rank Correlation": correlation.spearman_correlation_matrix,
    "Kendall's Tau": correlation.kendall_tau_matrix,
    "Cross-Correlation": correlation.cross_correlation_matrix,
    "Variance Inflation Factor": correlation.calculate_vif
}

regression_methods = {
    "Linear Regression": regression.linear_regression,
    "Multiple Regression": regression.multiple_regression,
    "Logistic Regression": regression.logistic_regression,
    "Polynomial Regression": regression.polynomial_regression,
    "Lasso Regression": regression.lasso_regression,
    "Probit & Tobit Regression": regression.probit_regression,
}

method_field = 0
attribute_analysis_field = 1
expected_results_field = 2

def parse_analysis_method(item):
    method = item["method"]
    attribute_analysis = item["attributes_analysis"]
    expected_results = item.get("expected_results", None)
    return (method, attribute_analysis, expected_results)

def get_analysis_methods(json_array):
    analysis_methods = []
    for el_json in json_array:
        analysis_methods.append(parse_analysis_method(el_json))
    return analysis_methods

def apply_methods(df: DataFrame, json_array):
    methods = get_analysis_methods(json_array)

    for (method, attribute_analysis, expected_results) in methods:
        if method in clustering:
           print("Clustering")
           pass
        
        elif method in correlation_methods:
            # Use attribute_analysis directly, not method[attribute_analysis_field]
            correlation_matrix = correlation_methods[method](df[attribute_analysis])
            return {
                "type": "heatmap",
                "name": "Pearson's Correlation Coefficient",
                "description": "The correlation matrix is visualized in this plot.",
                "data": {
                    "correlationMatrix": correlation_matrix.values.tolist(),
                    "values": correlation_matrix.columns.tolist()
                }
            }
        
        elif method in regression_methods:
            # Use attribute_analysis directly, not method[attribute_analysis_field]
            df.dropna(inplace=True)
            y = df[attribute_analysis[0]]
            numeric_cols = [col for col in attribute_analysis[1:] if df[col].dtype.kind in 'ifc']
            X = df[numeric_cols]
            num_dimensions = len(attribute_analysis) - 1
            return {
                'type': 'regression',
                'name': 'Linear Regression',
                "data": regression_methods[method](X, y, num_dimensions),
                "description": "The dimensionality of the data has been reduced to 1D using LSA. The regression line is visualized in this plot."
            }
        else:
            return {"error": "Method not found"}