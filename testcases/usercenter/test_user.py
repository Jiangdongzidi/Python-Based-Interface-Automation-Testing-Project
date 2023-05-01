import requests

from commons.value_util import GetValue


class TestApi:
    # 请求头信息
    headers = {
        "X-Hioshop-Token": GetValue.token
    }
    # 搜索页面数据
    def test_search(self):
        # url = "http://localhost:8360/api/search/index"
        url = GetValue.Api + "/search/index"
        res = requests.get(url=url)
        result = res.json()
        print("searchResult:", result)

    # 搜素帮助
    def test_searchHelp(self):
        url = GetValue.Api + "/search/helper"
        data = {
            "keyword": "灯"
        }
        headers = {
            "Connection": "keep - alive",
            "X-Hioshop-Token": GetValue.token
        }
        res = requests.get(url=url,data=data, headers=headers)
        result = res.json()
        print("searchHelp:", result)

    # 清除搜索记录
    def test_searchclaerHistory(self):
        url = GetValue.Api + "/search/clearHistory"
        res = requests.post(url=url, headers= TestApi.headers)
        print("historyResult:", res.json())

    # 获得商品详情二维码
    def test_getQrcode(self):
        url = GetValue.Api + "/qrcode/getBase64"
        res = requests.get(url=url,headers=TestApi.headers)
        print("qrcodeResult:", res.json())

if __name__ == '__main__':
    TestApi.test_search()