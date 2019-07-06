# YxAreaSelect

#### 介绍
Js地区三级联动

#### 软件架构
软件架构说明


#### 安装教程

1. 引入YxAreaSelectData.js
2. 引入YxAreaSelect.js

#### 使用说明

```

 var select = new YxAreaSelect({
            elem:'#area',
            mode:'code',
            defProvince:'370000',
            defCity:'370100',
            defArea:'370112'
        });
```
以上代码创建一个三级联动的省市区选择器,
可以使用以下代码获取地址

```
//返回省
select.getProvince();
//返回市
select.getCity();
//返回区
select.getArea();
```
参数 mode:'' 取值范围 code,value
如为code时,默认数据,和get方法返回的均为code反之则为value


#### 参与贡献

1. Fork 本仓库
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request


