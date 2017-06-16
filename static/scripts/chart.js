window.onload = function () {
    // all genre and number
    var myChart = echarts.init(document.getElementById('main'));
    //rock
    var chart2 = echarts.init(document.getElementById('second'));
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '音乐源数据'
        },
        tooltip: {},
        legend: {
            data: ['统计量']
        },
        xAxis: {
            data: []
        },
        yAxis: {},
        series: [ {
            name: '统计量',
            type: 'bar',
            data: []
        }
        ]
    };
    $.get("/genre", function (res) {
        var genre = res.split('[')[1].split(']')[0].split(",");
        console.log(genre instanceof Array);
        for (var i = 0; i < genre.length; i++) {
            option.xAxis.data[i] = genre[i];
        }
        

    });
    $.get("/count", function (res) {
        var con = res.split('[')[1].split(']')[0].split(",");
        console.log(con instanceof Array);
        for (var i = 0; i < con.length; i++) {
            option.series[0].data[i] = con[i];
        }
        //过渡控制，隐藏loading（读取中）
        myChart.hideLoading();
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    });
    //get rock
    $.get('/rock',function(res){
        var data=JSON.parse(res);
       console.log(data);
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
    });
  
}