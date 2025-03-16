import numpy as np
from pandas import DataFrame, Series
from sklearn.cluster import KMeans
from sklearn.linear_model import LinearRegression, LogisticRegression, Ridge, Lasso
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline
from statsmodels.discrete.discrete_model import Probit
import statsmodels.api as sm
from sklearn.decomposition import TruncatedSVD

class Regression:
    def __init__(self):
        pass

    def reduce_dimensions(self, X: DataFrame, n_components):
        """Reduce the dimensionality of the data using PCA"""
        if (n_components > 1):
            svd = TruncatedSVD(n_components=1)
            return svd.fit_transform(X)
        return X
    
    def make_flatten(self, X):
        if isinstance(X, DataFrame):
            return X.values.flatten() if len(X.shape) > 1 else X.values
        elif hasattr(X, 'flatten') and len(X.shape) > 1:
            return X.flatten()
        return X


    def linear_regression(self, X: DataFrame, y: Series, n_components):
        """Simple linear regression for DataFrame input"""
        model = LinearRegression()
        model.fit(X, y)

        X_reduced = self.reduce_dimensions(X, n_components)
        X_reduced = self.make_flatten(X_reduced)

        return {
            'Y': y.name,
            'X': X.columns.tolist(),
            'points': {
                'x': X_reduced.tolist(),
                'y': y.tolist()
            },
            'regression_line': {
                'x': X_reduced.tolist(),
                'y': model.predict(X).tolist()
            },
        }

    def multiple_regression(self, X: DataFrame, y: Series, n_components):
        """Multiple regression with multiple independent variables"""
        model = LinearRegression()
        model.fit(X, y)

        X_reduced = self.reduce_dimensions(X, n_components)
        X_reduced = self.make_flatten(X_reduced)

        return {
            'Y': y.name,
            'X': X.columns.tolist(),
            'points': {
                'x': X_reduced.tolist(),
                'y': y.tolist()
            },
            'regression_line': {
                'x': X_reduced.tolist(),
                'y': model.predict(X).tolist()
            },
        }

    def logistic_regression(self, X: DataFrame, y: Series, n_components):
        """Logistic regression for binary classification"""
        model = LogisticRegression(random_state=42)
        y = y.astype(int)
        model.fit(X, y)
        X_reduced = self.reduce_dimensions(X, n_components)
        X_reduced = self.make_flatten(X_reduced)

        return {
            'Y': y.name,
            'X': X.columns.tolist(),
            'points': {
                'x': X_reduced.tolist(),
                'y': y.tolist()
            },
            'regression_line': {
                'x': X_reduced.tolist(),
                'y': model.predict(X).tolist()
            },
        }

    def polynomial_regression(self, X: DataFrame, y: Series, n_components, degree=2):
        """Polynomial regression"""
        model = make_pipeline(
            PolynomialFeatures(degree),
            LinearRegression()
        )
        model.fit(X, y)

        X_reduced = self.reduce_dimensions(X, n_components)
        X_reduced = self.make_flatten(X_reduced)

        return {
            'Y': y.name,
            'X': X.columns.tolist(),
            'points': {
                'x': X_reduced.tolist(),
                'y': y.tolist()
            },
            'regression_line': {
                'x': X_reduced.tolist(),
                'y': model.predict(X).tolist()
            },
        }
    def ridge_regression(self, X: DataFrame, y: Series, n_components, alpha=1.0):
        """Ridge regression with L2 regularization"""
        model = Ridge(alpha=alpha)
        model.fit(X, y)

        X_reduced = self.reduce_dimensions(X, n_components)
        X_reduced = self.make_flatten(X_reduced)

        return {
            'Y': y.name,
            'X': X.columns.tolist(),
            'points': {
                'x': X_reduced.tolist(),
                'y': y.tolist()
            },
            'regression_line': {
                'x': X_reduced.tolist(),
                'y': model.predict(X).tolist()
            },
        }

    def lasso_regression(self, X: DataFrame, y: Series, n_components, alpha=1.0):
        """Lasso regression with L1 regularization"""
        model = Lasso(alpha=alpha)
        model.fit(X, y)

        X_reduced = self.reduce_dimensions(X, n_components)
        X_reduced = self.make_flatten(X_reduced)

        return {
            'Y': y.name,
            'X': X.columns.tolist(),
            'points': {
                'x': X_reduced.tolist(),
                'y': y.tolist()
            },
            'regression_line': {
                'x': X_reduced.tolist(),
                'y': model.predict(X).tolist()
            },
        }

    def probit_regression(self, X: DataFrame, y: Series, n_components):
        """Probit regression"""
        X = sm.add_constant(X)
        model = Probit(y, X)
        result = model.fit()

        X_reduced = self.reduce_dimensions(X, n_components)
        X_reduced = self.make_flatten(X_reduced)

        return {
            'Y': y.name,
            'X': X.columns.tolist(),
            'points': {
                'x': X_reduced.tolist(),
                'y': y.tolist()
            },
            'regression_line': {
                'x': X_reduced.tolist(),
                'y': result.predict(X).tolist()
            },
        }

# Example usage:
# reg = RegressionAnalytics()
# result = reg.linear_regression(X, y)