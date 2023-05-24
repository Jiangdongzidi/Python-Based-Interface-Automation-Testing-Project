import requests

from commons.value_util import GetValue

# 封装公共函数
def test_currentlist(data):
        url = GetValue.Api + "/catalog/currentlist"
        # json = {"size": 8, "page": 1, "id": 1005000}
        res = requests.post(url=url,json=data,headers=GetValue.headers)
        print("currentlistResult", res.json())
        return res

# 封装token
def get_token():
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uX2tleSI6InJ4ankrV1doWFFjVUVWK0tBU2FnbXc9PSIsIm9wZW5pZCI6Im9wYWRKNDJaTDJTX29rSEpwSml1VkwyRjB5Z2ciLCJ1c2VyX2lkIjoxMDk4LCJpYXQiOjE2ODIxNTU5Nzh9.oxo6JXIuC1-HyBRqKbk_K2L7V7ekFG1_muTorxVFvmo"