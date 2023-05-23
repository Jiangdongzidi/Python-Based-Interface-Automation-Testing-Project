/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 98.59154929577464, "KoPercent": 1.408450704225352};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9507042253521126, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "物流信息"], "isController": false}, {"data": [1.0, 500, 1500, "更新购物车的商品（少参-缺少productId）"], "isController": false}, {"data": [1.0, 500, 1500, "获得收货地址"], "isController": false}, {"data": [1.0, 500, 1500, "JDBC Request删除数据"], "isController": false}, {"data": [1.0, 500, 1500, "提交订单（无参）"], "isController": false}, {"data": [1.0, 500, 1500, "搜索帮助（多参）"], "isController": false}, {"data": [1.0, 500, 1500, "获得商品列表（多参）"], "isController": false}, {"data": [1.0, 500, 1500, "足迹列表（错误参）"], "isController": false}, {"data": [1.0, 500, 1500, "分类请求"], "isController": false}, {"data": [1.0, 500, 1500, "订单详情"], "isController": false}, {"data": [1.0, 500, 1500, "获取微信统一下单prepay_id"], "isController": false}, {"data": [0.5, 500, 1500, "首页请求"], "isController": false}, {"data": [1.0, 500, 1500, "收货地址详情（多参）"], "isController": false}, {"data": [1.0, 500, 1500, "更新购物车的商品（少参-缺少number）"], "isController": false}, {"data": [1.0, 500, 1500, "获取购物车的数据"], "isController": false}, {"data": [1.0, 500, 1500, "提交订单（多参）"], "isController": false}, {"data": [1.0, 500, 1500, "搜索帮助（无参）"], "isController": false}, {"data": [1.0, 500, 1500, "搜索帮助"], "isController": false}, {"data": [1.0, 500, 1500, "获得商品的详情（无参）"], "isController": false}, {"data": [1.0, 500, 1500, "收货地址详情（无参）"], "isController": false}, {"data": [1.0, 500, 1500, "取消订单"], "isController": false}, {"data": [1.0, 500, 1500, "搜索帮助（错误参）"], "isController": false}, {"data": [0.5, 500, 1500, "添加商品到购物车"], "isController": false}, {"data": [1.0, 500, 1500, "更新购物车的商品（多参）"], "isController": false}, {"data": [1.0, 500, 1500, "提交订单（少参-缺少freightPrice）"], "isController": false}, {"data": [1.0, 500, 1500, "分类请求（少参-缺少id）"], "isController": false}, {"data": [1.0, 500, 1500, "更新购物车的商品（无参）"], "isController": false}, {"data": [1.0, 500, 1500, "取消或选择购物车的商品"], "isController": false}, {"data": [0.5, 500, 1500, "首页请求（多参）"], "isController": false}, {"data": [1.0, 500, 1500, "添加商品到购物车（多参）"], "isController": false}, {"data": [1.0, 500, 1500, "获得商品的详情（多参）"], "isController": false}, {"data": [1.0, 500, 1500, "取消或选择购物车的商品（少参- 缺少isChecked）"], "isController": false}, {"data": [1.0, 500, 1500, "下单前信息确认"], "isController": false}, {"data": [1.0, 500, 1500, "搜索页面数据（多参）"], "isController": false}, {"data": [1.0, 500, 1500, "我的页面获取订单数状态"], "isController": false}, {"data": [1.0, 500, 1500, "收货地址详情"], "isController": false}, {"data": [1.0, 500, 1500, "提交订单"], "isController": false}, {"data": [1.0, 500, 1500, "删除购物车的商品（错误参）"], "isController": false}, {"data": [1.0, 500, 1500, "添加商品到购物车（少参-缺少number）"], "isController": false}, {"data": [1.0, 500, 1500, "订单详情（订单不存在）"], "isController": false}, {"data": [1.0, 500, 1500, "取消或选择购物车的商品（错误参数）"], "isController": false}, {"data": [1.0, 500, 1500, "取消或选择购物车的商品（多参）"], "isController": false}, {"data": [1.0, 500, 1500, "保存收货地址"], "isController": false}, {"data": [1.0, 500, 1500, "分类-当前分类（错误参）"], "isController": false}, {"data": [1.0, 500, 1500, "获得商品列表"], "isController": false}, {"data": [1.0, 500, 1500, "分类请求（少参-缺少size）"], "isController": false}, {"data": [1.0, 500, 1500, "分类请求（少参-缺少page）"], "isController": false}, {"data": [1.0, 500, 1500, "清除搜索历史（无参）"], "isController": false}, {"data": [0.5, 500, 1500, "分类-当前分类（无参）"], "isController": false}, {"data": [1.0, 500, 1500, "添加商品到购物车（少参-缺少productId）"], "isController": false}, {"data": [1.0, 500, 1500, "更新购物车的商品（少参-缺少id）"], "isController": false}, {"data": [0.0, 500, 1500, "上传头像"], "isController": false}, {"data": [1.0, 500, 1500, "取消或选择购物车的商品（少参-缺少productIds）"], "isController": false}, {"data": [1.0, 500, 1500, "统计商品总数"], "isController": false}, {"data": [1.0, 500, 1500, "分类请求（无参）"], "isController": false}, {"data": [1.0, 500, 1500, "删除购物车的商品（无参）"], "isController": false}, {"data": [1.0, 500, 1500, "删除足迹"], "isController": false}, {"data": [1.0, 500, 1500, "提交订单（少参-缺少addressId）"], "isController": false}, {"data": [1.0, 500, 1500, "删除足迹（无参）"], "isController": false}, {"data": [1.0, 500, 1500, "获取微信统一下单prepay_id（取消订单）"], "isController": false}, {"data": [1.0, 500, 1500, "清除搜索历史（错误参）"], "isController": false}, {"data": [1.0, 500, 1500, "提交订单（少参-缺少收货地址-为空）"], "isController": false}, {"data": [1.0, 500, 1500, "搜索页面数据"], "isController": false}, {"data": [1.0, 500, 1500, "足迹列表（少参-缺少size）"], "isController": false}, {"data": [1.0, 500, 1500, "提交订单（少参-缺少actualPrice）"], "isController": false}, {"data": [0.75, 500, 1500, "获取购物车的商品件数"], "isController": false}, {"data": [1.0, 500, 1500, "提交订单（少参-缺少offlinePay）"], "isController": false}, {"data": [1.0, 500, 1500, "删除购物车的商品（多参）"], "isController": false}, {"data": [1.0, 500, 1500, "保存收货地址（少参-缺少province_id）"], "isController": false}, {"data": [1.0, 500, 1500, "添加商品到购物车（少参-缺少addType）"], "isController": false}, {"data": [1.0, 500, 1500, "分类-全部分类（多参）"], "isController": false}, {"data": [1.0, 500, 1500, "分类-当前分类"], "isController": false}, {"data": [1.0, 500, 1500, "分类-全部分类"], "isController": false}, {"data": [1.0, 500, 1500, "获取微信统一下单prepay_id（多参）"], "isController": false}, {"data": [1.0, 500, 1500, "添加商品到购物车（库存不足）"], "isController": false}, {"data": [1.0, 500, 1500, "BeanShell 取样器"], "isController": false}, {"data": [1.0, 500, 1500, "保存收货地址（少参-缺少mobile）"], "isController": false}, {"data": [1.0, 500, 1500, "足迹列表（多参）"], "isController": false}, {"data": [1.0, 500, 1500, "收货地址详情（错误参）"], "isController": false}, {"data": [1.0, 500, 1500, "删除收货地址"], "isController": false}, {"data": [1.0, 500, 1500, "删除订单"], "isController": false}, {"data": [1.0, 500, 1500, "保存收货地址（多参）"], "isController": false}, {"data": [1.0, 500, 1500, "足迹列表（无参）"], "isController": false}, {"data": [1.0, 500, 1500, "保存收货地址（少参-缺少district_id）"], "isController": false}, {"data": [1.0, 500, 1500, "提交订单（少参-缺少postscript）"], "isController": false}, {"data": [1.0, 500, 1500, "获得商品的详情"], "isController": false}, {"data": [1.0, 500, 1500, "删除足迹（错误参）"], "isController": false}, {"data": [0.75, 500, 1500, "删除购物车的商品"], "isController": false}, {"data": [1.0, 500, 1500, "分类请求（错误参）"], "isController": false}, {"data": [1.0, 500, 1500, "添加商品到购物车（无参）"], "isController": false}, {"data": [1.0, 500, 1500, "足迹列表"], "isController": false}, {"data": [0.5, 500, 1500, "更新购物车的商品"], "isController": false}, {"data": [1.0, 500, 1500, "提交订单（错误参）"], "isController": false}, {"data": [0.0, 500, 1500, "获取商品详情二维码"], "isController": false}, {"data": [1.0, 500, 1500, "获取微信统一下单prepay_id（错误参）"], "isController": false}, {"data": [1.0, 500, 1500, "分类请求（多参）"], "isController": false}, {"data": [1.0, 500, 1500, "获得商品的详情（错误参）"], "isController": false}, {"data": [1.0, 500, 1500, "清除搜索历史（多参）"], "isController": false}, {"data": [1.0, 500, 1500, "更新购物车的商品（错误参数）"], "isController": false}, {"data": [1.0, 500, 1500, "JDBC Request插入数据"], "isController": false}, {"data": [1.0, 500, 1500, "获取购物车的数据（多参）"], "isController": false}, {"data": [0.5, 500, 1500, "订单列表"], "isController": false}, {"data": [1.0, 500, 1500, "统计商品总数（多参）"], "isController": false}, {"data": [1.0, 500, 1500, "获取区域列表"], "isController": false}, {"data": [1.0, 500, 1500, "保存收货地址（少参-缺少city_id）"], "isController": false}, {"data": [1.0, 500, 1500, "保存收货地址（少参-缺少address）"], "isController": false}, {"data": [1.0, 500, 1500, "添加商品到购物车（少参-缺少goodsId）"], "isController": false}, {"data": [1.0, 500, 1500, "分类-当前分类（多参）"], "isController": false}, {"data": [1.0, 500, 1500, "获取微信统一下单prepay_id（无参）"], "isController": false}, {"data": [1.0, 500, 1500, "取消或选择购物车的商品（无参）"], "isController": false}, {"data": [1.0, 500, 1500, "足迹列表（少参-缺少page）"], "isController": false}, {"data": [1.0, 500, 1500, "清除搜索历史"], "isController": false}, {"data": [1.0, 500, 1500, "保存收货地址（错误参数）"], "isController": false}, {"data": [1.0, 500, 1500, "添加商品到购物车（错误参数）"], "isController": false}, {"data": [1.0, 500, 1500, "保存收货地址（少参-缺少name）"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 142, 2, 1.408450704225352, 145.83802816901405, 0, 1857, 57.0, 453.40000000000003, 674.6499999999994, 1578.3599999999956, 38.27493261455526, 1068.6705062331537, 22.594918716307276], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["物流信息", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 54.296875, 83.7890625], "isController": false}, {"data": ["更新购物车的商品（少参-缺少productId）", 1, 0, 0.0, 75.0, 75, 75, 75.0, 75.0, 75.0, 75.0, 13.333333333333334, 1428.7109375, 6.002604166666667], "isController": false}, {"data": ["获得收货地址", 2, 0, 0.0, 136.5, 57, 216, 136.5, 216.0, 216.0, 216.0, 1.25, 0.5169677734375, 0.517578125], "isController": false}, {"data": ["JDBC Request删除数据", 14, 0, 0.0, 55.714285714285715, 2, 489, 4.0, 313.5, 489.0, 489.0, 3.967129498441485, 0.15884014593369228, 0.0], "isController": false}, {"data": ["提交订单（无参）", 1, 0, 0.0, 80.0, 80, 80, 80.0, 80.0, 80.0, 80.0, 12.5, 1183.04443359375, 5.322265625], "isController": false}, {"data": ["搜索帮助（多参）", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 52.34375, 86.5234375], "isController": false}, {"data": ["获得商品列表（多参）", 1, 0, 0.0, 280.0, 280, 280, 280.0, 280.0, 280.0, 280.0, 3.571428571428571, 807.1742466517857, 1.4718191964285714], "isController": false}, {"data": ["足迹列表（错误参）", 1, 0, 0.0, 101.0, 101, 101, 101.0, 101.0, 101.0, 101.0, 9.900990099009901, 31.74311571782178, 4.196318069306931], "isController": false}, {"data": ["分类请求", 1, 0, 0.0, 6.0, 6, 6, 6.0, 6.0, 6.0, 6.0, 166.66666666666666, 347.4934895833333, 78.28776041666667], "isController": false}, {"data": ["订单详情", 1, 0, 0.0, 45.0, 45, 45, 45.0, 45.0, 45.0, 45.0, 22.22222222222222, 38.04253472222222, 9.309895833333334], "isController": false}, {"data": ["获取微信统一下单prepay_id", 1, 0, 0.0, 13.0, 13, 13, 13.0, 13.0, 13.0, 13.0, 76.92307692307693, 20.733173076923077, 32.527043269230774], "isController": false}, {"data": ["首页请求", 1, 0, 0.0, 575.0, 575, 575, 575.0, 575.0, 575.0, 575.0, 1.7391304347826089, 13.254076086956523, 0.7082201086956522], "isController": false}, {"data": ["收货地址详情（多参）", 1, 0, 0.0, 19.0, 19, 19, 19.0, 19.0, 19.0, 19.0, 52.63157894736842, 13.826069078947368, 22.666529605263158], "isController": false}, {"data": ["更新购物车的商品（少参-缺少number）", 1, 0, 0.0, 8.0, 8, 8, 8.0, 8.0, 8.0, 8.0, 125.0, 28.076171875, 56.884765625], "isController": false}, {"data": ["获取购物车的数据", 1, 0, 0.0, 16.0, 16, 16, 16.0, 16.0, 16.0, 16.0, 62.5, 54.931640625, 25.2685546875], "isController": false}, {"data": ["提交订单（多参）", 1, 0, 0.0, 9.0, 9, 9, 9.0, 9.0, 9.0, 9.0, 111.1111111111111, 30.598958333333336, 58.051215277777786], "isController": false}, {"data": ["搜索帮助（无参）", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 87.23958333333333, 135.7421875], "isController": false}, {"data": ["搜索帮助", 1, 0, 0.0, 11.0, 11, 11, 11.0, 11.0, 11.0, 11.0, 90.9090909090909, 23.792613636363637, 38.61860795454545], "isController": false}, {"data": ["获得商品的详情（无参）", 1, 0, 0.0, 128.0, 128, 128, 128.0, 128.0, 128.0, 128.0, 7.8125, 837.1429443359375, 3.173828125], "isController": false}, {"data": ["收货地址详情（无参）", 1, 0, 0.0, 440.0, 440, 440, 440.0, 440.0, 440.0, 440.0, 2.2727272727272725, 243.53249289772728, 0.9432705965909091], "isController": false}, {"data": ["取消订单", 1, 0, 0.0, 24.0, 24, 24, 24.0, 24.0, 24.0, 24.0, 41.666666666666664, 11.3525390625, 18.473307291666668], "isController": false}, {"data": ["搜索帮助（错误参）", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 87.23958333333333, 141.92708333333334], "isController": false}, {"data": ["添加商品到购物车", 2, 0, 0.0, 706.0, 695, 717, 706.0, 717.0, 717.0, 717.0, 2.7894002789400276, 3.8136331938633194, 1.3620118549511855], "isController": false}, {"data": ["更新购物车的商品（多参）", 1, 0, 0.0, 11.0, 11, 11, 11.0, 11.0, 11.0, 11.0, 90.9090909090909, 20.5078125, 43.41264204545455], "isController": false}, {"data": ["提交订单（少参-缺少freightPrice）", 1, 0, 0.0, 7.0, 7, 7, 7.0, 7.0, 7.0, 7.0, 142.85714285714286, 39.341517857142854, 71.84709821428571], "isController": false}, {"data": ["分类请求（少参-缺少id）", 1, 0, 0.0, 223.0, 223, 223, 223.0, 223.0, 223.0, 223.0, 4.484304932735426, 480.5125420403587, 2.040709080717489], "isController": false}, {"data": ["更新购物车的商品（无参）", 1, 0, 0.0, 67.0, 67, 67, 67.0, 67.0, 67.0, 67.0, 14.925373134328359, 1412.590368470149, 6.3403684701492535], "isController": false}, {"data": ["取消或选择购物车的商品", 1, 0, 0.0, 429.0, 429, 429, 429.0, 429.0, 429.0, 429.0, 2.331002331002331, 3.18464087995338, 1.0767227564102564], "isController": false}, {"data": ["首页请求（多参）", 1, 0, 0.0, 580.0, 580, 580, 580.0, 580.0, 580.0, 580.0, 1.7241379310344827, 13.13981681034483, 0.7155845905172414], "isController": false}, {"data": ["添加商品到购物车（多参）", 1, 0, 0.0, 76.0, 76, 76, 76.0, 76.0, 76.0, 76.0, 13.157894736842104, 11.564555921052632, 6.553248355263158], "isController": false}, {"data": ["获得商品的详情（多参）", 1, 0, 0.0, 452.0, 452, 452, 452.0, 452.0, 452.0, 452.0, 2.2123893805309733, 22.711559734513273, 0.9398333794247787], "isController": false}, {"data": ["取消或选择购物车的商品（少参- 缺少isChecked）", 1, 0, 0.0, 24.0, 24, 24, 24.0, 24.0, 24.0, 24.0, 41.666666666666664, 36.62109375, 18.5546875], "isController": false}, {"data": ["下单前信息确认", 1, 0, 0.0, 69.0, 69, 69, 69.0, 69.0, 69.0, 69.0, 14.492753623188406, 6.269814311594202, 6.595335144927535], "isController": false}, {"data": ["搜索页面数据（多参）", 1, 0, 0.0, 15.0, 15, 15, 15.0, 15.0, 15.0, 15.0, 66.66666666666667, 21.614583333333336, 27.604166666666668], "isController": false}, {"data": ["我的页面获取订单数状态", 1, 0, 0.0, 9.0, 9, 9, 9.0, 9.0, 9.0, 9.0, 111.1111111111111, 33.203125, 46.11545138888889], "isController": false}, {"data": ["收货地址详情", 2, 0, 0.0, 84.5, 28, 141, 84.5, 141.0, 141.0, 141.0, 3.278688524590164, 1.387999487704918, 1.3863985655737705], "isController": false}, {"data": ["提交订单", 1, 0, 0.0, 12.0, 12, 12, 12.0, 12.0, 12.0, 12.0, 83.33333333333333, 22.542317708333332, 45.084635416666664], "isController": false}, {"data": ["删除购物车的商品（错误参）", 1, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 500.0, 133.30078125, 223.14453125], "isController": false}, {"data": ["添加商品到购物车（少参-缺少number）", 1, 0, 0.0, 72.0, 72, 72, 72.0, 72.0, 72.0, 72.0, 13.888888888888888, 12.207031250000002, 6.605360243055556], "isController": false}, {"data": ["订单详情（订单不存在）", 1, 0, 0.0, 9.0, 9, 9, 9.0, 9.0, 9.0, 9.0, 111.1111111111111, 29.947916666666668, 46.54947916666667], "isController": false}, {"data": ["取消或选择购物车的商品（错误参数）", 2, 0, 0.0, 51.5, 19, 84, 51.5, 84.0, 84.0, 84.0, 19.41747572815534, 989.2578125, 8.969205097087379], "isController": false}, {"data": ["取消或选择购物车的商品（多参）", 1, 0, 0.0, 57.0, 57, 57, 57.0, 57.0, 57.0, 57.0, 17.543859649122805, 15.41940789473684, 8.257949561403509], "isController": false}, {"data": ["保存收货地址", 3, 0, 0.0, 128.66666666666666, 17, 199, 170.0, 199.0, 199.0, 199.0, 2.4291497975708505, 1.1062436740890687, 1.3845837550607287], "isController": false}, {"data": ["分类-当前分类（错误参）", 1, 0, 0.0, 274.0, 274, 274, 274.0, 274.0, 274.0, 274.0, 3.6496350364963503, 391.0740761861314, 1.5361256843065692], "isController": false}, {"data": ["获得商品列表", 1, 0, 0.0, 96.0, 96, 96, 96.0, 96.0, 96.0, 96.0, 10.416666666666666, 2354.248046875, 4.21142578125], "isController": false}, {"data": ["分类请求（少参-缺少size）", 1, 0, 0.0, 9.0, 9, 9, 9.0, 9.0, 9.0, 9.0, 111.1111111111111, 280.38194444444446, 50.99826388888889], "isController": false}, {"data": ["分类请求（少参-缺少page）", 1, 0, 0.0, 8.0, 8, 8, 8.0, 8.0, 8.0, 8.0, 125.0, 260.6201171875, 57.373046875], "isController": false}, {"data": ["清除搜索历史（无参）", 1, 0, 0.0, 49.0, 49, 49, 49.0, 49.0, 49.0, 49.0, 20.408163265306122, 1931.5011160714284, 8.82892219387755], "isController": false}, {"data": ["分类-当前分类（无参）", 1, 0, 0.0, 986.0, 986, 986, 986.0, 986.0, 986.0, 986.0, 1.0141987829614605, 108.67575747971603, 0.4149895410750507], "isController": false}, {"data": ["添加商品到购物车（少参-缺少productId）", 1, 0, 0.0, 100.0, 100, 100, 100.0, 100.0, 100.0, 100.0, 10.0, 1071.533203125, 4.70703125], "isController": false}, {"data": ["更新购物车的商品（少参-缺少id）", 1, 0, 0.0, 76.0, 76, 76, 76.0, 76.0, 76.0, 76.0, 13.157894736842104, 1409.912109375, 6.000719572368421], "isController": false}, {"data": ["上传头像", 1, 1, 100.0, 1123.0, 1123, 1123, 1123.0, 1123.0, 1123.0, 1123.0, 0.8904719501335707, 89.57069512466607, 24.149703639804095], "isController": false}, {"data": ["取消或选择购物车的商品（少参-缺少productIds）", 1, 0, 0.0, 182.0, 182, 182, 182.0, 182.0, 182.0, 182.0, 5.4945054945054945, 555.0309065934066, 2.430674793956044], "isController": false}, {"data": ["统计商品总数", 1, 0, 0.0, 124.0, 124, 124, 124.0, 124.0, 124.0, 124.0, 8.064516129032258, 2.2366431451612905, 3.268334173387097], "isController": false}, {"data": ["分类请求（无参）", 1, 0, 0.0, 156.0, 156, 156, 156.0, 156.0, 156.0, 156.0, 6.41025641025641, 606.6957131410256, 2.7731870993589745], "isController": false}, {"data": ["删除购物车的商品（无参）", 1, 0, 0.0, 68.0, 68, 68, 68.0, 68.0, 68.0, 68.0, 14.705882352941176, 1391.8169806985293, 6.247127757352941], "isController": false}, {"data": ["删除足迹", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 54.6875, 90.4296875], "isController": false}, {"data": ["提交订单（少参-缺少addressId）", 1, 0, 0.0, 210.0, 210, 210, 210.0, 210.0, 210.0, 210.0, 4.761904761904763, 510.2585565476191, 2.404203869047619], "isController": false}, {"data": ["删除足迹（无参）", 1, 0, 0.0, 456.0, 456, 456, 456.0, 456.0, 456.0, 456.0, 2.1929824561403506, 207.55379660087718, 0.9422971491228069], "isController": false}, {"data": ["获取微信统一下单prepay_id（取消订单）", 1, 0, 0.0, 10.0, 10, 10, 10.0, 10.0, 10.0, 10.0, 100.0, 26.85546875, 42.28515625], "isController": false}, {"data": ["清除搜索历史（错误参）", 1, 0, 0.0, 6.0, 6, 6, 6.0, 6.0, 6.0, 6.0, 166.66666666666666, 43.619791666666664, 72.42838541666667], "isController": false}, {"data": ["提交订单（少参-缺少收货地址-为空）", 1, 0, 0.0, 10.0, 10, 10, 10.0, 10.0, 10.0, 10.0, 100.0, 27.5390625, 52.34375], "isController": false}, {"data": ["搜索页面数据", 1, 0, 0.0, 127.0, 127, 127, 127.0, 127.0, 127.0, 127.0, 7.874015748031496, 2.5529035433070866, 3.1988188976377954], "isController": false}, {"data": ["足迹列表（少参-缺少size）", 1, 0, 0.0, 112.0, 112, 112, 112.0, 112.0, 112.0, 112.0, 8.928571428571429, 28.634207589285715, 3.705705915178571], "isController": false}, {"data": ["提交订单（少参-缺少actualPrice）", 1, 0, 0.0, 39.0, 39, 39, 39.0, 39.0, 39.0, 39.0, 25.64102564102564, 7.086338141025641, 12.770432692307692], "isController": false}, {"data": ["获取购物车的商品件数", 2, 0, 0.0, 572.5, 454, 691, 572.5, 691.0, 691.0, 691.0, 1.9212295869356388, 0.5591078290105668, 0.7861281219980788], "isController": false}, {"data": ["提交订单（少参-缺少offlinePay）", 1, 0, 0.0, 9.0, 9, 9, 9.0, 9.0, 9.0, 9.0, 111.1111111111111, 30.598958333333336, 56.20659722222223], "isController": false}, {"data": ["删除购物车的商品（多参）", 1, 0, 0.0, 15.0, 15, 15, 15.0, 15.0, 15.0, 15.0, 66.66666666666667, 27.018229166666668, 30.338541666666668], "isController": false}, {"data": ["保存收货地址（少参-缺少province_id）", 1, 0, 0.0, 21.0, 21, 21, 21.0, 21.0, 21.0, 21.0, 47.61904761904761, 21.995907738095237, 26.646205357142854], "isController": false}, {"data": ["添加商品到购物车（少参-缺少addType）", 1, 0, 0.0, 68.0, 68, 68, 68.0, 68.0, 68.0, 68.0, 14.705882352941176, 12.925091911764705, 6.965188419117647], "isController": false}, {"data": ["分类-全部分类（多参）", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 546.630859375, 103.759765625], "isController": false}, {"data": ["分类-当前分类", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 76.5625, 83.984375], "isController": false}, {"data": ["分类-全部分类", 1, 0, 0.0, 261.0, 261, 261, 261.0, 261.0, 261.0, 261.0, 3.8314176245210727, 8.381226053639846, 1.560255028735632], "isController": false}, {"data": ["获取微信统一下单prepay_id（多参）", 1, 0, 0.0, 16.0, 16, 16, 16.0, 16.0, 16.0, 16.0, 62.5, 16.845703125, 26.91650390625], "isController": false}, {"data": ["添加商品到购物车（库存不足）", 1, 0, 0.0, 10.0, 10, 10, 10.0, 10.0, 10.0, 10.0, 100.0, 26.5625, 48.828125], "isController": false}, {"data": ["BeanShell 取样器", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, NaN, NaN], "isController": false}, {"data": ["保存收货地址（少参-缺少mobile）", 1, 0, 0.0, 40.0, 40, 40, 40.0, 40.0, 40.0, 40.0, 25.0, 11.279296875, 13.818359375], "isController": false}, {"data": ["足迹列表（多参）", 1, 0, 0.0, 102.0, 102, 102, 102.0, 102.0, 102.0, 102.0, 9.803921568627452, 25.792738970588236, 4.212622549019608], "isController": false}, {"data": ["收货地址详情（错误参）", 1, 0, 0.0, 462.0, 462, 462, 462.0, 462.0, 462.0, 462.0, 2.1645021645021645, 231.935707521645, 0.911035579004329], "isController": false}, {"data": ["删除收货地址", 4, 0, 0.0, 72.25, 16, 186, 43.5, 186.0, 186.0, 186.0, 2.055498458376156, 0.5384643178314491, 0.920357464028777], "isController": false}, {"data": ["删除订单", 1, 0, 0.0, 7.0, 7, 7, 7.0, 7.0, 7.0, 7.0, 142.85714285714286, 38.92299107142857, 63.33705357142857], "isController": false}, {"data": ["保存收货地址（多参）", 1, 0, 0.0, 83.0, 83, 83, 83.0, 83.0, 83.0, 83.0, 12.048192771084338, 5.565229668674698, 7.0712537650602405], "isController": false}, {"data": ["足迹列表（无参）", 1, 0, 0.0, 67.0, 67, 67, 67.0, 67.0, 67.0, 67.0, 14.925373134328359, 47.8515625, 6.09258395522388], "isController": false}, {"data": ["保存收货地址（少参-缺少district_id）", 1, 0, 0.0, 22.0, 22, 22, 22.0, 22.0, 22.0, 22.0, 45.45454545454545, 20.907315340909093, 25.346235795454547], "isController": false}, {"data": ["提交订单（少参-缺少postscript）", 1, 0, 0.0, 182.0, 182, 182, 182.0, 182.0, 182.0, 182.0, 5.4945054945054945, 558.3898523351648, 2.7740813873626373], "isController": false}, {"data": ["获得商品的详情", 1, 0, 0.0, 433.0, 433, 433, 433.0, 433.0, 433.0, 433.0, 2.3094688221709005, 23.708140877598154, 0.9630304561200924], "isController": false}, {"data": ["删除足迹（错误参）", 1, 0, 0.0, 326.0, 326, 326, 326.0, 326.0, 326.0, 326.0, 3.067484662576687, 328.03513228527606, 1.3899539877300613], "isController": false}, {"data": ["删除购物车的商品", 2, 0, 0.0, 302.0, 22, 582, 302.0, 582.0, 582.0, 582.0, 0.8722197993894462, 0.5604693632795464, 0.38798449084169206], "isController": false}, {"data": ["分类请求（错误参）", 1, 0, 0.0, 163.0, 163, 163, 163.0, 163.0, 163.0, 163.0, 6.134969325153374, 657.3883243865031, 2.8937404141104293], "isController": false}, {"data": ["添加商品到购物车（无参）", 1, 0, 0.0, 62.0, 62, 62, 62.0, 62.0, 62.0, 62.0, 16.129032258064516, 1526.5089465725807, 6.804435483870968], "isController": false}, {"data": ["足迹列表", 1, 0, 0.0, 340.0, 340, 340, 340.0, 340.0, 340.0, 340.0, 2.941176470588235, 7.73782169117647, 1.2408088235294117], "isController": false}, {"data": ["更新购物车的商品", 2, 1, 50.0, 51.0, 10, 92, 51.0, 92.0, 92.0, 92.0, 1.0101010101010102, 0.22737136994949494, 0.4724984217171717], "isController": false}, {"data": ["提交订单（错误参）", 1, 0, 0.0, 93.0, 93, 93, 93.0, 93.0, 93.0, 93.0, 10.752688172043012, 1092.752436155914, 5.680863575268817], "isController": false}, {"data": ["获取商品详情二维码", 1, 0, 0.0, 1857.0, 1857, 1857, 1857.0, 1857.0, 1857.0, 1857.0, 0.5385029617662898, 0.2250774098007539, 0.22087035541195477], "isController": false}, {"data": ["获取微信统一下单prepay_id（错误参）", 1, 0, 0.0, 174.0, 174, 174, 174.0, 174.0, 174.0, 174.0, 5.747126436781609, 615.8292923850576, 2.4357938218390807], "isController": false}, {"data": ["分类请求（多参）", 1, 0, 0.0, 7.0, 7, 7, 7.0, 7.0, 7.0, 7.0, 142.85714285714286, 297.8515625, 68.49888392857143], "isController": false}, {"data": ["获得商品的详情（错误参）", 1, 0, 0.0, 238.0, 238, 238, 238.0, 238.0, 238.0, 238.0, 4.201680672268908, 450.22813813025215, 1.756171218487395], "isController": false}, {"data": ["清除搜索历史（多参）", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 52.34375, 88.8671875], "isController": false}, {"data": ["更新购物车的商品（错误参数）", 2, 0, 0.0, 72.0, 64, 80, 72.0, 80.0, 80.0, 80.0, 13.888888888888888, 1488.2405598958335, 6.510416666666667], "isController": false}, {"data": ["JDBC Request插入数据", 1, 0, 0.0, 11.0, 11, 11, 11.0, 11.0, 11.0, 11.0, 90.9090909090909, 0.7990056818181819, 0.0], "isController": false}, {"data": ["获取购物车的数据（多参）", 1, 0, 0.0, 16.0, 16, 16, 16.0, 16.0, 16.0, 16.0, 62.5, 54.931640625, 25.7568359375], "isController": false}, {"data": ["订单列表", 1, 0, 0.0, 1209.0, 1209, 1209, 1209.0, 1209.0, 1209.0, 1209.0, 0.8271298593879239, 2.2196805210918114, 0.35459961745244], "isController": false}, {"data": ["统计商品总数（多参）", 1, 0, 0.0, 28.0, 28, 28, 28.0, 28.0, 28.0, 28.0, 35.714285714285715, 9.905133928571429, 14.753069196428571], "isController": false}, {"data": ["获取区域列表", 1, 0, 0.0, 34.0, 34, 34, 34.0, 34.0, 34.0, 34.0, 29.41176470588235, 115.40670955882352, 12.235753676470587], "isController": false}, {"data": ["保存收货地址（少参-缺少city_id）", 1, 0, 0.0, 19.0, 19, 19, 19.0, 19.0, 19.0, 19.0, 52.63157894736842, 24.259868421052634, 29.605263157894736], "isController": false}, {"data": ["保存收货地址（少参-缺少address）", 1, 0, 0.0, 17.0, 17, 17, 17.0, 17.0, 17.0, 17.0, 58.8235294117647, 26.596966911764703, 32.57123161764706], "isController": false}, {"data": ["添加商品到购物车（少参-缺少goodsId）", 1, 0, 0.0, 196.0, 196, 196, 196.0, 196.0, 196.0, 196.0, 5.1020408163265305, 546.7055963010204, 2.3766342474489797], "isController": false}, {"data": ["分类-当前分类（多参）", 1, 0, 0.0, 6.0, 6, 6, 6.0, 6.0, 6.0, 6.0, 166.66666666666666, 63.80208333333333, 71.2890625], "isController": false}, {"data": ["获取微信统一下单prepay_id（无参）", 1, 0, 0.0, 167.0, 167, 167, 167.0, 167.0, 167.0, 167.0, 5.9880239520958085, 641.642496257485, 2.456025449101796], "isController": false}, {"data": ["取消或选择购物车的商品（无参）", 1, 0, 0.0, 84.0, 84, 84, 84.0, 84.0, 84.0, 84.0, 11.904761904761903, 1126.708984375, 5.068824404761904], "isController": false}, {"data": ["足迹列表（少参-缺少page）", 1, 0, 0.0, 70.0, 70, 70, 70.0, 70.0, 70.0, 70.0, 14.285714285714285, 37.583705357142854, 5.9291294642857135], "isController": false}, {"data": ["清除搜索历史", 1, 0, 0.0, 6.0, 6, 6, 6.0, 6.0, 6.0, 6.0, 166.66666666666666, 43.619791666666664, 72.42838541666667], "isController": false}, {"data": ["保存收货地址（错误参数）", 1, 0, 0.0, 19.0, 19, 19, 19.0, 19.0, 19.0, 19.0, 52.63157894736842, 21.432976973684212, 29.296875], "isController": false}, {"data": ["添加商品到购物车（错误参数）", 2, 0, 0.0, 70.5, 61, 80, 70.5, 80.0, 80.0, 80.0, 14.084507042253522, 1509.2016945422536, 6.918463908450705], "isController": false}, {"data": ["保存收货地址（少参-缺少name）", 1, 0, 0.0, 21.0, 21, 21, 21.0, 21.0, 21.0, 21.0, 47.61904761904761, 20.5078125, 25.437127976190474], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["500/Internal Server Error", 1, 50.0, 0.704225352112676], "isController": false}, {"data": ["Expected to find an object with property ['errno'] in path $ but found 'java.lang.String'. This is not a json object according to the JsonProvider: 'com.jayway.jsonpath.spi.json.JsonSmartJsonProvider'.", 1, 50.0, 0.704225352112676], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 142, 2, "500/Internal Server Error", 1, "Expected to find an object with property ['errno'] in path $ but found 'java.lang.String'. This is not a json object according to the JsonProvider: 'com.jayway.jsonpath.spi.json.JsonSmartJsonProvider'.", 1, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["上传头像", 1, 1, "500/Internal Server Error", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["更新购物车的商品", 2, 1, "Expected to find an object with property ['errno'] in path $ but found 'java.lang.String'. This is not a json object according to the JsonProvider: 'com.jayway.jsonpath.spi.json.JsonSmartJsonProvider'.", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
