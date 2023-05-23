# 断言语句
bcbxRate = input("请输入100学期学生学费：")
bcbxRate = int(bcbxRate)
try:
    assert 6999<bcbxRate<12000
    print("学费还没涨价")
except Exception as e:
    print(e)
else:
    print("123")
