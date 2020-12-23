<template>
  <div>
    <el-card class='card'
             style="margin-top:20px;padding: 0 0 40px 0;">
      <div>
        <h2 style="text-align:center;">
          用户信息
        </h2>
      </div>
      <h3 style="text-align:left;margin-left:50px;">
          用户状态
      </h3>
      <el-row>
        <el-col span="12">
          <div id="UserStatusPie" class="pie-wrap"></div>
        </el-col>
        <el-col span="12">
          <div style="margin-left:80px;margin-top:-10px;">
            <h4>
              平台用户总数: <el-tag type="warning"
                      style="float:right;margin-right:150px;font-size:20px;">{{user_data.total}}</el-tag>
            </h4>
          </div>
          <div style="margin-left:80px;">
            <h4>
              活跃用户数量: <el-tag type="success"
                      style="float:right;margin-right:150px;font-size:20px;">{{user_data.active}}</el-tag>
            </h4>
          </div>
          <div style="margin-left:80px;">
            <h4>
              不活跃用户数量: <el-tag type="danger"
                      style="float:right;margin-right:150px;font-size:20px;">{{user_data.inactive}}</el-tag>
            </h4>
          </div>
          <div style="margin-left:80px;">
            <h4>
              封禁用户数量: <el-tag type="Info"
                      style="float:right;margin-right:150px;font-size:20px;">{{user_data.suspended}}</el-tag>
            </h4>
          </div>
        </el-col>
      </el-row>
      <h3 style="text-align:left;margin-left:50px;margin-top:50px;">
          用户身份
      </h3>
      <el-row>
        <el-col span="12">
          <div id="UserIdentityPie" class="pie-wrap"></div>
        </el-col>
        <el-col span="12">
          <div style="margin-left:80px;margin-top:-10px;">
            <h4>
              认证用户数量: <el-tag type="success"
                      style="float:right;margin-right:150px;font-size:20px;">{{user_data.verified}}</el-tag>
            </h4>
          </div>
          <div style="margin-left:80px;">
            <h4>
              管理员数量: <el-tag type="Info"
                      style="float:right;margin-right:150px;font-size:20px;">{{user_data.staff}}</el-tag>
            </h4>
          </div>
          <div style="margin-left:80px;">
            <h4>
              其他用户数量: <el-tag type="danger"
                      style="float:right;margin-right:150px;font-size:20px;">{{user_data.total-user_data.verified-user_data.staff}}</el-tag>
            </h4>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card class='card'
             style="margin-top:20px;margin-bottom:60px;padding: 0 0 20px 0;">
      <div>
        <h2 style="text-align:center;">
          启事信息
        </h2>
      </div>
      <h3 style="text-align:left;margin-left:50px;">
          启事状态
      </h3>
      <el-row>
        <el-col span="12">
          <el-row>
            <div id="LostNoticeStatusPie" class="pie-wrap"></div>
          </el-row>
          <el-row>
            <div style="margin-left:80px;margin-top:30px;">
              <h4>
                寻物启事总数: <el-tag type="warning"
                        style="float:right;margin-right:150px;font-size:20px;">{{lost_notice_CLS+lost_notice_PUB}}</el-tag>
              </h4>
            </div>
            <div style="margin-left:80px;">
              <h4>
                寻物启事成功率: <el-tag type="success"
                        style="float:right;margin-right:150px;font-size:20px;">{{(lost_notice_CLS/lost_notice_PUB)*100+'%'}}</el-tag>
              </h4>
            </div>
          </el-row>
        </el-col>
        <el-col span="12">
          <el-row>
            <div id="FoundNoticeStatusPie" class="pie-wrap"></div>
          </el-row>
          <el-row>
            <div style="margin-left:80px;margin-top:30px;">
              <h4>
                失物招领总数: <el-tag type="info"
                        style="float:right;margin-right:150px;font-size:20px;">{{found_notice_CLS+found_notice_PUB}}</el-tag>
              </h4>
            </div>
            <div style="margin-left:80px;">
              <h4>
                失物招领成功率: <el-tag type="danger"
                        style="float:right;margin-right:150px;font-size:20px;">{{(found_notice_CLS/found_notice_PUB)*100+'%'}}</el-tag>
              </h4>
            </div>
          </el-row>
        </el-col>
      </el-row>
      <h3 style="text-align:left;margin-left:50px;">
          启事发布趋势
      </h3>
      <el-form class="form"
               label-width="118px">
        <el-form-item label='数据类型'
                      class="label">
          <el-radio-group v-model="data_type" @change="change">
            <el-radio-button label="月报"></el-radio-button>
            <el-radio-button label="日报"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label='数据指标'
                      class="label">
          <el-radio-group v-model="data_target" @change="change">
            <el-radio-button label="寻物启事"></el-radio-button>
            <el-radio-button label="失物招领"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label='数据时间'
                      class="label">
          <el-date-picker
            v-model="date_search"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            v-if="data_type == '月报'"
            format="yyyy-MM"
            value-format="yyyy-MM-ddThh:mm:ss+08:00"
            @change="change">
          </el-date-picker>
          <el-date-picker
            v-model="date_search"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-if="data_type == '日报'"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-ddThh:mm:ss+08:00"
            @change="change"
            :picker-options="pickDateOption">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <h4 style="text-align:left;margin-left:50px;">
          数据趋势
      </h4>
      <div id="DataTrendLine" class="pie-wrap"></div>
    </el-card>
  </div>
</template>

<style scoped>
.el-card {
  margin-right: 15%;
  margin-left: 15%;
  margin-bottom: 1%;
}
.el-progress {
  margin-top: 5%;
  margin-right: 10%;
  margin-left: 10%;
}
#UserStatusPie {
  width: 100%;
  height: 200px;
}
#UserIdentityPie {
  width: 100%;
  height: 200px;
}
#LostNoticeStatusPie {
  width: 100%;
  height: 200px;
}
#FoundNoticeStatusPie {
  width: 100%;
  height: 200px;
}
#DataTrendLine {
  width: 100%;
  height: 340px;
  margin-top: -40px;
}
</style>

<script>
/* eslint-disable @typescript-eslint/camelcase */

import Axios from 'axios'
import echarts from 'echarts'
import moment from 'moment'
export default {
  data: function () {
    return {
      data_type: '月报',
      data_target: '寻物启事',
      date_search: ["2020-07-01T12:00:00+08:00","2021-06-01T12:00:00+08:00"],
      date_range: [],
      month_range: [],
      date_range_count: [],
      month_range_count: [],
      user_data: {
        total: '',
        verified: '',
        staff: '',
        active: 1,
        inactive: 1,
        suspended: 1
      },
      found_notice_data: [],
      found_notice_PUB: 0,
      found_notice_CLS: 0,
      lost_notice_data: [],
      lost_notice_PUB: 0,
      lost_notice_CLS: 0,
      found_notice_timeline: [],
      timeStamp: 2 * 24 * 60 * 60 * 1000,
      label_interval: 5
    }
  },
  mounted() {
    this.getUserData()
    this.getFoundNoticeData()
    this.getLostNoticeData()
    this.change()
  },
  methods: {
    padding(num, length) {
      return (Array(length).join("0") + num).slice(-length);
    },
    getBetweenMonthStr(start,end){
      var result = [];
      var beginDay = start.split("-");
      var endDay = end.split("-");
      var found_all = false
      result.push(start)
      this.month_range_count = []
      let has_filled = false
      for(let j=0;j<this.found_notice_timeline.length;j++)
      {
        if(start == moment(this.found_notice_timeline[j].month).format("YYYY-MM"))
        {
          this.month_range_count.push(this.found_notice_timeline[j].count)
          has_filled = true
        }
      }
      if(has_filled == false) this.month_range_count.push(0)
      else has_filled = false
      while(found_all == false)
      {
        let tem;
        if(beginDay[1] != '12')
        {
          beginDay[1] = this.padding(Number(beginDay[1])+1,2)
        }
        else
        {
          beginDay[0] = String(Number(beginDay[0])+1)
          beginDay[1] = this.padding(1,2)
        }
        tem = beginDay[0] + '-' + beginDay[1]
        result.push(tem)
        let has_filled = false
        for(let j=0;j<this.found_notice_timeline.length;j++)
        {
          if(tem == moment(this.found_notice_timeline[j].month).format("YYYY-MM"))
          {
            this.month_range_count.push(this.found_notice_timeline[j].count)
            has_filled = true
          }
        }
        if(has_filled == false) this.month_range_count.push(0)
        else has_filled = false
        if(tem == end) found_all = true
      }
      return result
    },
    getBetweenDateStr(start,end){
      var result = [];
      var beginDay = start.split("-");
      var endDay = end.split("-");
      var diffDay = new Date();
      var dateList = new Array;
      var i = 0;
      diffDay.setDate(beginDay[2]);
      diffDay.setMonth(beginDay[1]-1);
      diffDay.setFullYear(beginDay[0]);
      result.push(start);
      this.date_range_count = []
      let has_filled = false
      for(let j=0;j<this.found_notice_timeline.length;j++)
      {
        if(start == moment(this.found_notice_timeline[j].day).format("YYYY-MM-DD"))
        {
          this.date_range_count.push(this.found_notice_timeline[j].count)
          has_filled = true
        }
      }
      if(has_filled == false) this.date_range_count.push(0)
      else has_filled = false
      while(i == 0){
        var countDay = diffDay.getTime() + 24 * 60 * 60 * 1000;
        diffDay.setTime(countDay);
        dateList[2] = diffDay.getDate();
        dateList[1] = diffDay.getMonth() + 1;
        dateList[0] = diffDay.getFullYear();
        if(String(dateList[1]).length == 1){dateList[1] = "0"+dateList[1]};
        if(String(dateList[2]).length == 1){dateList[2] = "0"+dateList[2]};
        let tem = dateList[0]+"-"+dateList[1]+"-"+dateList[2]
        result.push(tem);
        console.log(this.found_notice_timeline.length)
        for(let j=0;j<this.found_notice_timeline.length;j++)
        {
          if(tem == moment(this.found_notice_timeline[j].day).format("YYYY-MM-DD"))
          {
            this.date_range_count.push(this.found_notice_timeline[j].count)
            has_filled = true
          }
        }
        if(has_filled == false) this.date_range_count.push(0)
        else has_filled = false
        if(dateList[0] == endDay[0] && dateList[1] == endDay[1] && dateList[2] == endDay[2]){ i = 1;
        }
      };
      console.log(result);
      return result;
    },
    getUserData(){
      let me=this;
      Axios.get('/users/statistic', {})
      .then((response) => {
        me.user_data = response.data
        this.drawUserStatusPie();
        this.drawUserIdentityPie();
      })
      .catch((error) => {
        alert('error:' + error)
      })
    },
    getFoundNoticeData(){
      let me=this;
      Axios.get('/found-notices/stat-status', {})
      .then((response) => {
        me.found_notice_data = response.data
        let has_pub = false
        let has_cls = false
        for(let i=0;i<me.found_notice_data.length;i++)
        {
          if(me.found_notice_data[i].status == 'PUB')
          {
            has_pub = true
            me.found_notice_PUB = me.found_notice_data[i].count
          }
          else if(me.found_notice_data[i].status == 'CLS')
          {
            has_cls = true
            me.found_notice_CLS = me.found_notice_data[i].count
          }
        }
        if(has_pub == false)
        {
          me.found_notice_PUB = 0
        }
        else if(has_cls == false)
        {
          me.found_notice_CLS = 0
        }
        this.drawFoundNoticeStatusPie();
      })
      .catch((error) => {
        alert('error:' + error)
      })
    },
    getLostNoticeData(){
      let me=this;
      Axios.get('/lost-notices/stat-status', {})
      .then((response) => {
        me.lost_notice_data = response.data
        let has_pub = false
        let has_cls = false
        for(let i=0;i<me.lost_notice_data.length;i++)
        {
          if(me.lost_notice_data[i].status == 'PUB')
          {
            has_pub = true
            me.lost_notice_PUB = me.lost_notice_data[i].count
          }
          else if(me.lost_notice_data[i].status == 'CLS')
          {
            has_cls = true
            me.lost_notice_CLS = me.lost_notice_data[i].count
          }
        }
        if(has_pub == false)
        {
          me.lost_notice_PUB = 0
        }
        else if(has_cls == false)
        {
          me.lost_notice_CLS = 0
        }
        this.drawLostNoticeStatusPie();
      })
      .catch((error) => {
        alert('error:' + error)
      })
    },
    getNoticeTimeLine(){
      let me=this;
      console.log(this.data_target)
      if(this.data_target == "失物招领")
      {
        let type = '';
        if(this.data_type == "月报")
        {
          type = "month"
        }
        else if(this.data_type == "日报")
        {
          type = "day"
        }
        let data = {
          start_time: this.date_search[0],
          end_time: this.date_search[1],
          type: type
        }
        console.log(data)
        Axios.get('/found-notices/stat-timeline/', {
          params: {
            start_time: this.date_search[0],
            end_time: this.date_search[1],
            type: type
          }
        })
        .then((response) => {
          me.found_notice_timeline = response.data
          console.log(response.data)
          if(type == "month")
          {
            this.month_range = this.getBetweenMonthStr(moment(this.date_search[0]).format("YYYY-MM"), moment(this.date_search[1]).format("YYYY-MM"))
            console.log(this.month_range)
            console.log(this.month_range_count)
            this.drawDataTrendLine(this.month_range,this.month_range_count)
          }
          else if(type == "day")
          {
            this.date_range = this.getBetweenDateStr(moment(this.date_search[0]).format("YYYY-MM-DD"), moment(this.date_search[1]).format("YYYY-MM-DD"))
            if(this.date_range.length <=60) this.label_interval = 5
            else this.label_interval = 10
            this.drawDataTrendLine(this.date_range,this.date_range_count)
          }
          // this.drawDataTrendLine()
        })
        .catch((error) => {
          alert('error:' + error)
        })
      }
      else if(this.data_target == "寻物启事")
      {
        let type = '';
        if(this.data_type == "月报")
        {
          type = "month"
        }
        else if(this.data_type == "日报")
        {
          type = "day"
        }
        let data = {
          start_time: this.date_search[0],
          end_time: this.date_search[1],
          type: type
        }
        console.log(data)
        Axios.get('/lost-notices/stat-timeline/', {
          params: {
            start_time: this.date_search[0],
            end_time: this.date_search[1],
            type: type
          }
        })
        .then((response) => {
          me.found_notice_timeline = response.data
          console.log(response.data)
          if(type == "month")
          {
            this.month_range = this.getBetweenMonthStr(moment(this.date_search[0]).format("YYYY-MM"), moment(this.date_search[1]).format("YYYY-MM"))
            console.log(this.month_range)
            console.log(this.month_range_count)
            this.drawDataTrendLine(this.month_range,this.month_range_count)
          }
          else if(type == "day")
          {
            this.date_range = this.getBetweenDateStr(moment(this.date_search[0]).format("YYYY-MM-DD"), moment(this.date_search[1]).format("YYYY-MM-DD"))
            if(this.date_range.length <=60) this.label_interval = 5
            else this.label_interval = 10
            this.drawDataTrendLine(this.date_range,this.date_range_count)
          }
          // this.drawDataTrendLine()
        })
        .catch((error) => {
          alert('error:' + error)
        })
      }
    },
    drawCharts(){
      this.drawUserStatusPie();
      this.drawUserIdentityPie();
      this.drawLostNoticeStatusPie();
      this.drawFoundNoticeStatusPie();
      this.drawDataTrendLine();
    },
    change(){
      this.getNoticeTimeLine()
      console.log(this.date_search)
      let d = new Date(this.date_search[0])
      console.log(d)
    },
    drawDataTrendLine(range,count) {
      this.dataTrendLine = echarts.init(document.getElementById('DataTrendLine'));

      this.dataTrendLine.setOption({
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        axisPointer:{
          show:true
        },
        xAxis: {
          type: 'category',
          data: range,
          axisLabel: {
            interval: 'auto'
          },
          axisTick: {
            alignWithLabel: true,
            lineStyle: {
              color: 'blue',
              type: 'dashed',
              shadowBlur: 10
            }
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: count,
          type: 'line',
          symbol: 'diamond',
          symbolSize: 8
        }]
      });
      // this.dataTrendLine.showLoading();
      // Axios.get('/users/statistic', {})
      //   .then((response) => {
      //     this.dataTrendLine.hideLoading();
      //     me.user_data = response.data
      //   })
      //   .catch((error) => {
      //     alert('error:' + error)
      //   })
    },
    drawUserStatusPie() {
      this.UserStatusPie = echarts.init(
        document.getElementById("UserStatusPie")
      );
      this.UserStatusPie.setOption({
        tooltip: {
          trigger: "item",
          // formatter: "{a}<br/>{b}: <br/>{c}({d}%)",  其中 {a}指向name名称（访问来源）
          formatter: "{b}: <br/>{c}({d}%)",
        },
        legend: {
          data: ["活跃中", "不活跃", "已封禁"],
          left: 400,
          top: 60,
          orient: "vertical",
          // 下面注释的代码是控制分类放在哪个地方,需要体验的话，直接把上面的代码注释，把下面的代码解开注释即可
          //   data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
          //   left: "center",
          //   top: "bottom",
          //   orient: "horizontal"
        },
        series: [
          {
            name: "用户状态",
            type: "pie",
            //圆圈的粗细
            radius: ["60%", "100%"],
            //圆圈的位置
            center: ["40%", "50%"],
            data: [
              {
                value: this.user_data.active,
                name: "活跃中",
              },
              {
                value: this.user_data.inactive,
                name: "不活跃",
              },
              {
                value: this.user_data.suspended,
                name: "已封禁",
              }
            ],
            //动画持续时间：2秒
            animationDuration: 2000,
            //控制是否显示指向文字的,默认为true
            label: {
              show: false,
              position: "center",
              //以下代码可以代表指向小文字的
              //   show: true,
              //   formatter: "{b} : {c} ({d}%)",
              //   textStyle: {
              //     color: "#333",
              //     fontSize: 14,
              //   },
            },
          },
        ],
      });
    },
    drawUserIdentityPie() {
      this.UserIdentityPie = echarts.init(
        document.getElementById("UserIdentityPie")
      );
      this.UserIdentityPie.setOption({
        tooltip: {
          trigger: "item",
          // formatter: "{a}<br/>{b}: <br/>{c}({d}%)",  其中 {a}指向name名称（访问来源）
          formatter: "{b}: <br/>{c}({d}%)",
        },
        legend: {
          data: ["认证用户", "管理员", "其他用户"],
          left: 400,
          top: 60,
          orient: "vertical",
          // 下面注释的代码是控制分类放在哪个地方,需要体验的话，直接把上面的代码注释，把下面的代码解开注释即可
          //   data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
          //   left: "center",
          //   top: "bottom",
          //   orient: "horizontal"
        },
        series: [
          {
            name: "用户身份",
            type: "pie",
            //圆圈的粗细
            radius: ["60%", "100%"],
            //圆圈的位置
            center: ["40%", "50%"],
            data: [
              {
                value: this.user_data.verified,
                name: "认证用户",
              },
              {
                value: this.user_data.staff,
                name: "管理员",
              },
              {
                value: this.user_data.total-this.user_data.verified-this.user_data.staff,
                name: "其他用户",
              }
            ],
            //动画持续时间：2秒
            animationDuration: 2000,
            //控制是否显示指向文字的,默认为true
            label: {
              show: false,
              position: "center",
              //以下代码可以代表指向小文字的
              //   show: true,
              //   formatter: "{b} : {c} ({d}%)",
              //   textStyle: {
              //     color: "#333",
              //     fontSize: 14,
              //   },
            },
          },
        ],
      });
    },
    drawLostNoticeStatusPie() {
      this.UserIdentityPie = echarts.init(
        document.getElementById("LostNoticeStatusPie")
      );
      this.UserIdentityPie.setOption({
        tooltip: {
          trigger: "item",
          // formatter: "{a}<br/>{b}: <br/>{c}({d}%)",  其中 {a}指向name名称（访问来源）
          formatter: "{b}: <br/>{c}({d}%)",
        },
        legend: {
          data: ["成功的寻物启事", "尚未成功的寻物启事"],
          left: 400,
          top: 60,
          orient: "vertical",
          // 下面注释的代码是控制分类放在哪个地方,需要体验的话，直接把上面的代码注释，把下面的代码解开注释即可
          //   data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
          //   left: "center",
          //   top: "bottom",
          //   orient: "horizontal"
        },
        series: [
          {
            name: "寻物启事状态",
            type: "pie",
            //圆圈的粗细
            radius: ["60%", "100%"],
            //圆圈的位置
            center: ["40%", "50%"],
            data: [
              {
                value: this.lost_notice_CLS,
                name: "成功的寻物启事",
              },
              {
                value: this.lost_notice_PUB,
                name: "尚未成功的寻物启事",
              }
            ],
            //动画持续时间：2秒
            animationDuration: 2000,
            //控制是否显示指向文字的,默认为true
            label: {
              show: false,
              position: "center",
              //以下代码可以代表指向小文字的
              //   show: true,
              //   formatter: "{b} : {c} ({d}%)",
              //   textStyle: {
              //     color: "#333",
              //     fontSize: 14,
              //   },
            },
          },
        ],
      });
    },
    drawFoundNoticeStatusPie() {
      this.UserIdentityPie = echarts.init(
        document.getElementById("FoundNoticeStatusPie")
      );
      this.UserIdentityPie.setOption({
        tooltip: {
          trigger: "item",
          // formatter: "{a}<br/>{b}: <br/>{c}({d}%)",  其中 {a}指向name名称（访问来源）
          formatter: "{b}: <br/>{c}({d}%)",
        },
        legend: {
          data: ["成功的失物招领", "尚未成功的失物招领"],
          left: 400,
          top: 60,
          orient: "vertical",
          // 下面注释的代码是控制分类放在哪个地方,需要体验的话，直接把上面的代码注释，把下面的代码解开注释即可
          //   data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
          //   left: "center",
          //   top: "bottom",
          //   orient: "horizontal"
        },
        series: [
          {
            name: "失物招领状态",
            type: "pie",
            //圆圈的粗细
            radius: ["60%", "100%"],
            //圆圈的位置
            center: ["40%", "50%"],
            data: [
              {
                value: this.found_notice_CLS,
                name: "成功的失物招领",
              },
              {
                value: this.found_notice_PUB,
                name: "尚未成功的失物招领",
              }
            ],
            //动画持续时间：2秒
            animationDuration: 2000,
            //控制是否显示指向文字的,默认为true
            label: {
              show: false,
              position: "center",
              //以下代码可以代表指向小文字的
              //   show: true,
              //   formatter: "{b} : {c} ({d}%)",
              //   textStyle: {
              //     color: "#333",
              //     fontSize: 14,
              //   },
            },
          },
        ],
      });
    },
  }
}
</script>
