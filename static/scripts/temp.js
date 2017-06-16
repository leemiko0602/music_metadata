window.onload=function (){
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    var chart2 = echarts.init(document.getElementById('second'));
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '音乐源数据可视化'
        },
        tooltip: {},
        legend: {
            data: ['总量']
        },
        xAxis: {
            data: ["hello", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
            name: '总量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };
// 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    chart2.setOption({
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                data: [
                    { value: 235, name: '视频广告' },
                    { value: 274, name: '联盟广告' },
                    { value: 310, name: '邮件营销' },
                    { value: 335, name: '直接访问' },
                    { value: 400, name: '搜索引擎' }
                ]
            }
        ]
    });
}