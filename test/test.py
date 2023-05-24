# # 断言语句
# bcbxRate = input("请输入100学期学生学费：")
# bcbxRate = int(bcbxRate)
# try:
#     assert 6999<bcbxRate<12000
#     print("学费还没涨价")
# except Exception as e:
#     print("23456")
#     print(e)
# else:
#     print("123")
#
#
# # import hashlib
# #
# # # 待加密信息
# # str = 'this is a md5 Test.'
# #
# # # 创建md5对象
# # hl = hashlib.md5()
# #
# # # Tips
# # # 此处必须声明encode
# # # 若写法为hl.update(str) 报错为： Unicode-objects must be encoded before hashing
# # hl.update(str.encode(encoding='utf-8'))
# #
# # print('MD5加密前为 ：' + str)
# # print('MD5加密后为 ：' + hl.hexdigest())
#
#
#
# # 分类代码
# import requests
#
# from commons.value_util import GetValue
#
# class GetValue:
#     # Api = "https://www.qile.club:8688/api" # 网络
#     Api = "http://localhost:8360/api"  # 本地网址
#     token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uX2tleSI6InJ4ankrV1doWFFjVUVWK0tBU2FnbXc9PSIsIm9wZW5pZCI6Im9wYWRKNDJaTDJTX29rSEpwSml1VkwyRjB5Z2ciLCJ1c2VyX2lkIjoxMDk4LCJpYXQiOjE2ODIxNTU5Nzh9.oxo6JXIuC1-HyBRqKbk_K2L7V7ekFG1_muTorxVFvmo"
#     # 请求头
#     headers = {
#         "X-Hioshop-Token": token
#     }
#
# class  TestAddress:
#
#     # 收货地址详情
#     def test_addressDetail(self):
#         url = GetValue.Api + "/address/addressDetail"
#         data = {
#             "id": 249
#         }
#         res = requests.get(url=url, params=data,headers=GetValue.headers)
#         print("indexResult", res.json())
#
#     # 保存收货地址
#     def test_saveAddress(self):
#         url = GetValue.Api + "/address/saveAddress"
#         data = {"name": "ll", "mobile": "18967890876", "province_id": 3, "city_id": 38, "district_id": 423, "address": "借记卡号"}
#         res = requests.post(url=url, json=data,headers=GetValue.headers)
#         print("saveAddressResult", res.json())
#
#     # 获得收货地址
#     def test_getAddresses(self):
#         url = GetValue.Api + "/address/getAddresses"
#         res = requests.get(url=url,headers=GetValue.headers)
#         print("getAddressesResult", res.json())
#
#     # 删除收货地址
#     def test_deleteAddress(self):
#         url = GetValue.Api + "/address/deleteAddress"
#         data = {"id": "1572"}
#         res = requests.post(url=url,json=data, headers=GetValue.headers)
#         print("deleteAddressResult", res.json())
#
#      # 获取区域列表
#     def test_regionList(self):
#         url = GetValue.Api + "/region/list"
#         data = {"parentId": 1}
#         res = requests.get(url=url,params=data, headers=GetValue.headers)
#         print("deleteAddressResult", res.json())
#
# if __name__ == '__main__':
#    TestAddress().test_addressDetail()
#    TestAddress().test_saveAddress()
#    TestAddress().test_getAddresses()
#    TestAddress().test_deleteAddress()
#    TestAddress().test_regionList()