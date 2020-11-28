// writen by xyh
<template>
  <div>
    <el-card class="title-card">所有失物招领</el-card>
    <search-filter :options="options"
                   @search="searchAndFilter"></search-filter>
    <el-card class="table-card">
      <el-table :data="foundList.results"
                stripe
                id="users-table"
                class="table"
                @row-click="enter"
                :height="height">
        <el-table-column prop="id"
                         label="ID"
                         width="80">
        </el-table-column>
        <el-table-column prop="created_at"
                         label="创建时间"
                         width="200">
        </el-table-column>
        <el-table-column prop="author.username"
                         label="创建者"
                         width="200">
        </el-table-column>
        <el-table-column prop="property.name"
                         label="拾取物品"
                         width="230">
        </el-table-column>
        <el-table-column prop="found_location"
                         label="拾取地点"
                         width="250">
        </el-table-column>
        <el-table-column prop="found_datetime"
                         label="拾取时间"
                         width="200">
        </el-table-column>
        <el-table-column prop="status"
                         label="状态"
                         width="130">
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
      foundList: [],
      real_author: '',
      // foundList: [
      //   {id: 1, created_at: "2020.10.29 9:32", created_by: "李祁", found_item: "一张学生证", found_place: "紫荆食堂", found_time: "10月29日上午九点半", status: "丢失中"},
      //   {id: 2, created_at: "2020.11.1 12:14", created_by: "徐亦豪", found_item: "一件粉色外套", found_place: "西操", found_time: "11月1日上午十点左右", status: "丢失中"}],
      options: [
        { value: 'search', label: '全部搜索' },
        { value: 'creator', label: '筛选：创建者' },
        { value: 'equipment', label: '筛选：拾取物品' },
        { value: 'address', label: '筛选：拾取地点' },
        { value: 'status', label: '筛选：状态' }
      ],
      select: 'search',
      input: '',
      data: { count: 0 }
    }
  },
  created: function () {
    // 获取用户列表
    // if (this.id === -1) {
    //   Axios.get('api/v1/rent-application', {})
    //     .then((response) => {
    //       this.rentApplicationList = response.data.results
    //     })
    //     .catch((error) => {
    //       alert('error:' + error)
    //     })
    // } else {
    //   Axios.get('api/v1/rent-application/userId/' + this.id, {})
    //     .then((response) => {
    //       this.rentApplicationList = response.data.results
    //     })
    //     .catch((error) => {
    //       alert('error:' + error)
    //     })
    // }
    // var _this=this
    Axios.get('/found-notices/', {})
      .then((response) => {
          this.foundList = response.data
          // console.log(this.foundList)
          //console.log(this.property_template_list.results[id-1])
          for(var i=0;i<this.foundList.results.length;i++)
          {
            let found_datetime = this.foundList.results[i].found_datetime
            let created_at = this.foundList.results[i].created_at
            let updated_at = this.foundList.results[i].updated_at
            this.foundList.results[i].found_datetime=this.extractTime(found_datetime)
            this.foundList.results[i].created_at=this.extractTime(created_at)
            this.foundList.results[i].updated_at=this.extractTime(updated_at)
            // console.log('/users/' + this.foundList.results[i].author)
            // let author = this.foundList.results[i].author
            // Axios.get('/users/' + author, {})
            //   .then((response) => {
            //       _this.real_author = response.data
            //       console.log(_this.real_author)
            //       // console.log(this.foundList.results[i].author)
            //   })
            //   .catch((error) => {
            //     console.log(error)
            //     // alert('error:' + error)
            //   })
            // console.log(_this.real_author)
            // this.foundList.results[i].author = full_author
            // console.log(this.foundList.results[i].author)
          }
      })
      .catch((error) => {
        alert('error:' + error)
      })
      // this.foundList.results[i].author = _this.real_author
    this.changePage(1)
  },
  methods: {
    enter: function (row) {
      this.$router.push({ name: 'found', params: { foundId: row.id } })
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
    }
  }
}
</script>
