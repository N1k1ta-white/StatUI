from numpy import zeros, correlate, mean, std
from pandas import DataFrame
from statsmodels.stats.outliers_influence import variance_inflation_factor

class Correlation:
    def calculate_vif(self, data):
        vif_data = DataFrame()
        vif_data["feature"] = data.columns
        vif_data["VIF"] = [variance_inflation_factor(data.values, i) for i in range(data.shape[1])]
        return vif_data

    def pearson_correlation_matrix(self, data):
        return data.corr(method='pearson')

    def spearman_correlation_matrix(self, data):
        return data.corr(method='spearman')

    def kendall_tau_matrix(self, data):
        return data.corr(method='kendall')

    def cross_correlation_matrix(self, data):
        n = data.shape[1]
        cross_corr = zeros((n, n))
        for i in range(n):
            for j in range(n):
                cross_corr[i, j] = correlate(data.iloc[:, i] - mean(data.iloc[:, i]), 
                                                data.iloc[:, j] - mean(data.iloc[:, j])) / \
                                        (std(data.iloc[:, i]) * std(data.iloc[:, j]) * len(data))
        return cross_corr
