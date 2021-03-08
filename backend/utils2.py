import csv

import pandas as pd
metadata = pd.read_csv('data_set.csv', engine='python', encoding='CP949')
from sklearn.feature_extraction.text import TfidfVectorizer


def tokenizer(raw, pos=["Noun","Alpha","Verb","Number"], stopword=[]):
    from konlpy.tag import Okt
    m = Okt()
    return [word for word, tag in m.pos(raw)
            # if tag in pos and word not in stopword
        ]

metadata1 = metadata["title"].fillna('')
tfidf = TfidfVectorizer(tokenizer=tokenizer, ngram_range=(1,3), min_df=2, sublinear_tf=True)
tfidf_matrix = tfidf.fit_transform(metadata1)

from sklearn.metrics.pairwise import linear_kernel

cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

indices = pd.Series(metadata.index, index=metadata["title"]).drop_duplicates()

# print(indices[40:50])
# print(list(enumerate(cosine_sim[40])))
# print(cosine_sim.shape)
def get_recommendations(title, cosine_sim=cosine_sim, indices=indices):
    # Get the index of the movie that matches the title
    idx = indices[title]

    # Get the pairwsie similarity scores of all movies with that movie
    sim_scores = list(enumerate(cosine_sim[idx]))

    # Sort the movies based on the similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get the scores of the 10 most similar movies
    sim_scores = sim_scores[1:48]

    # Get the movie indices
    movie_indices = [i[0] for i in sim_scores]

    # Return the top 10 most similar movies
    return metadata['title'].iloc[movie_indices]


def write_data_csv(pin):
    with open('data_set.csv','a', newline='') as csv_file:
        wr = csv.writer(csv_file)
        wr.writerow([pin['id'], pin['created_at'], pin['updated_at'], pin['title'], pin['image'], pin['author'],
                     pin['image_url']])
    return pin['title']

# print(get_recommendations('#풍경 사진 #여행 #나무 #꽃'))
