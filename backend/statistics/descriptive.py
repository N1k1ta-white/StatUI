import pandas as pd
from werkzeug.datastructures import FileStorage

def getDescriptiveStatistics(file: FileStorage):
    df = pd.read_csv(file)
    return df.describe()