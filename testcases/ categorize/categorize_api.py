import requests

from commons.value_util import GetValue


class  TestCategorize:
    #
    headers = {
        "X-Hioshop-Token": GetValue.token
    }
    # 全部分类
    def test_index(self):
        url = GetValue.Api + "/catalog/index"
        res = requests.get(url=url)
        print("indexResult", res.json())

    # 当前分类
    def test_current(self):
        url = GetValue.Api + "/catalog/current"
        data = {"id": 1005000}
        res = requests.get(url=url,data=data,headers=TestCategorize.headers)
        print("currentResult", res)

    # 分类列表
    def test_currentlist(self):
        url = GetValue.Api + "/catalog/currentlist"
        json = {"size": 8, "page": 1, "id": 1005000}
        res = requests.post(url=url,json=json,headers=GetValue.headers)
        print("currentlistResult", res.json())


if __name__ == '__main__':
    TestCategorize().test_index()
    TestCategorize().test_current()
    TestCategorize().test_currentlist()