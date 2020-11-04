// writen by xyh
<template>
  <div>
    <el-card class="title-card">所有寻物启事</el-card>
    <search-filter :options="options"
                   @search="searchAndFilter"></search-filter>
    <el-card class="table-card">
      <el-table :data="foundList"
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
        <el-table-column prop="created_by"
                         label="创建者"
                         width="200">
        </el-table-column>
        <el-table-column prop="found_item"
                         label="丢失物品"
                         width="230">
        </el-table-column>
        <el-table-column prop="found_place"
                         label="丢失地点"
                         width="250">
        </el-table-column>
        <el-table-column prop="found_time"
                         label="丢失时间"
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
      foundList: [
        {id: 1, created_at: "2020.10.29 9:32", created_by: "李祁", found_item: "一张学生证", found_place: "紫荆食堂", found_time: "10月29日上午九点半", status: "丢失中"},
        {id: 2, created_at: "2020.11.1 12:14", created_by: "徐亦豪", found_item: "一件粉色外套", found_place: "西操", found_time: "11月1日上午十点左右", status: "丢失中"}],
      options: [
        { value: 'search', label: '全部搜索' },
        { value: 'creator', label: '筛选：创建者' },
        { value: 'equipment', label: '筛选：丢失物品' },
        { value: 'address', label: '筛选：丢失地点' },
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
    this.changePage(1)
  },
  methods: {
    enter: function (row) {
      this.$router.push({ name: 'found', params: { foundId: row.id } })
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
