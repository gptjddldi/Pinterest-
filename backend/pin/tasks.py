from celery import shared_task

from utils2 import recommend_pin


@shared_task
def task_get_similarity(pin):
    print(pin)
    # print(lis)
    return None
