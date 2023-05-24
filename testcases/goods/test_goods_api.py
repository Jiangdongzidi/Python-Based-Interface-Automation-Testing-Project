import requests

# from commons.value_util import GetValue

# 获得公共值
class GetValue:
    # Api = "https://www.qile.club:8688/api" # 网络
    Api = "http://localhost:8360/api"  # 本地网址
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uX2tleSI6InJ4ankrV1doWFFjVUVWK0tBU2FnbXc9PSIsIm9wZW5pZCI6Im9wYWRKNDJaTDJTX29rSEpwSml1VkwyRjB5Z2ciLCJ1c2VyX2lkIjoxMDk4LCJpYXQiOjE2ODIxNTU5Nzh9.oxo6JXIuC1-HyBRqKbk_K2L7V7ekFG1_muTorxVFvmo"
    # 请求头
    headers = {
        "X-Hioshop-Token": token
    }

class TestGoodsApi:

    goodsId = 1181000
    # 统计商品总数
    def test_goodsCount(self):
        url = GetValue.Api + "/goods/count"
        res = requests.get(url=url, headers=GetValue.headers)
        print("goodsCountResult:", res.json())
        assert res.status_code == 200
        assert res.json()["data"]["goodsCount"] >= 0


    # 获得商品详情
    def test_goodsDetail(self):
        url = GetValue.Api + "/goods/detail"
        params = {
            "id":TestGoodsApi.goodsId,
        }
        res = requests.get(url=url,params=params, headers=GetValue.headers)
        print("goodsDetailResult:", res.json())
        assert res.status_code == 200
        assert res.json()["data"]["info"]["id"] == TestGoodsApi.goodsId


    # 获得商品列表
    def test_goodsList(self):
        url = GetValue.Api + "/goods/list"
        res = requests.get(url=url, headers=GetValue.headers)
        # print("goodsListResult:", res.json())
        assert res.status_code == 200
        assert res.json()["data"] is not None

if __name__ == '__main__':
    TestGoodsApi().test_goodsCount()
    TestGoodsApi().test_goodsDetail()
    TestGoodsApi().test_goodsList()