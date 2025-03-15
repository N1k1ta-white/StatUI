import pandas as pd
import json
from .openAiClient import OPEN_AI_CLIENT
from .selectMetricsPrompt import selectMetricsPrompt
from werkzeug.datastructures import FileStorage

def getDescriptiveStatistics(file: FileStorage):
    df = pd.read_csv(file)
    prompt = selectMetricsPrompt(df)
    response = OPEN_AI_CLIENT.generate_response(prompt)
    print(response)
    json_string = response.replace("```json\n", "").replace("```", "").strip()
    return json.loads(json_string)