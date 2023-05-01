import requests

from commons.value_util import GetValue


class TestGoodsApi:
    # 统计商品总数
    def test_goodsCount(self):
        url = GetValue.Api + "/goods/count"

        res = requests.get(url=url, headers=GetValue.headers)
        print("goodsCountResult:", res.json())

    # 获得商品详情
    def test_goodsDetail(self):
        url = GetValue.Api + "/goods/detail"
        params = {
            "id":1181000,
        }
        res = requests.get(url=url,params=params, headers=GetValue.headers)
        print("goodsDetailResult:", res.json())

    # 获得商品列表
    def test_goodsList(self):
        url = GetValue.Api + "/goods/list"
        res = requests.get(url=url, headers=GetValue.headers)
        print("goodsListResult:", res.json())

if __name__ == '__main__':
    TestGoodsApi().test_goodsCount()
    TestGoodsApi().test_goodsDetail()
    TestGoodsApi().test_goodsList()