# -*- coding:utf-8 -*-
"""
@Time 2021/3/4
@auth 码尚学院_百里老师
@Email 198977131@qq.com
@Content all.py
"""
import os
import unittest
from HTMLTestRunner import HTMLTestRunner

import pytest

if __name__ == '__main__':
    # #执行需要的用例，并且生成HTML格式的自动化的测试报告
    # #使用unittest默认的测试用例的加载器去发现testcase目录下以py结尾的所有的测试用例
    # suite = unittest.defaultTestLoader.discover("./testcase","*.py")
    # #生成html报告文件
    # report_file = open("./report/reports.html","wb")
    # #s生成一个HTMLTestRunenr运行器对象（必须下载一个文件HTMLTestRunner.py，放到python的lin目录）
    # runner = HTMLTestRunner(stream=report_file,title="ECSHOP自动化测试报告", description="报告详情如下：")
    # #通过运行器运行测试用例
    # runner.run(suite)
    #第一步：生成json格式临时文件
    pytest.main(['-vs',r'E:\workspace\pythonwork\publicdemo\testcase','--alluredir','./temp','--clean-alluredir'])
    #第二步：根据json格式临时文件生成allure报告
    os.system("allure generate ./temp -o ./report --clean")