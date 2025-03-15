import numpy as np
from pandas import DataFrame, Series
from sklearn.cluster import KMeans
from sklearn.linear_model import LinearRegression, LogisticRegression, Ridge, Lasso
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline
from statsmodels.discrete.discrete_model import Probit
from lifelines import CoxPHFitter
import statsmodels.api as sm

class RegressionAnalytics:
    def __init__(self):
        pass

    def linear_regression(self, X: DataFrame, y: Series):
        """Simple linear regression for DataFrame input"""
        model = LinearRegression()
        model.fit(X, y)
        return {
            'coefficients': Series(model.coef_, index=X.columns),
            'intercept': model.intercept_,
            'model': model
        }

    def multiple_regression(self, X: DataFrame, y: Series):
        """Multiple regression with multiple independent variables"""
        model = LinearRegression()
        model.fit(X, y)
        return {
            'coefficients': Series(model.coef_, index=X.columns),
            'intercept': model.intercept_,
            'model': model
        }

    def logistic_regression(self, X: DataFrame, y: Series):
        """Logistic regression for binary classification"""
        model = LogisticRegression(random_state=42)
        model.fit(X, y)
        return {
            'coefficients': Series(model.coef_[0], index=X.columns),
            'intercept': model.intercept_[0],
            'model': model
        }

    def polynomial_regression(self, X: DataFrame, y: Series, degree=2):
        """Polynomial regression"""
        model = make_pipeline(
            PolynomialFeatures(degree),
            LinearRegression()
        )
        model.fit(X, y)
        return {
            'model': model
        }

    def ridge_regression(self, X: DataFrame, y: Series, alpha=1.0):
        """Ridge regression with L2 regularization"""
        model = Ridge(alpha=alpha)
        model.fit(X, y)
        return {
            'coefficients': Series(model.coef_, index=X.columns),
            'intercept': model.intercept_,
            'model': model
        }

    def lasso_regression(self, X: DataFrame, y: Series, alpha=1.0):
        """Lasso regression with L1 regularization"""
        model = Lasso(alpha=alpha)
        model.fit(X, y)
        return {
            'coefficients': Series(model.coef_, index=X.columns),
            'intercept': model.intercept_,
            'model': model
        }

    def probit_regression(self, X: DataFrame, y: Series):
        """Probit regression"""
        X = sm.add_constant(X)
        model = Probit(y, X)
        result = model.fit()
        return {
            'model': result
        }

    def cox_regression(self, data: DataFrame, duration_col: str, event_col: str, covariates: list):
        """Cox regression for survival analysis"""
        cph = CoxPHFitter()
        cph.fit(data, duration_col=duration_col, event_col=event_col, covariates=covariates)
        return {
            'model': cph
        }

# Example usage:
# reg = RegressionAnalytics()
# result = reg.linear_regression(X, y)