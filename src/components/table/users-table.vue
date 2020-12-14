// writen by xyh
<template>
  <div>
    <el-card class="title-card">所有用户</el-card>
    <search-filter :options="options"
                   @search="searchAndFilter"></search-filter>
    <el-card class="table-card">
      <el-table :data="userList.results"
                @row-click='enterUser'
                stripe
                id="users-table"
                class="table"
                :height="height">
        <el-table-column prop="id"
                        label="ID"
                        width="40">
        </el-table-column>
        <el-table-column prop="last_name"
                        label="姓"
                        width="80">
        </el-table-column>
        <el-table-column prop="first_name"
                        label="名"
                        width="100">
        </el-table-column>
        <!-- <el-table-column prop="created_at"
                        label="创建时间"
                        width="180">
        </el-table-column> -->
        <el-table-column prop="username"
                        label="昵称"
                        width="160">
        </el-table-column>
        <el-table-column prop="date_joined"
                        label="注册时间"
                        width="220">
        </el-table-column>
        <el-table-column prop="email"
                        label="Email"
                        width="260">
        </el-table-column>
        <el-table-column prop="phone"
                        label="电话号码"
                        width="260">
        </el-table-column>
        <el-table-column prop="status"
                        label="状态"
                        width="180">
        </el-table-column>
        <!-- <el-table-column prop="is_renter"
                        label="是否是租借者"
                        width="180">
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
  props: {
    pageSize: Number,
    height: Number
  },
  components: {
    'search-filter': searchAndFilter
  },
  data: function () {
    return {
      data: { count: 0 },
      userList: [],
      // userList: [
      //   {id: 1, created_at: "2020.11.1 12:58", last_name: "丁", first_name: "一峰", nickname: "natedingyifeng", email: "123@qq.com", phone: "12318012345", status: "未认证"},
      //   {id: 2, created_at: "2020.11.2 21:23", last_name: "苏", first_name: "敬恒", nickname: "hengsoosoo", email: "456@qq.com", phone: "12132012345", status: "未认证"}
      // ],
      select: 'search',
      input: '',
      options: [
        { value: 'search', label: '全部搜索' },
        { value: 'first_name', label: '筛选：名' },
        { value: 'last_name', label: '筛选：姓' },
        { value: 'address', label: '筛选：地址' },
        { value: 'email', label: '筛选：邮箱' },
        { value: 'phone', label: '筛选：电话' }
      ]
    }
  },
  created: function () {
    Axios.get('/users', {})
      .then((response) => {
          this.userList = response.data
          for(var i=0;i<this.userList.results.length;i++)
          {
            let joined_datetime = this.userList.results[i].date_joined
            this.userList.results[i].date_joined=this.extractTime(joined_datetime)
          }
          // console.log(this.property_type_list.results)
      })
      .catch((error) => {
        alert('error:' + error)
      })
    this.changePage(1)
  },
  methods: {
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
    enterUser: function (row) {
      this.$router.push({ name: 'user', params: { userId: row.id } })
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

      // Axios.get('/api/v1/user', { params: { [this.select]: this.input, offset: (page - 1) * this.pageSize, limit: this.pageSize }, headers: { Authorization: 'Token ' + this.$store.getters.getUserKey } })
      //   .then((response) => {
      //     this.userList = response.data.results
      //     this.data = response.data
      //     console.log(this.userList)
      //   })
      //   .catch((error) => {
      //     console.log(error.response)
      //     this.$alert(error.response.data)
      //     // alert('error:' + error)
      //   })
    }
  }
}
</script>
