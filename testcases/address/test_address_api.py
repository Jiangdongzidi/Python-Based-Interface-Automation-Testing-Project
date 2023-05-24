import requests

# ,from commons.value_util import GetValue
class GetValue:
    # Api = "https://www.qile.club:8688/api" # 网络
    Api = "http://localhost:8360/api"  # 本地网址
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uX2tleSI6InJ4ankrV1doWFFjVUVWK0tBU2FnbXc9PSIsIm9wZW5pZCI6Im9wYWRKNDJaTDJTX29rSEpwSml1VkwyRjB5Z2ciLCJ1c2VyX2lkIjoxMDk4LCJpYXQiOjE2ODIxNTU5Nzh9.oxo6JXIuC1-HyBRqKbk_K2L7V7ekFG1_muTorxVFvmo"
    # 请求头
    headers = {
        "X-Hioshop-Token": token
    }

class  TestAddress:

    # 地址ID
    addressId = 0

    # 保存收货地址
    def test_saveAddress(self):
        url = GetValue.Api + "/address/saveAddress"
        data = {"name": "ll", "mobile": "18967890876", "province_id": 3, "city_id": 38, "district_id": 423,
                "address": "借记卡号"}
        res = requests.post(url=url, json=data, headers=GetValue.headers)
        print(res.json())
        TestAddress.addressId = res.json()["data"]["id"]
        assert res.json()["data"]["id"] == TestAddress.addressId
        assert res.status_code == 200

    # 收货地址详情
    def test_addressDetail(self):
        url = GetValue.Api + "/address/addressDetail"
        data = {
            "id": TestAddress.addressId
        }
        res = requests.get(url=url, params=data,headers=GetValue.headers)
        print(res.json())
        assert res.status_code == 200
        # assert res.json()["data"]["id"] == TestAddress.addressId



    # 获得收货地址
    def test_getAddresses(self):
        url = GetValue.Api + "/address/getAddresses"
        res = requests.get(url=url,headers=GetValue.headers)
        print(res.json())
        assert res.status_code == 200
        assert res.json()["errno"] == 0

    # 删除收货地址
    def test_deleteAddress(self):
        url = GetValue.Api + "/address/deleteAddress"
        data = {"id": 1415}
        res = requests.post(url=url,json=data, headers=GetValue.headers)
        assert res.status_code == 200
        assert res.json()["errno"] == 0


     # 获取区域列表
    def test_regionList(self):
        url = GetValue.Api + "/region/list"
        data = {"parentId": 1}
        res = requests.get(url=url,params=data, headers=GetValue.headers)
        print(res.json())
        assert res.status_code == 200
        assert res.json()["data"][0]["name"] == "北京市"


if __name__ == '__main__':
   TestAddress().test_addressDetail()
   TestAddress().test_saveAddress()
   TestAddress().test_getAddresses()
   TestAddress().test_deleteAddress()
   TestAddress().test_regionList()