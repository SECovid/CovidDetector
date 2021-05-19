from locust import HttpUser, between, task


class WebsiteUser(HttpUser):
    wait_time = between(5, 15)


    @task
    def index(self):
        self.client.get("/hello")

    @task
    def getStatistics(self):
        self.client.get("/admin/statistics/time")

    @task
    def getCountries(self):
        self.client.get("/admin/statistics/country")
