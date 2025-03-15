import numpy as np
import pandas as pd
from scipy.stats import pearsonr, spearmanr, kendalltau
from statsmodels.stats.outliers_influence import variance_inflation_factor

class Correlation:

    def calculate_vif(data):
        vif_data = pd.DataFrame()
        vif_data["feature"] = data.columns
        vif_data["VIF"] = [variance_inflation_factor(data.values, i) for i in range(data.shape[1])]
        return vif_data

    def pearson_correlation_matrix(data):
        return data.corr(method='pearson')

    def spearman_correlation_matrix(data):
        return data.corr(method='spearman')

    def kendall_tau_matrix(data):
        return data.corr(method='kendall')

    def cross_correlation_matrix(data):
        n = data.shape[1]
        cross_corr = np.zeros((n, n))
        for i in range(n):
            for j in range(n):
                cross_corr[i, j] = np.correlate(data.iloc[:, i] - np.mean(data.iloc[:, i]), 
                                                data.iloc[:, j] - np.mean(data.iloc[:, j])) / (np.std(data.iloc[:, i]) * np.std(data.iloc[:, j]) * len(data))
        return cross_corr
