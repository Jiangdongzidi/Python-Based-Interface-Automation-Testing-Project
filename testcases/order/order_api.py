import requests

from commons.value_util import GetValue


class  TestOrder:

    # 收货地址详情
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
        data = {"addressId": 1928, "postscript": "", "freightPrice": 8, "actualPrice": "257.00", "offlinePay": 0}
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

    # 订单详情
    def test_orderDetail(self):
        url = GetValue.Api + "/order/detail"
        data = {
            "orderId":1422
        }
        res = requests.get(url=url, params=data,headers=GetValue.headers)
        print("orderDetailResult", res.json())


    # 取消订单
    def test_orderCancel(self):
        url = GetValue.Api + "/order/cancel"
        data = {
            "orderId":1422
        }
        res = requests.post(url=url, json=data,headers=GetValue.headers)
        print("orderCancelResult", res.json())

    # 获取订单数
    def test_orderCount(self):
        url = GetValue.Api + "/order/orderCount"
        data = {
            "id":0
        }
        res = requests.get(url=url, params=data,headers=GetValue.headers)
        print("orderCountResult", res.json())

    # 物流信息
    def test_orderExpress(self):
        url = GetValue.Api + "/order/express"
        data = {
            "orderId":1424
        }
        res = requests.get(url=url, params=data,headers=GetValue.headers)
        print("orderExpressResult", res.json())


if __name__ == '__main__':
    TestOrder().test_preWeixinPay()
    TestOrder().test_orderSubmit()
    TestOrder().test_orderList()
    TestOrder().test_orderDetail()
    TestOrder().test_orderCancel()
    TestOrder().test_orderCount()
    TestOrder().test_orderExpress()