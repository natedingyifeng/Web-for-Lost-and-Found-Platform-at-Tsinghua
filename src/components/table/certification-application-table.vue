// writen by xyh
<template>
  <div>
    <el-card class="title-card">所有认证申请</el-card>
    <search-filter :options="options"
                   @search="searchAndFilter"></search-filter>
    <el-card class="table-card">
      <el-table :data="verification_applications"
                stripe
                id="users-table"
                class="table"
                @row-click="enter"
                :height="height">
        <el-table-column prop="id"
                         label="ID"
                         width="100">
        </el-table-column>
        <el-table-column prop="created_at"
                         label="创建时间"
                         width="200">
        </el-table-column>
        <el-table-column prop="user"
                         label="申请者"
                         width="800">
        </el-table-column>
        <el-table-column prop="status"
                         label="状态"
                         width="150">
        </el-table-column> 
        <!-- <el-table-column prop="lost_item"
                         label="拾取物品"
                         width="230">
        </el-table-column>
        <el-table-column prop="lost_place"
                         label="拾取地点"
                         width="250">
        </el-table-column>
        <el-table-column prop="lost_time"
                         label="拾取时间"
                         width="200">
        </el-table-column>
        <el-table-column prop="status"
                         label="状态"
                         width="130">
        </el-table-column> -->
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
      verification_applications: [],
      options: [
        { value: 'search', label: '全部搜索' },
        { value: 'user__username', label: '筛选：申请者' },
        { value: 'status', label: '筛选：状态' }
      ],
      select: 'search',
      input: '',
      data: { count: 0 },
      Status: {
        ACC: "通过",
        REJ: "拒绝",
        TBD: "未处理"
      },
    }
  },
  created: function () {
    Axios.get('/user-verification-applications/', {})
    .then((response) => {
      this.verification_applications = response.data.results
      for(var i=0;i<this.verification_applications.length;i++)
      {
        this.getUserName(i)
        this.verification_applications[i].created_at = this.extractTime(this.verification_applications[i].created_at)
        this.verification_applications[i].status = this.Status[this.verification_applications[i].status]
      }
    })
    .catch((error) => {
      alert('error:' + error)
    })
    this.changePage(1)
  },
  methods: {
    getUserName(id) {
      Axios.get('/users/' + this.verification_applications[id].user + '/', {})
      .then((response) => {
        this.verification_applications[id].user = response.data.username
      })
      .catch((error) => {
        alert('error:' + error)
      })
    },
    enter: function (row) {
      this.$router.push({ name: 'certification-application', params: { certificationApplicationId: row.id } })
    },
    searchAndFilter: function (select, input) {
      this.select = select
      this.input = input
      this.changePage(1)
    },
    changePage: function (page) {
      Axios.get('/user-verification-applications', {
        params: {
          [this.select]: this.input,
          offset: (page - 1) * this.pageSize,
          limit: this.pageSize
        }
      })
        .then((response) => {
          this.verification_applications = response.data.results
          for(var i=0;i<this.verification_applications.length;i++)
          {
            this.getUserName(i)
            this.verification_applications[i].created_at = this.extractTime(this.verification_applications[i].created_at)
            this.verification_applications[i].status = this.Status[this.verification_applications[i].status]
          }
        }).catch((error) => {
          // alert('error:' + error)
          console.log(error)
          this.$alert(error.response.data)
        })
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
