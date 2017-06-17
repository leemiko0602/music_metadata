window.onload = function () {
    // all genre and number
    var myChart = echarts.init(document.getElementById('main'));
    //rock
    var chart2 = echarts.init(document.getElementById('second'));
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '各流派音乐源数据统计量'
        },
        tooltip: {},
        legend: {
            data: ['统计量']
        },
        xAxis: {
            data: []
        },
        yAxis: {},
        series: [{
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
    $.get('/rock', function (res) {
        var temp = [];
        var music = eval('(' + res + ')').genre;
        var count = eval('(' + res + ')').count;
        // alert(count[0]);
        var option = {
            title: {
                text: 'rock类音乐统计数量'
            },
            series: [
                {
                    name: 'rock类音乐',
                    type: 'pie',
                    radius: '55%',
                    data: []
                }
            ]
        };
        for (var i = 0; i < count.length; i++) {
            var obj = { value: '', name: '' };
            obj.value = count[i];
            obj.name = music[i];
            option.series[0].data[i] = obj;
        }
        chart2.setOption(option);
    });

}