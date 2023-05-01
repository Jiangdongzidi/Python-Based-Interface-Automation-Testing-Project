import requests

from commons.value_util import GetValue


class  TestCart:
    # 添加商品到购物车
    def test_cartAdd(self):
        url = GetValue.Api + "/cart/add"
        json = {"addType": 0, "goodsId": "1009024", "number": 1, "productId": 246}
        res = requests.post(url=url, json=json, headers=GetValue.headers)
        print("cartAddResult", res.json())

    # 获取购物车数据
    def test_cartIndex(self):
        url = GetValue.Api + "/cart/index"
        res = requests.get(url=url, headers=GetValue.headers)
        print("cartIndexResult", res.json())

    # 更新购物车商品
    def test_cartUpdate(self):
        url = GetValue.Api + "/cart/update"
        json = {"productId": 249, "number": 3, "id": 9014}
        res = requests.post(url=url,json=json, headers=GetValue.headers)
        print("cartUpdateResult", res)

    # 删除购物车商品
    def test_cartUpdate(self):
        url = GetValue.Api + "/cart/update"
        json = {"productIds": 246}
        res = requests.post(url=url,json=json, headers=GetValue.headers)
        print("cartUpdateResult", res)

    # 取消或选择购物车商品
    def test_cartCheck(self):
        url = GetValue.Api + "/cart/checked"
        json = {"productIds": 249, "isChecked": 0}
        res = requests.post(url=url,json=json, headers=GetValue.headers)
        print("cartCheckResult", res.json())

    # 获取购物车的商品件数
    def test_cartGoodsCount(self):
        url = GetValue.Api + "/cart/goodsCount"
        res = requests.get(url=url,headers=GetValue.headers)
        print("cartGoodsCountResult", res.json())

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

if __name__ == '__main__':
    TestCart().test_cartAdd()
    TestCart().test_cartGoodsCount()
    TestCart().test_cartCheck()
    TestCart().test_cartIndex()
    TestCart().test_cartUpdate()
    TestCart().test_cartCheckout()
