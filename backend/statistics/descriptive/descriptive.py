import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score
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
    return OPEN_AI_CLIENT.generate_response(prompt, "deepseek-chat")

def clustering(file: FileStorage):
    df = pd.read_csv(file)
    df = df.dropna()
    numerical_features = df.select_dtypes(include=[np.number]).columns
    numerical_data = df[numerical_features]

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(numerical_data)

    inertia = []
    silhouette_scores = []
    K = range(3, 7)
    
    for k in K:
        kmeans = KMeans(n_clusters=k, random_state=42)
        kmeans.fit(X_scaled)
        inertia.append(kmeans.inertia_)

        if k > 1:
            silhouette_scores.append(silhouette_score(X_scaled, kmeans.labels_))
    return silhouette_scores
