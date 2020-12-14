// writen by xyh
<template>
  <div>
    <el-card class="title-card">
      所有物品
      <div class="edit">
        <el-button :id="id"
                    target="rent-application"
                    class="change"
                    @click="type_dialogFormVisible = true"
                    type="primary">新建物品种类</el-button>
        <el-button :id="id"
                    target="rent-application"
                    class="change"
                    @click="template_dialogFormVisible = true"
                    type="primary">新建物品模板</el-button>
      </div>
    </el-card>
    <el-dialog class="new_type" title="新建物品种类" :visible.sync="type_dialogFormVisible">
      <el-form label-width="100px">
        <el-form-item label="物品种类名称">
          <el-input autocomplete="off" v-model="type_name.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="foot">
          <el-button @click="type_dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="CreateNewType">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog class="edit_type" title="修改物品种类" :visible.sync="type_edit_dialogFormVisible">
      <el-form label-width="100px">
        <el-form-item label="物品种类名称">
          <el-input autocomplete="off" v-model="type_name.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="foot">
          <el-button @click="type_dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="EditType">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog class="new_type" title="新建物品模板" :visible.sync="template_dialogFormVisible">
      <el-form label-width="100px">
        <el-form-item label="物品模板名称">
          <el-input autocomplete="off" v-model="template.name"></el-input>
        </el-form-item>
        <el-form-item label='物品种类'
                      class="label">
          <el-select v-model="template.type">
            <el-option v-for="item in property_type_list.results"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='模板图片'>
          <el-upload
            class="avatar-uploader"
            action="none"
            :on-preview="handleImageUploadSuccess"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="checkType"
            :limit="1"
            :on-exceed="handleExceed">
            <i v-if="!image_visible" class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="image_visible">
            <img width="100%" :src="template.thumbnail_url" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label='模板fields'
                      class="label">
          <el-input v-model="template.fields"
                    type='textarea'></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="foot">
          <el-button @click="template_dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="CreateNewTemplate">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <search-filter :options="options"
                   @search="searchAndFilter"></search-filter>
    <el-card class="table-card">
      <el-table :data="property_type_list.results"
                id="users-table"
                class="table"
                @row-click="enter"
                :height="height"
                row-key="name"
                :tree-props="{children: 'templates'}">
        <el-table-column prop="id"
                         label="ID"
                         width="100">
        </el-table-column>
        <el-table-column prop="name"
                         label="名称"
                         width="1000">
        </el-table-column>
        <el-table-column label="操作"
                         width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click.native.stop="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button
              v-if="!(scope.row.type)"
              size="mini"
              @click.native.stop="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
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
      type_dialogFormVisible: false,
      type_edit_dialogFormVisible: false,
      template_dialogFormVisible: false,
      type_edit_id: -1,
      property_template_list: [],
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
      template: {
        name: '',
        type: '',
        thumbnail: null,
        thumbnail_url: '',
        fields: ''
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
    handleEdit(index, row) {
      this.type_edit_dialogFormVisible = true
      this.type_edit_id = row.id
    },
    EditType() {
      const data = {
        name: this.type_name.name
      }
      Axios({
        url: '/property-types/'+this.type_edit_id+'/',
        method: 'put',
        data: data
      })
        .then((response) => {
          this.type_edit_dialogFormVisible = false
          this.reload()
          console.log(response.data)
        })
        .catch((error) => {
          alert('error:' + error)
        })
      this.type_edit_dialogFormVisible = false
    },
    handleDelete(index, row) {
      if(row.type)
      {
        Axios.delete('/property-templates/' + row.id + '/', {})
        .then((response) => {
            this.reload()
        })
        .catch((error) => {
          alert('error:' + error)
        })
      }
      else
      {
        Axios.delete('/property-types/' + row.id + '/', {})
        .then((response) => {
            this.reload()
        })
        .catch((error) => {
          alert('error:' + error)
        })
      }
    },
    handleImageUploadSuccess(file) {
      this.template.thumbnail_url = file.url
      this.image_visible = true
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    checkType(file,fileList) {
      this.template.thumbnail=file
    },
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
          this.type_dialogFormVisible = false
          this.reload()
          console.log(response.data)
        })
        .catch((error) => {
          alert('error:' + error)
        })
      this.type_dialogFormVisible = false
    },
    CreateNewTemplate: function() {
      // const data = {
      //   name: this.type_name.name
      // }
      let data=new FormData();
      data.append('name', this.template.name)
      data.append('type', this.template.type)
      data.append('thumbnail', this.template.thumbnail.raw)
      data.append('fields', this.template.fields)
      //Axios.defaults.headers.common["Authorization"]="Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjA2NTc2NDU4LCJqdGkiOiI3Njc4NjUzOWY0NDU0Y2NiYjUxOTEzZWFlZjUxMjFiYyIsInVzZXJfaWQiOjF9.HCgdFjYiXHIJFQDbbnvLZCe2JzA2es-AiTKuHWWyBVU"
      Axios({
        url: '/property-templates/',
        method: 'post',
        data: data
        // headers: {
        //   Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjA2NTc2NDU4LCJqdGkiOiI3Njc4NjUzOWY0NDU0Y2NiYjUxOTEzZWFlZjUxMjFiYyIsInVzZXJfaWQiOjF9.HCgdFjYiXHIJFQDbbnvLZCe2JzA2es-AiTKuHWWyBVU'
        // }
      })
        .then((response) => {
          this.template_dialogFormVisible = false
          this.reload()
          console.log(response.data)
        })
        .catch((error) => {
          alert('error:' + error)
        })
      this.template_dialogFormVisible = false
    },
    enter: function (row) {
      if(row.type)
      {
        this.$router.push({ name: 'property-templates', params: { templateId: row.id } })
      }
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
