from numpy import zeros, correlate, mean, std
from pandas import DataFrame
from statsmodels.stats.outliers_influence import variance_inflation_factor

class Correlation:
    def calculate_vif(self, data):
        # Filter only numeric columns for VIF calculation
        numeric_data = data.select_dtypes(include=['number'])
        vif_data = DataFrame()
        vif_data["feature"] = numeric_data.columns
        vif_data["VIF"] = [variance_inflation_factor(numeric_data.values, i) for i in range(numeric_data.shape[1])]
    def pearson_correlation_matrix(self, data):
        # Filter only numeric columns for correlation calculation
        numeric_data = data.select_dtypes(include=['number'])
    def spearman_correlation_matrix(self, data):
        # Filter only numeric columns for correlation calculation
        numeric_data = data.select_dtypes(include=['number'])
    def kendall_tau_matrix(self, data):
        # Filter only numeric columns for correlation calculation
        numeric_data = data.select_dtypes(include=['number'])
    def cross_correlation_matrix(self, data):
        # Filter only numeric columns for correlation calculation
        numeric_data = data.select_dtypes(include=['number'])
        n = numeric_data.shape[1]
        cross_corr = zeros((n, n))
        for i in range(n):
            for j in range(n):
                cross_corr[i, j] = correlate(numeric_data.iloc[:, i] - mean(numeric_data.iloc[:, i]), 
                                numeric_data.iloc[:, j] - mean(numeric_data.iloc[:, j])) / \
                            (std(numeric_data.iloc[:, i]) * std(numeric_data.iloc[:, j]) * len(numeric_data))
        
        cross_corr = DataFrame(cross_corr, 
                     columns=numeric_data.columns,
                     index=numeric_data.columns)
        return cross_corr