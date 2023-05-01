import requests

from commons.value_util import GetValue


class  TestAddress:

    # 收货地址详情
    def test_addressDetail(self):
        url = GetValue.Api + "/address/addressDetail"
        data = {
            "id": 249
        }
        res = requests.get(url=url, params=data,headers=GetValue.headers)
        print("indexResult", res.json())

    # 保存收货地址
    def test_saveAddress(self):
        url = GetValue.Api + "/address/saveAddress"
        data = {"name": "ll", "mobile": "18967890876", "province_id": 3, "city_id": 38, "district_id": 423, "address": "借记卡号"}
        res = requests.post(url=url, json=data,headers=GetValue.headers)
        print("saveAddressResult", res.json())

    # 获得收货地址
    def test_getAddresses(self):
        url = GetValue.Api + "/address/getAddresses"
        res = requests.get(url=url,headers=GetValue.headers)
        print("getAddressesResult", res.json())

    # 删除收货地址
    def test_deleteAddress(self):
        url = GetValue.Api + "/address/deleteAddress"
        data = {"id": "1572"}
        res = requests.post(url=url,json=data, headers=GetValue.headers)
        print("deleteAddressResult", res.json())

     # 获取区域列表
    def test_regionList(self):
        url = GetValue.Api + "/region/list"
        data = {"parentId": 1}
        res = requests.get(url=url,params=data, headers=GetValue.headers)
        print("deleteAddressResult", res.json())

if __name__ == '__main__':
   TestAddress().test_addressDetail()
   TestAddress().test_saveAddress()
   TestAddress().test_getAddresses()
   TestAddress().test_deleteAddress()
   TestAddress().test_regionList()