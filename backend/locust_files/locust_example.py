import json

from locust import HttpUser, TaskSet, task, between
import random


class QuickStartUser(HttpUser):
    wait_time = between(5, 30)

    # def on_start(self):
    #     # 로그인
    #     self.client.post("/rest-auth/login/", json={'email': 'crawler@example.com', 'password': 'a4848684'})
    #     pass
    #
    # def on_stop(self):
    #     self.client.post("/rest-auth/logout/")
    #     # 로그아웃
    #     pass

    # @task(1)
    # def home(self):
    #     self.client.get("/pins")

    @task(4)
    def get_sim(self):
        num = random.randint(1, 2000)
        # self.client.get("/pins/{0}".format(num))
        self.client.get("/pins/{0}/similar_pin".format(num))

    # @task(1)
    # def post_posting(self):
    #     self.client.post("/pins", json={'title': 'test'})
    #
    # @task(1)
    # def add_pin(self):
    #     num = random.randint(1, 2000)
    #     self.client.post("/boards/12/add_pin", json={'id': num})