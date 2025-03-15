import pandas as pd
from .openAiClient import OPEN_AI_CLIENT
from .selectMetricsPrompt import selectMetricsPrompt
from .generateGraphicsPrompt import generateGraphicsPrompt
from werkzeug.datastructures import FileStorage
from pandas import DataFrame

def getDescriptiveStatistics(df: DataFrame):
    prompt = selectMetricsPrompt(df)
    return OPEN_AI_CLIENT.generate_response(prompt)

def getGraphics(df: DataFrame):
    prompt = generateGraphicsPrompt(df)
    return OPEN_AI_CLIENT.generate_response(prompt)