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
                @sort-change='sortChange'>
        <el-table-column prop="id"
                        label="ID"
                        width="80"
                        sortable='custom'>
        </el-table-column>
        <el-table-column prop="last_name"
                        label="姓"
                        width="80"
                        sortable='custom'>
        </el-table-column>
        <el-table-column prop="first_name"
                        label="名"
                        width="100"
                        sortable='custom'>
        </el-table-column>
        <el-table-column prop="username"
                        label="昵称"
                        width="160"
                        sortable='custom'>
        </el-table-column>
        <el-table-column prop="date_joined"
                        label="注册时间"
                        width="220"
                        sortable='custom'>
        </el-table-column>
        <el-table-column prop="email"
                        label="Email"
                        width="260"
                        sortable='custom'>
        </el-table-column>
        <el-table-column prop="phone"
                        label="电话号码"
                        width="220"
                        sortable='custom'>
        </el-table-column>
        <el-table-column prop="status"
                        label="状态"
                        width="180"
                        :filters="[{ text: '活跃中', value: '活跃中' }, { text: '不活跃', value: '不活跃' }, { text: '已禁用', value: '已禁用' }]"
                        :filter-method="filterTag"
                        filter-placement="bottom-end">
        </el-table-column>
      </el-table>
      <el-pagination background
                    layout="prev, pager, next"
                    :total="users_sum"
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
  width: 1350px;
}
.table {
  position: relative;
  margin: 0 auto 40px auto;
  width: 1350px;
}
.table-card{
  position: relative;
  margin: 0 auto 0 auto;
  width: 1350px;
}
.page-chooser {
  position: relative;
  left: 43%;
  top: -10px;
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
      select: 'search',
      input: '',
      options: [
        { value: 'search', label: '全部搜索' },
        { value: 'username', label: '筛选：用户名' },
        { value: 'last_name', label: '筛选：姓' },
        { value: 'first_name', label: '筛选：名' },
        { value: 'student_id', label: '筛选：学生证号' },
        { value: 'status', label: '筛选：状态' }
      ],
      status_options: [{
        value: 'ACT',
        label: '活跃中'
      }, {
        value: 'INA',
        label: '不活跃'
      }, {
        value: 'SUS',
        label: '已禁用'
      }],
      Status: {
        ACT: "活跃中",
        INA: "不活跃",
        SUS: "已禁用"
      },
      users_sum: 0
    }
  },
  created: function () {
    Axios({
        url: '/users/',
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
        }
      })
      .then((response) => {
          this.userList = response.data
          for(var i=0;i<this.userList.results.length;i++)
          {
            let joined_datetime = this.userList.results[i].date_joined
            this.userList.results[i].date_joined=this.extractTime(joined_datetime)
            this.userList.results[i].status = this.Status[this.userList.results[i].status]
          }
          this.users_sum = response.data.count
      })
      .catch((error) => {
        alert('error:' + error)
      })
    // this.changePage(1)
  },
  methods: {
    filterTag(value, row) {
      return row.status === value;
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
      Axios.get('/users/', {
        params: {
          ordering: order_prop
        },
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
        }
      })
        .then((response) => {
          this.userList = response.data
          for(var i=0;i<this.userList.results.length;i++)
          {
            let joined_datetime = this.userList.results[i].date_joined
            this.userList.results[i].date_joined=this.extractTime(joined_datetime)
            this.userList.results[i].status = this.Status[this.userList.results[i].status]
          }
        }).catch((error) => {
          this.$alert(error.response.data)
        })
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
    enterUser: function (row) {
      this.$router.push({ name: 'user', params: { userId: row.id } })
    },
    searchAndFilter: function (select, input) {
      this.select = select
      this.input = input
      this.changePage(1)
    },
    changePage: function (page) {
      Axios.get('/users/', {
        params: {
          page: page
        },
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
        }
      })
        .then((response) => {
          this.userList = response.data
          for(var i=0;i<this.userList.results.length;i++)
          {
            let joined_datetime = this.userList.results[i].date_joined
            this.userList.results[i].date_joined=this.extractTime(joined_datetime)
            this.userList.results[i].status = this.Status[this.userList.results[i].status]
          }
        }).catch((error) => {
          this.$alert(error.response.data)
        })
    }
  }
}
</script>
