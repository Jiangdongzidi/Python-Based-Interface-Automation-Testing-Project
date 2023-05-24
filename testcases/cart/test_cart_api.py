import json

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

class  TestCart:

    goodsId = 1097004
    productId = 120

    # 添加商品到购物车
    def test_cartAdd(self):
        url = GetValue.Api + "/cart/add"
        json = {"addType": 0, "goodsId": TestCart.goodsId, "number": 1, "productId": TestCart.productId}
        res = requests.post(url=url, json=json, headers=GetValue.headers)
        print("cartAddResult", res.json())
        assert res.status_code == 200
        assert res.json()["data"]["cartList"][0]["goods_id"] == 1097004
        assert res.json()["data"]["cartList"][0]["product_id"] == TestCart.productId
    # 获取购物车数据
    def test_cartIndex(self):
        url = GetValue.Api + "/cart/index"
        res = requests.get(url=url, headers=GetValue.headers)
        print("cartIndexResult", res.json())
        assert res.status_code == 200
        assert res.json()["data"]["cartList"][0]["goods_id"] == 1097004
        assert res.json()["data"]["cartList"][0]["product_id"] == TestCart.productId


    # # 更新购物车商品
    # def test_cartUpdate(self):
    #     url = GetValue.Api + "/cart/update"
    #     json = {"productId": TestCart.productId, "number": 2, "id": "9100","abc":123}
    #     # res = requests.post(url=url,data=json.dumps(data), headers= GetValue.headers)
    #     res = requests.post(url=url, json=json, headers=GetValue.headers)
    #     assert res.status_code == 500
    #     print("cartUpdateResult", res.status_code)
    #     assert res.status_code == 200
    #     assert res.text == "OK"

    # 删除购物车商品
    # def test_cartUpdate(self):
    #     url = GetValue.Api + "/cart/update"
    #     json = {"productIds": "246"}
    #     res = requests.post(url=url,json=json, headers=GetValue.headers)
    #     print("cartUpdateResult", res)

    # 取消或选择购物车商品
    def test_cartCheck(self):
        url = GetValue.Api + "/cart/checked"
        json = {"productIds": 249, "isChecked": 0}
        res = requests.post(url=url,json=json, headers=GetValue.headers)
        print("cartCheckResult", res.json())
        assert res.status_code == 200
        assert res.json()["data"]["cartList"][0]["goods_id"] == 1097004
        assert res.json()["data"]["cartList"][0]["product_id"] == TestCart.productId

    # 获取购物车的商品件数
    def test_cartGoodsCount(self):
        url = GetValue.Api + "/cart/goodsCount"
        res = requests.get(url=url,headers=GetValue.headers)
        print("cartGoodsCountResult", res.json())
        assert res.status_code == 200
        assert res.json()["data"]["cartTotal"]["goodsCount"] >= 0

    # 下单前信息确认
    def test_cartCheckout(self):
        url = GetValue.Api + "/cart/checkout"
        data = {
            "addressId":0,
            "addType":0,
            "orderFrom":"undefined",
            "type":0
        }
        res = requests.get(url=url,params=data, headers=GetValue.headers)
        print("cartCheckoutResult", res.json())
        assert res.status_code == 200
        assert res.json()["data"]["checkedGoodsList"][0]["goods_id"] == TestCart.goodsId

if __name__ == '__main__':
    TestCart().test_cartAdd()
    TestCart().test_cartGoodsCount()
    TestCart().test_cartCheck()
    TestCart().test_cartIndex()
    TestCart().test_cartUpdate()
    TestCart().test_cartCheckout()
