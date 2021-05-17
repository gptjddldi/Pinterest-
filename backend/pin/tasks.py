from celery import shared_task

from utils2 import recommend_pin, get_similarities
from .models import Pin

# 핀 리스트 호출 시, utils2.gs 함수 호출 -> 만약 캐싱되어있으면 걍 지나갈테고 아니면 호출되겠지
# 핀 삭제/생성 시 역시 utils2.gs 함수 호출해서 기존 캐싱 삭제하고 새로운 값 캐싱

@shared_task
def get_similar():
    print('a')
    qs = Pin.objects.all()
    get_similarities(qs)
    return True
