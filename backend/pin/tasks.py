from celery import shared_task

from utils2 import recommend_pin


@shared_task
def add(a, b):
    # print(lis)
    return a + b
