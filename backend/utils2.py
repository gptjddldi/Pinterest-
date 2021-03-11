import csv
import re
import time

import pandas as pd
from django_pandas.io import read_frame
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

from pin.models import Pin


def tokenizer(raw, pos=["Noun","Alpha","Verb","Number"], stopword=[]):
    from konlpy.tag import Okt
    m = Okt()
    raw = ' '.join(re.findall(r"([a-zA-Z\dㄱ-힣]+)", raw))
    return [word for word, tag in m.pos(raw)
            # if tag in pos and word not in stopword
        ]


def get_recommendations(title, cosine_sim, indices, metadata):
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
    return movie_indices


def write_data_csv(pin):
    csv_file = open('data_set.csv','a', newline='')
    wr = csv.writer(csv_file)
    wr.writerow([pin['id'], pin['created_at'], pin['updated_at'], pin['title'], pin['image'], pin['author'],
                 pin['image_url']])
    csv_file.close()
    time.sleep(1)
    return pin['title']



def get_cosine_sim(metadata):
    metadata1 = metadata["title"].fillna('')
    tfidf = TfidfVectorizer(tokenizer=tokenizer, ngram_range=(1, 3), min_df=2, sublinear_tf=True)

    tfidf_matrix = tfidf.fit_transform(metadata1)
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    return cosine_sim


def get_indices(metadata):
    indices = pd.Series(metadata.index, index=metadata["id"]).drop_duplicates()
    return indices


def recommend_pin(pin):
    # title = write_data_csv(pin)
    # metadata = pd.read_csv('data_set.csv', engine='python', encoding='CP949')
    metadata = read_frame(Pin.objects.all(), fieldnames=['id', 'title'])
    cosine_sim = get_cosine_sim(metadata)
    indices = get_indices(metadata)
    return get_recommendations(pin.id, cosine_sim, indices, metadata)


# print(get_recommendations('#풍경 사진 #여행 #나무 #꽃'))
