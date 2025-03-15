import pandas as pd
import json
from .openAiClient import OPEN_AI_CLIENT
from .selectMetricsPrompt import selectMetricsPrompt
from .generateGraphicsPrompt import generateGraphicsPrompt
from werkzeug.datastructures import FileStorage

def getDescriptiveStatistics(file: FileStorage):
    df = pd.read_csv(file)
    prompt = selectMetricsPrompt(df)
    return OPEN_AI_CLIENT.generate_response(prompt)

def getGraphics(file: FileStorage):
    df = pd.read_csv(file)
    prompt = generateGraphicsPrompt(df)
    return OPEN_AI_CLIENT.generate_response(prompt)

