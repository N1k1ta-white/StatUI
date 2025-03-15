import { Body, Get, Injectable } from '@nestjs/common';
import { ExtractedType } from 'src/util/extract-type';

@Injectable()
export class AiSuggestionService {

    createPrompt(notes: string, scheme: Record<string, ExtractedType>) {
        return `I have a CSV file containing various attributes. For each attribute, I provide:
            ${Object.keys(scheme).map((key) => {
            const {name, type, description = ''} = scheme[key];
            return `- ${name} (${type})${description ? ': ' + description : ''}`;
            }).join('\n')}
            Notes about data: ${notes}
            Available statistical models/techniques: {Pearson's Correlation Coefficient, Spearman's Rank Correlation, Kendall's Tau, Cross-Correlation, Variance Inflation Factor, Linear Regression, Multiple Regression, Logistic Regression, Polynomial Regression, Probit & Tobit Regression, Cox Regression, Lasso Regression, K-means Clustering, Hierarchical Clustering, DBSCAN, Gaussian Mixture Models}

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
            Return the results as a JSON object with four keys:
            - "models": a list of recommended statistical methods (as strings).
            - "attribute_analysis": a list of specific attribute pairs or groups to analyze.
            - "expected_results": description of insights and patterns we expect to discover from each analysis.

            Do not include any extra commentary or text.`;
    }

    @Get('suggest')
    async suggestAnalysisMethods(@Body() data: {notes: string, scheme: ExtractedType[]}) {

    }
}
