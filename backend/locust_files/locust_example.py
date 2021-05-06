from locust import HttpUser, TaskSet, task, between
import random


class QuickStartUser(HttpUser):
    wait_time = between(5, 30)

    @task(3)
    def home(self):
        self.client.get("/pins")

    @task(6)
    def get_sim(self):
        num = random.randint(1,2000)
        self.client.get("/pins/{0}/similar_pin".format(num))
