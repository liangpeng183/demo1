<!--   模板  -->
<template>
    <div>
      <hr style="background-color: red">
      <!--  用户信息  -->
      <div class="u_inf">
        <img class="avater_user" :src="avatar"/>
        <span class="u_inf_name" >{{showName}}</span>
        <hr style="background-color: blue;margin-top: 160px;width: 86%">
        <span class="last_login last_t">上次登录时间：<i class="last_l_t">2020-02-02 18:56</i></span><br>
        <span class="last_login last_l">上次登录地点：<i class="last_l_t">深圳南山</i></span>
      </div>

      <!-- 日历  -->
      <div class="date" id="date">

      </div>

      <!-- 其他信息 -->
      <div class="deal_t" id="showProAmount">

      </div>

      <div class="echart_line" id="echart_line">

      </div>

      <div class="line1" id="line1">

      </div>

    </div>
</template>

<!-- 行为   -->
<script>
  import Cookies from 'js-cookie'
  import echarts from 'echarts'
    export default {
        name: "首页",
      data(){
          return{
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            date: new Date()
          }
      },
      methods:{
          drawChart1(){
            var myChart = echarts.init(document.getElementById('showProAmount'));
            myChart.showLoading();
            // 指定图表的配置项和数据
            var option = {
              title: {
                text: '商品数据统计'
              },
              tooltip: {},
              legend: {
                data:['销量']
              },
              xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
              },
              yAxis: {},
              series: [{
                name: '销量',
                type: 'bar',  // bar  柱状图
                data: [5, 20, 36, 10, 10, 20]
              }]
            };
            myChart.hideLoading();
            myChart.setOption(option);
          },
        drawChart2(){
          var myChart = echarts.init(document.getElementById('date'));
          myChart.setOption({
            title:{
              text: '访问来源',
              x: 'center'
            },
            legend: {
              //orient: 'vertical',
              top: '8',
              left:'center',
              data: ['西凉', '益州', '兖州', '荆州', '幽州']
            },
            series : [
              {
                name: '访问来源',
                title:'饼状图',
                type: 'pie',  //饼状图
                radius: '55%',
                data:[
                  {value:235, name:'视频广告'},
                  {value:274, name:'联盟广告'},
                  {value:310, name:'邮件营销'},
                  {value:335, name:'直接访问'},
                  {value:400, name:'搜索引擎'}
                ]
              }
            ]
          })
        },
        drawChart3(){
          var myChart = echarts.init(document.getElementById('echart_line'));
          var symbolSize = 20;
          // 这个 data 变量在这里单独声明，在后面也会用到。
          var data = [[15, 0], [-50, 10], [-56.5, 20], [-46.5, 30], [-22.1, 40]];

          myChart.setOption({
            title:{
              text: '折线图',
              x: 'center'
            },
            xAxis: {
              min: -100,
              max: 80,
              type: 'value',
              axisLine: {onZero: false}
            },
            yAxis: {
              min: -30,
              max: 60,
              type: 'value',
              axisLine: {onZero: false}
            },
            series: [
              {
                id: 'a',
                type: 'line',
                smooth: true,
                symbolSize: symbolSize, // 为了方便拖拽，把 symbolSize 尺寸设大了。
                data: data
              }
            ]
          });
        },
        drawChart4(){
          var myChart = echarts.init(document.getElementById('line1'));
          var option = {
            title: {
              text: '折线图堆叠'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '5%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '邮件营销',
                type: 'line',
                stack: '总量',
                data: [120, 132, 101, 134, 90, 230, 210]
              },
              {
                name: '联盟广告',
                type: 'line',
                stack: '总量',
                data: [220, 182, 191, 234, 290, 330, 310]
              },
              {
                name: '视频广告',
                type: 'line',
                stack: '总量',
                data: [150, 232, 201, 154, 190, 330, 410]
              },
              {
                name: '直接访问',
                type: 'line',
                stack: '总量',
                data: [320, 332, 301, 334, 390, 330, 320]
              },
              {
                name: '搜索引擎',
                type: 'line',
                stack: '总量',
                data: [820, 932, 901, 934, 1290, 1330, 1320]
              }
            ]
          };
          myChart.setOption(option);
        }

      },
      // computed 方法 ：当其依赖的属性值发生变化时，会重新计算其属性值，反之使用缓存中的属性值
      computed: {
        showName() {
          return Cookies.get("username");  // 获取 Cookis 缓存 的 当前登录用户名
        }
      },

      // 页面  加载  执行
      mounted: function () {   // : function
        this.drawChart1();
        this.drawChart2();
        this.drawChart3();
        this.drawChart4();
      }

    }
</script>


<!--  样式  -->
<style scoped>

  .u_inf{
    width: 36%;
    height: 260px;
    background-color: #03f8b2;
    float: left;
  }
  .avater_user{
    position: absolute;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-top: 20px;
   margin-left: -200px;
  }
  .u_inf_name{
    position: absolute;
    margin-top: 80px;
    margin-left: -40px;
    font-size: 28px;
  }
  .last_login{
    position: absolute;
    margin-left: -200px;
    margin-top: 10px;
  }
  .last_l{
    margin-top: 30px;
  }
  .last_l_t{
  margin-left: 40px;
  }

  .date{
    width: 36%;
    height: 260px;
    background-color: #e6e4eb;
    float: left;
    margin-left: 360px;
  }
  .date_cal{
    height: 400px;
  }


  .deal_t{
    /*background-color: blue;*/
    width: 600px;
    margin-top: 12px;
    height: 400px;
    float: left;
  }

  .echart_line{
    width: 600px;
    margin-top: 12px;
    height: 350px;
    float: left;
    background-color: #dfffed;
    margin-left: 250px;
  }

  .line1{
    float: left;
    width: 100%;
    height: 400px;
    background-color: #c8fffa;
    margin-top: 14px;
    //margin-left: -570px;
  }

</style>
