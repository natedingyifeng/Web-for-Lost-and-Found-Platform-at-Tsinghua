// writen by xyh
<template>
  <div>
    <el-card class="title-card">所有举报信息</el-card>
    <search-filter :options="options"
                   @search="searchAndFilter"></search-filter>
    <el-card class="table-card">
      <el-table :data="reports"
                stripe
                id="users-table"
                class="table"
                @row-click="enter"
                :height="height"
                @sort-change='sortChange'>
        <el-table-column prop="id"
                         label="ID"
                         width="100"
                         sortable='custom'>
        </el-table-column>
        <el-table-column prop="created_at"
                         label="创建时间"
                         width="200"
                         sortable='custom'>
        </el-table-column>
        <el-table-column prop="submit_user.username"
                         label="举报者"
                         width="200">
        </el-table-column>
        <!-- <el-table-column prop="user.username"
                         label="被举报启事"
                         width="200">
        </el-table-column> -->
        <el-table-column prop="user.username"
                         label="被举报者"
                         width="500">
        </el-table-column>
        <el-table-column prop="type"
                         label="举报类型"
                         width="150"
                         :filters="[{ text: '诈骗行为', value: '诈骗行为' }, { text: '恶意骚扰', value: '恶意骚扰' }, { text: '推销广告', value: '推销广告' }, { text: '低俗色情', value: '低俗色情' }, { text: '违法内容', value: '违法内容' }, { text: '垃圾内容', value: '垃圾内容' }, { text: '侵权行为', value: '侵权行为' }, { text: '其他', value: '其他' }]"
                        :filter-method="filterType"
                        filter-placement="bottom-end">
        </el-table-column> 
        <el-table-column prop="verdict_type"
                         label="状态"
                         width="150"
                         :filters="[{ text: '有罪', value: '有罪' }, { text: '无罪', value: '无罪' }, { text: '未处理', value: '未处理' }]"
                        :filter-method="filterStatus"
                        filter-placement="bottom-end">
        </el-table-column> 
      </el-table>
      <el-pagination background
                     layout="prev, pager, next"
                     :total="data.count*10/pageSize"
                     class="page-chooser"
                     @current-change="changePage">
      </el-pagination>
    </el-card>
  </div>
</template>

<style scoped>
.title-card {
  margin: auto;
  margin-top: 20px;
  position: relative;
}
.table {
  position: relative;
  margin: 0 auto;
}
.table-card{
  position: relative;
  margin: 0 auto;
}
.page-chooser {
  position: relative;
  left: 45%;
  top: 10px;
}
</style>

<script>
import Axios from 'axios'
import searchAndFilter from '../search&filter'
export default {
  components: {
    'search-filter': searchAndFilter
  },
  props: {
    id: Number,
    pageSize: Number,
    height: Number
  },
  data: function () {
    return {
      reports: [],
      options: [
        { value: 'search', label: '全部搜索' },
        { value: 'creator', label: '筛选：申请者' }
      ],
      select: 'search',
      input: '',
      data: { count: 0 },
      Status: {
        GUI: "有罪",
        INN: "无罪",
        UNT: "未处理"
      },
      Types: {
        SCM: "诈骗行为",
        HRS: "恶意骚扰",
        ADV: "推销广告",
        PRN: "低俗色情",
        ILL: "违法信息",
        SPM: "垃圾内容",
        CPY: "侵权行为",
        OTH: "其他"
      },
      reports_notice: []
    }
  },
  created: function () {
    Axios.get('/reports/', {})
    .then((response) => {
      this.reports = response.data.results
      for(var i=0;i<this.reports.length;i++)
      {
        this.reports[i].created_at = this.extractTime(this.reports[i].created_at)
        this.reports[i].verdict_type = this.Status[this.reports[i].verdict_type]
        this.reports[i].type = this.Types[this.reports[i].type]
      }
    })
    .catch((error) => {
      alert('error:' + error)
    })
    this.changePage(1)
  },
  methods: {
    filterStatus(value, row) {
      return row.verdict_type === value;
    },
    filterType(value, row) {
      return row.type === value;
    },
    sortChange: function(column, prop, order) {
      let order_prop
      if(column.order == "descending")
      {
        order_prop = "-" + column.prop
      }
      else
      {
        order_prop=column.prop
      }
      Axios.get('/reports', {
        params: {
          ordering: order_prop,
          offset: 0,
          limit: this.pageSize
        }
      })
        .then((response) => {
          this.reports = response.data.results
          for(var i=0;i<this.reports.length;i++)
          {
            this.reports[i].created_at = this.extractTime(this.reports[i].created_at)
            this.reports[i].verdict_type = this.Status[this.reports[i].verdict_type]
            this.reports[i].type = this.Types[this.reports[i].type]
          }
        }).catch((error) => {
          // alert('error:' + error)
          console.log(error)
          this.$alert(error.response.data)
        })
    },
    enter: function (row) {
      this.$router.push({ name: 'report', params: { reportId: row.id } })
    },
    searchAndFilter: function (select, input) {
      this.select = select
      this.input = input
      this.changePage(1)
    },
    changePage: function (page) {
      // if (this.$store.getters.getUserKey === 'null') {
      //   return
      // }

      // if (this.id === -1) {
      //   Axios.get('/api/v1/rent-application', {
      //     params: {
      //       [this.select]: this.input,
      //       offset: (page - 1) * this.pageSize,
      //       limit: this.pageSize
      //     },
      //     headers: {
      //       Authorization: 'Token ' + this.$store.getters.getUserKey
      //     }
      //   })
      //     .then((response) => {
      //       this.rentApplicationList = response.data.results
      //       this.data = response.data
      //     }).catch((error) => {
      //       this.$alert(error.response.data)
      //     })
      // } else {
      //   Axios.get('/api/v1/rent-application/', {
      //     params: {
      //       [this.select]: this.input,
      //       offset: (page - 1) * this.pageSize,
      //       limit: this.pageSize,
      //       id: this.id
      //     }
      //   })
      //     .then((response) => {
      //       this.rentApplicationList = response.data.results
      //       this.data = response.data
      //     }).catch((error) => {
      //       console.log(error.response)
      //       // alert('error:' + error)
      //       this.$alert(error.response.data)
      //       console.log(error)
      //     })
      // }
    },
    extractTime(time){
      let date=time.split("T");
      let day=date[0].split("-");
      let hour=date[1].split("+");
      let specificTime=hour[0].split(":");
      let today = new Date();
      let yesterday = new Date();
      let yesyesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      yesyesterday.setDate(today.getDate() - 2);
      let result;
      if(Number(today.getFullYear())===Number(day[0]) && Number(today.getMonth()+1)===Number(day[1]) && Number(today.getDate())===Number(day[2]))
      {
        if(Number(today.getHours())===Number(specificTime[0])
        || (Number(today.getHours())===Number(specificTime[0])+1 && today.getMinutes()<Number(specificTime[0])))
        {
          let interval=Number(today.getMinutes())<Number(specificTime[1])?60+Number(today.getMinutes())-Number(specificTime[1]):Number(today.getMinutes())-Number(specificTime[1]);
          if(interval===0) result="不到1分钟前";
          else result=String(interval)+"分钟前";
        }
        else result=specificTime[0]+":"+specificTime[1];
      }
      else if((Number(yesterday.getFullYear())===Number(day[0]) && Number(yesterday.getMonth()+1)===Number(day[1]) && Number(yesterday.getDate())===Number(day[2])))
      {
        result="昨天 "+specificTime[0]+":"+specificTime[1];
      }
      else if((Number(yesyesterday.getFullYear())===Number(day[0]) && Number(yesyesterday.getMonth()+1)===Number(day[1]) && Number(yesyesterday.getDate())===Number(day[2])))
      {
        result="前天 "+specificTime[0]+":"+specificTime[1];
      }
      else
      {
        if(Number(today.getFullYear())!==Number(day[0]))
        {
          result=date[0]+" "+specificTime[0]+":"+specificTime[1];
        }
        else
        {
          result= day[1]+"-"+day[2]+" "+specificTime[0]+":"+specificTime[1];
        }
      }
      return result;
    },
  }
}
</script>
