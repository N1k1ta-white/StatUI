from pandas import DataFrame

def generateGraphicsPrompt(dataset: DataFrame):
    return [        
        {
            "role": "system",
            "content": '''
You are a professional statistician
I will provide you statistics about the data for every attribute of the following sample
Select which attributes will contribute to create the best graphics
Return several suggestion
Only json in this format
{
   "type": "bar",
   "xAxis": "colName",
   "yAxis": "colName"
}[]
'''
        },
        {
            "role": "user",
            "content": f'''
    Sample: {dataset.head(10)}

    Metrics: {dataset.describe()}'''
        }
    ]
