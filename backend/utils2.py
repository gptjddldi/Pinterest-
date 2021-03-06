import csv
import re
import time

import pandas as pd
from django_pandas.io import read_frame
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import os
# Python 이 실행될 때 DJANGO_SETTINGS_MODULE이라는 환경 변수에 현재 프로젝트의 settings.py파일 경로를 등록합니다.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings.prod')
# 이제 장고를 가져와 장고 프로젝트를 사용할 수 있도록 환경을 만듭니다.
import django
django.setup()
from pin.models import Pin


def tokenizer(raw, pos=["Noun", 'noun'], stopword=[]):
    from konlpy.tag import Okt
    m = Okt()
    raw = ' '.join(re.findall(r"([a-zA-Z\dㄱ-힣]+)", raw))
    # raw = [' '.join(re.findall(r"([a-zA-z\dㄱ-힣]+)", title)) for title in raw]
    return [word for word, tag in m.pos(raw)
            # if tag in pos and word not in stopword
        ]


def get_recommendations(pin_id, cosine_sim, indices, metadata):
    # indices 에서 pin_id 에 해당하는 index
    idx = indices[pin_id]

    # 그 index 에 해당하는 sim list 를 인덱스와 함께 가져옴 [i][sim]
    sim_scores = list(enumerate(cosine_sim[idx]))
    # 유사도를 기준으로 내림차순으로 정렬
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # 최대 48개까지 뽑음
    sim_scores = sim_scores[1:48]

    # 인덱스만 뽑아서
    pin_indices = [i[0] for i in sim_scores]

    # 이제 이 인덱스들을 다시 pin_id 에 매칭해서 리턴함!
    ret = [metadata['id'][idx] for idx in pin_indices]
    return ret


# def write_data_csv(pin):
#     csv_file = open('data_set.csv','a', newline='')
#     wr = csv.writer(csv_file)
#     wr.writerow([pin['id'], pin['created_at'], pin['updated_at'], pin['title'], pin['image'], pin['author'],
#                  pin['image_url']])
#     csv_file.close()
#     time.sleep(1)
#     return pin['title']


def get_similarities(metadata):
    metadata1 = metadata["title"].fillna('')
    tfidf = TfidfVectorizer(tokenizer=tokenizer, ngram_range=(1, 3), min_df=2, sublinear_tf=True)

    tfidf_matrix = tfidf.fit_transform(metadata1)
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    # print(cosine_sim)
    return cosine_sim


def get_indices(metadata):
    # pin 의 id 를 기준으로 새로운 시리즈를 만듦
    # 대략 id = ['421', '555', '653'] 이라면 indices = [{1:421}, {2:555}, {3:653}] 이런 식임
    indices = pd.Series(metadata.index, index=metadata["id"]).drop_duplicates()
    return indices


def recommend_pin(pin):
    # title = write_data_csv(pin)
    # metadata = pd.read_csv('data_set.csv', engine='python', encoding='CP949')
    metadata = read_frame(Pin.objects.all(), fieldnames=['id', 'title'])
    similarities = gs(metadata)
    indices = get_indices(metadata)
    return get_recommendations(pin.id, similarities, indices, metadata)


# print(get_recommendations('#풍경 사진 #여행 #나무 #꽃'))

def gs(metadata):
    from konlpy.tag import Okt
    okt = Okt()
    title_lists = metadata["title"].fillna('')
    title_lists = [' '.join(re.findall(r"([a-zA-Z\dㄱ-힣]+)", title)) for title in title_lists]
    noun_title_lists = [' '.join(okt.nouns(title)) for title in title_lists]

    tfidf = TfidfVectorizer(min_df=1)

    tfidf_matrix = tfidf.fit_transform(noun_title_lists)
    # similarities = tfidf_matrix * tfidf_matrix.T
    similarities = linear_kernel(tfidf_matrix, tfidf_matrix)
    return similarities

    # raw = ' '.join(re.findall(r"([a-zA-Z\dㄱ-힣]+)", raw))
