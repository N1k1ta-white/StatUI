import { stat } from "fs";
import { ExtractedType } from "../interfaces/extract-type";
import { statisticMethods } from "./methods";

const maxMethods = 3;

export function createPrompt(notes: string, scheme: Record<string, ExtractedType>) {
    return `I have a CSV file containing various attributes. For each attribute, I provide:
        ${Object.keys(scheme).map((key) => {
        const {type, factors = [], description = ''} = scheme[key];
        const typeDetails = type === 'factor' && factors.length > 0 
            ? ` [factor's values (do not use for as attributes) : ${factors.join(', ')}]` 
            : '';
        return `- ${key} (${type}${typeDetails})${description ? ': ' + description : ''}`;
        }).join('\n')}
        Notes about data: ${notes}
        Available statistical models/techniques: ${Object.values(statisticMethods).flat().join(', ')}

        Task:
        Based on the provided dataset attributes, their types, and any given notes or expectations, determine the most appropriate statistical methods for analyzing the data and extracting meaningful insights.

        Objectives:
            Identify the most suitable statistical models and techniques for analysis.
            Specify which attributes or attribute groups should be analyzed using each method.
            Explain how provided notes and expectations influenced the selection.
            Describe the expected insights and patterns that each analysis will uncover.
            Guidelines for Model Selection:
            Correlation Analysis:

            Use Pearson’s Correlation Coefficient for normally distributed continuous data.
            Use Spearman’s Rank Correlation or Kendall’s Tau for non-normal distributions or data with significant outliers.
            Use Cross-Correlation for time-series relationships.
            Regression Analysis:

            Use Linear Regression for simple relationships between continuous variables.
            Use Multiple Regression for analyzing interactions among multiple predictors.
            Use Polynomial Regression for nonlinear relationships.
            Use Logistic Regression for binary or categorical outcomes.
            Use Variance Inflation Factor (VIF) to detect multicollinearity.
            Clustering & Grouping:

            Use K-means Clustering for segmenting data into distinct groups.
            Use Hierarchical Clustering for discovering nested group structures.
            Use DBSCAN for identifying clusters of varying density and detecting outliers.
            Use Gaussian Mixture Models for probabilistic clustering.

        Output Requirement:
        Return the results as a array with JSON objects with three keys:
        - "method": a recommended statistical method (as strings).
        - "attribute_analysis": a specific attribute groups to analyze. If it is regression, first attribute is the dependent variable and the rest are independent variables.
        - "expected_results": description of insight and pattern we expect to discover from analysis with simple words understandable for everyone.

        Example Output:
        [
            {
                "method": string,
                "attribute_analysis": {${Object.keys(scheme).map((key) => `${key}`).join(', ')}}[],
                "expected_results": string
            },
        ...]

        Do not include any extra commentary or text ONLY JSON.
        Maximum ${maxMethods} methods can be recommended.`;
}