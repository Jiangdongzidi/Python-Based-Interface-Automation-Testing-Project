
import requests

# from business import common

# 获得公共值
class GetValue:
    # Api = "https://www.qile.club:8688/api" # 网络
    Api = "http://localhost:8360/api"  # 本地网址
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uX2tleSI6InJ4ankrV1doWFFjVUVWK0tBU2FnbXc9PSIsIm9wZW5pZCI6Im9wYWRKNDJaTDJTX29rSEpwSml1VkwyRjB5Z2ciLCJ1c2VyX2lkIjoxMDk4LCJpYXQiOjE2ODIxNTU5Nzh9.oxo6JXIuC1-HyBRqKbk_K2L7V7ekFG1_muTorxVFvmo"
    # 请求头
    headers = {
        "X-Hioshop-Token": token
    }

class  TestCategorize:
    #
    headers = {
        "X-Hioshop-Token": GetValue.token
    }
    # 全部分类
    def test_index(self):
        url = GetValue.Api + "/catalog/index"
        res = requests.get(url=url)
        print(res.json())
        assert res.status_code == 200  # 响应断言
        assert res.json()['errno'] == 0


    # 当前分类
    def test_current(self):
        url = GetValue.Api + "/catalog/current"
        data = {"id": 1005000}
        res = requests.get(url=url,params=data,headers=GetValue.headers)
        assert res.status_code == 200
        assert res.json()["data"]["name"] == "居家"
        print("res=====",res.json()["data"]["name"])


    # 分类列表
    def test_currentlist(self):
        url = GetValue.Api + "/catalog/currentlist"
        json = {"size": 8, "page": 1, "id": 1005000}
        res = requests.post(url=url,json=json,headers=GetValue.headers)
        assert res.status_code == 200
        # assert res.json()[]
        print("currentlistResult", res.json())

    # def test_currentlist2(self):
    #     data = {"size": 8, "page": 1, "id": 1005000}
    #     res = common.test_currentlist(data)
    #     assert res.status_code == 200

    # def test_currentlist3(self):
    #     url = GetValue.Api + "/catalog/currentlist"
    #     json = {"size": 8, "page": 1, "id": 1005000}
    #     res = requests.post(url=url,json=json,headers=common.get_token())
    #     print("currentlistResult", res.json())

if __name__ == '__main__':
    TestCategorize().test_index()
    TestCategorize().test_current()
    TestCategorize().test_currentlist()