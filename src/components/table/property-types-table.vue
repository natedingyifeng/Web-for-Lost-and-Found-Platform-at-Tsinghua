// writen by xyh
<template>
  <div>
    <el-card class="title-card">
      所有物品种类
      <div class="edit">
        <el-button :id="id"
                    target="rent-application"
                    class="change"
                    @click="dialogFormVisible = true"
                    type="primary">新建</el-button>
        <el-button :id="id"
                    class="delete"
                    type="primary"
                    target="rent-application">删除</el-button>
      </div>
    </el-card>
    <el-dialog class="new_type" title="新建物品种类" :visible.sync="dialogFormVisible">
      <el-form label-width="100px">
        <el-form-item label="物品种类名称">
          <el-input autocomplete="off" v-model="type_name.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="foot">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="CreateNewType">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <search-filter :options="options"
                   @search="searchAndFilter"></search-filter>
    <el-card class="table-card">
      <el-table :data="property_type_list.results"
                stripe
                id="users-table"
                class="table"
                @row-click="enter"
                :height="height">
        <el-table-column prop="id"
                         label="ID"
                         width="100">
        </el-table-column>
        <el-table-column prop="name"
                         label="种类名称"
                         width="1200">
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
.edit{
  position: relative;
  float: right;
  margin: auto;
  margin-bottom: 20px;
}
.foot{
  position: relative;
  top: -20px;
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
      dialogFormVisible: false,
      property_type_list: [],
      options: [
        { value: 'search', label: '全部搜索' },
        { value: 'creator', label: '筛选：申请者' }
      ],
      select: 'search',
      input: '',
      type_name: {
        name: ''
      },
      data: { count: 0 }
    }
  },
  created: function () {
    // lostList=[{id: 1, created_at: "2020.11.2 23:58", created_by: "丁一峰", lost_item: "Airpods", lost_place: "第六教学楼", lost_time: "11月2日上午十点左右", status: "未归还"}]
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
    Axios.get('/property-types', {})
      .then((response) => {
          this.property_type_list = response.data
          console.log(this.property_type_list.results)
      })
      .catch((error) => {
        alert('error:' + error)
      })
    this.changePage(1)
  },
  methods: {
    reload () {
      location.reload()
    },
    CreateNewType: function() {
      const data = {
        name: this.type_name.name
      }
      Axios({
        url: '/property-types/',
        method: 'post',
        data: data
      })
        .then((response) => {
          this.dialogFormVisible = false
          this.reload()
          console.log(response.data)
        })
        .catch((error) => {
          alert('error:' + error)
        })
      this.dialogFormVisible = false
    },
    enter: function (row) {
      // this.$router.push({ name: 'certification-application', params: { certificationApplicationId: row.id } })
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
