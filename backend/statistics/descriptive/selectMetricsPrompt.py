from pandas import DataFrame

def selectMetricsPrompt(dataset: DataFrame):
    return [        
        {
            "role": "system",
            "content": '''
You are a professional statistician
I will provide you statistics about the data for every attribute of the following sample
Return me only a json with the same structure, but preserve only the metrics which are insightful and interesting'''
        },
        {
            "role": "user",
            "content": f'''
    Sample: {dataset.head(10)}

    Metrics: {dataset.describe()}'''
        }
    ]
