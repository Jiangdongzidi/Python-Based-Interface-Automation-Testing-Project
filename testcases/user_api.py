import requests

from commons.request_util import RequestUtil
from commons.value_util import GetValue


class TestUserApi:
    # 请求头
    headers = {
        "X-Hioshop-Token": GetValue.token
    }
    # 搜索页面数据
    def test_searchIndex(self):
        url = GetValue.Api + "/search/index"
        res = requests.get(url=url)
        print("serchResult:", res.json())

    # 搜索帮助
    def test_searchHelp(self):
        url= GetValue.Api + "/search/helper"
        data = {
            "keyword": "灯"
        }
        res = requests.get(url=url, data=data,headers=TestUserApi.headers)
        print("searchHelpResult:", res.json())

    # 清空搜索历史
    def test_searchHistory(self):
        url = GetValue.Api + "/search/clearHistory"
        json = {}
        res = requests.post(url=url, json=json, headers=TestUserApi.headers)
        print("searchHistoryResult:",res.json())

    # 获取商品详情二维码
    def test_qrcode(self):
        url = GetValue.Api + "/qrcode/getBase64"
        res = requests.get(url=url, headers=TestUserApi.headers)
        print("qrcodeResult:", res.json())

    # 浏览记录
    def test_footList(self):
        url = GetValue.Api + "/footprint/list"
        data = {
            "page":1,
            "size":8
        }
        res = requests.get(url=url, params=data, headers=TestUserApi.headers)
        print("footListResult:", res.json())

    # 删除浏览记录
    def test_deleteFoot(self):
        url = GetValue.Api + "/footprint/delete"
        data = {"footprintId": 15660}
        res = requests.post(url=url, json=data, headers=TestUserApi.headers)
        print("deleteFootResult:", res.json())

if __name__ == '__main__':
    TestUserApi().test_searchIndex()
    TestUserApi().test_searchHelp()
    TestUserApi().test_qrcode()
    TestUserApi().test_searchHistory()
    TestUserApi().test_footList()
    TestUserApi().test_deleteFoot()