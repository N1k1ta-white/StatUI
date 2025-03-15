import numpy as np
from sklearn.linear_model import LinearRegression, LogisticRegression, Ridge, Lasso
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline
from statsmodels.discrete.discrete_model import Probit
from lifelines import CoxPHFitter
import statsmodels.api as sm

class RegressionAnalytics:
    def __init__(self):
        pass

    def linear_regression(self, X, y):
        """Simple linear regression"""
        model = LinearRegression()
        model.fit(X, y)
        return {
            'coefficients': model.coef_,
            'intercept': model.intercept_,
            'model': model
        }

    def multiple_regression(self, X, y):
        """Multiple regression with multiple independent variables"""
        model = LinearRegression()
        model.fit(X, y)
        return {
            'coefficients': model.coef_,
            'intercept': model.intercept_,
            'model': model
        }

    def logistic_regression(self, X, y):
        """Logistic regression for binary classification"""
        model = LogisticRegression(random_state=42)
        model.fit(X, y)
        return {
            'coefficients': model.coef_,
            'intercept': model.intercept_,
            'model': model
        }

    def polynomial_regression(self, X, y, degree=2):
        """Polynomial regression"""
        model = make_pipeline(
            PolynomialFeatures(degree),
            LinearRegression()
        )
        model.fit(X, y)
        return {
            'model': model
        }

    def ridge_regression(self, X, y, alpha=1.0):
        """Ridge regression with L2 regularization"""
        model = Ridge(alpha=alpha)
        model.fit(X, y)
        return {
            'coefficients': model.coef_,
            'intercept': model.intercept_,
            'model': model
        }

    def lasso_regression(self, X, y, alpha=1.0):
        """Lasso regression with L1 regularization"""
        model = Lasso(alpha=alpha)
        model.fit(X, y)
        return {
            'coefficients': model.coef_,
            'intercept': model.intercept_,
            'model': model
        }

    def probit_regression(self, X, y):
        """Probit regression"""
        X = sm.add_constant(X)
        model = Probit(y, X)
        result = model.fit()
        return {
            'model': result
        }

    def cox_regression(self, data, duration_col, event_col, covariates):
        """Cox regression for survival analysis"""
        cph = CoxPHFitter()
        cph.fit(data, duration_col=duration_col, event_col=event_col, covariates=covariates)
        return {
            'model': cph
        }

# Example usage:
# reg = RegressionAnalytics()
# result = reg.linear_regression(X, y)