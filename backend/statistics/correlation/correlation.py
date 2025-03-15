import numpy as np
import pandas as pd
from scipy.stats import pearsonr, spearmanr, kendalltau
from statsmodels.stats.outliers_influence import variance_inflation_factor

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

# Example usage:
# x = np.random.rand(100)
# y = np.random.rand(100)
# data = pd.DataFrame({'x': x, 'y': y})
# print("Pearson's r:", pearson_correlation(x, y))
# print("Spearman's ρ:", spearman_correlation(x, y))
# print("Kendall's τ:", kendall_tau(x, y))
# print("Cross-Correlation:", cross_correlation(x, y))
# print("VIF:\n", calculate_vif(data))

# Example usage:
# data = pd.DataFrame(np.random.rand(100, 3), columns=['x', 'y', 'z'])
# print("Pearson's r matrix:\n", pearson_correlation_matrix(data))
# print("Spearman's ρ matrix:\n", spearman_correlation_matrix(data))
# print("Kendall's τ matrix:\n", kendall_tau_matrix(data))
# print("Cross-Correlation matrix:\n", cross_correlation_matrix(data))
# print("VIF:\n", calculate_vif(data))
