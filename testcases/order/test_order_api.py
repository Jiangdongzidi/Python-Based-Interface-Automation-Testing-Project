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

class  TestOrder:

    orderId = 1337
    # 下订单
    def test_preWeixinPay(self):
        url = GetValue.Api + "/pay/preWeixinPay"
        data = {
            "orderId": 1422
        }
        res = requests.get(url=url, params=data,headers=GetValue.headers)
        print("preWeixinPayResult", res.json())

    # 提交订单
    def test_orderSubmit(self):
        url = GetValue.Api + "/order/submit"
        # data = {"addressId": "1424", "productId": "120", "postscript": "", "freightPrice": 8, "actualPrice": "257.00", "offlinePay": 0}
        data = {"addressId": 1424, "postscript": "", "freightPrice": 25, "actualPrice": "115.00", "offlinePay": 0,"productId": 120}
        res = requests.post(url=url, json=data,headers=GetValue.headers)
        print("orderSubmitResult", res.json())

     # 订单列表
    def test_orderList(self):
        url = GetValue.Api + "/order/list"
        data = {
            "showType":0,
            "size":8,
            "page":1
        }
        res = requests.get(url=url, params=data,headers=GetValue.headers)
        print("orderListResult", res.json())
        assert res.status_code == 200
        assert res.json()["data"]["count"] >= 0

    # 订单详情
    def test_orderDetail(self):
        url = GetValue.Api + "/order/detail"
        data = {
            "orderId": TestOrder.orderId
        }
        res = requests.get(url=url, params=data,headers=GetValue.headers)
        print("orderDetailResult", res.json())
        assert res.status_code == 200
        assert res.json()["data"]["orderInfo"]["id"] == TestOrder.orderId


    # 取消订单
    def test_orderCancel(self):
        url = GetValue.Api + "/order/cancel"
        data = {
            "orderId": TestOrder.orderId
        }
        res = requests.post(url=url, json=data,headers=GetValue.headers)
        print("orderCancelResult", res.json())
        assert res.status_code == 200
        # assert res.json()

    # 获取订单数
    def test_orderCount(self):
        url = GetValue.Api + "/order/orderCount"
        data = {
            "id":0
        }
        res = requests.get(url=url, params=data,headers=GetValue.headers)
        print("orderCountResult", res.json())
        assert res.status_code == 200

    # 物流信息
    def test_orderExpress(self):
        url = GetValue.Api + "/order/express"
        data = {
            "orderId":1424
        }
        res = requests.get(url=url, params=data,headers=GetValue.headers)
        print("orderExpressResult", res.json())
        assert res.status_code == 200
        if res.json()["errmsg"] == '暂无物流信息':
            assert res.json()["errno"] == 400


if __name__ == '__main__':
    TestOrder().test_preWeixinPay()
    TestOrder().test_orderSubmit()
    TestOrder().test_orderList()
    TestOrder().test_orderDetail()
    TestOrder().test_orderCancel()
    TestOrder().test_orderCount()
    TestOrder().test_orderExpress()