import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score
from sklearn.decomposition import PCA

class Clustering:
    def kmeans(self, df: pd.DataFrame):
        numerical_features = df.select_dtypes(include=[np.number]).columns
        numerical_data = df[numerical_features]

        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(numerical_data)

        inertia = []
        silhouette_scores = []
        clusters_count = range(3, 7)
        
        for k in clusters_count:
            kmeans = KMeans(n_clusters=k, random_state=42)
            kmeans.fit(X_scaled)
            inertia.append(kmeans.inertia_)

            if k > 1:
                silhouette_scores.append(silhouette_score(X_scaled, kmeans.labels_))
            
        optimal_clusters_count = clusters_count[np.argmax(silhouette_scores)]

        model = KMeans(n_clusters=optimal_clusters_count, random_state=42)
        model.fit(X_scaled)
        pca = PCA(n_components=2)
        X_pca = pca.fit_transform(X_scaled)

        df['Cluster'] = kmeans.labels_
        df['dim1'] = X_pca[:, 0]
        df['dim2'] = X_pca[:, 1]
        cluster_groups = df.groupby('Cluster').apply(
            lambda x: x[['dim1', 'dim2']].apply(lambda row: {"x": row['dim1'], "y": row['dim2']}, axis=1).to_list()
        ).reset_index()

        result = cluster_groups.apply(lambda row: {
            row['Cluster']: row[0]
        }, axis=1).tolist()

        result_dict = {}
        for res in result:
            result_dict.update(res)
        return result_dict