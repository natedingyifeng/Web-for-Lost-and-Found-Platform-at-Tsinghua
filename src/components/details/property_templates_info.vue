// writen by xyh
<template>
  <div class = "info">
    <el-card class="title_card"
             style="font-size:24px;">
      {{'物品模板#' + this.property_template_list.results[this.id-1].id }}
      <div class="edit">
        <el-button :id="id"
                      :data="rent_data"
                      target="rent-application"
                      class="change"
                      v-if="isAdmin"
                      @click="change"
                      type="primary">修改</el-button>
        <el-button :id="id"
                      :data="rent_data"
                      target="rent-application"
                      class="change"
                      v-if="isAdmin"
                      @click="confirm"
                      type="primary">确定</el-button>
        <del-button :id="id"
                    class="delete"
                    target="rent-application"
                    v-if="isAdmin"></del-button>
      </div>
    </el-card>
    <el-card class='card'>
      <el-form class="form"
               label-width="100px">
        <el-divider>基本信息</el-divider>
        <el-form-item label='ID'>
          <el-row>
            <el-col span="5">
              <el-input v-model="property_template_list.results[id-1].id"
                          :disabled="true"></el-input>
            </el-col>
            <el-col span="8">
              <el-form-item label='物品名称'>
                <el-input v-model="property_template_list.results[id-1].name"
                          :disabled=notEdit
                          style="width:100%;"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label='物品种类'
                      class="label">
                <el-select v-model="property_type_list.results[property_template_list.results[id-1].type-1].name"
                          :disabled=notEdit>
                  <el-option v-for="item in property_type_list.results"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-divider>具体内容</el-divider>
        <el-form-item label='Fields'
                      class="label">
          <el-table
            :data="template_fields"
            style="width: 50%">
            <el-table-column
              prop="key"
              label="Key"
              width="180">
            </el-table-column>
            <el-table-column
              prop="type"
              label="Type"
              width="180">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label='图片'
                      class="label">
          <el-row :gutter="10">
            <el-col v-for="url in property_template_list.results[id-1].thumbnail" :key="url" span="7">
              <el-image :key="url" :src="url" fit="scale-down" lazy ></el-image>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.button {
  margin-top: 30px;
  left: 10%;
  position: relative;
}
.title_card{
  position: relative;
  margin: 0 auto;
  margin-top: 20px;
}
.card {
  position: relative;
  margin: auto;
  margin-top: 5px;
}
.form {
  position: relative;
  margin: auto;
  width: 90%;
}
.label{
  position: relative;
}
.edit{
  position: relative;
  float: right;
  margin: auto;
  margin-bottom: 20px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

<script>
/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios'
import changeButton from '../button/change-button'
import rejButton from '../button/rej-button'
import approveButton from '../button/approve-button'
import delButton from '../button/del-button'
export default {
  components: {
    'change-button': changeButton,
    'rej-button': rejButton,
    'approve-button': approveButton,

    'del-button': delButton
  },
  props: {
    id: Number
  },
  data: function () {
    return {
      property_template_list: [],
      property_type_list: [],
      template_fields_keys: [],
      template_fields: [],
      // eslint-disable-next-line eqeqeq
      isrenter: false,
      // eslint-disable-next-line eqeqeq
      isborrower: false,
      isAdmin: true,
      notEdit: true,
      inputVisible: false,
      inputValue: ''
      // isAdmin: this.$store.getters.isAdmin
    }
  },
  created: function () {
    // axios.get('/api/v1/rent-application/' + this.id, {
    //   headers: {
    //     Authorization: 'Token ' + this.$store.getters.getUserKey
    //   }
    // })
    //   .then((response) => {
    //     this.rent_data = response.data
    //     this.isrenter = this.rent_data.renter === this.$store.getters.getCurrentUser.id
    //     this.isborrower = this.rent_data.borrower === this.$store.getters.getCurrentUser.id
    //     console.log(this.isborrower)
    //   })
    //   .catch((error) => {
    //     this.$alert(error.response.data)
    //   })
    axios.get('/property-templates', {})
      .then((response) => {
          this.property_template_list = response.data
          //console.log(this.property_template_list.results[id-1])
          this.template_fields_keys = Object.keys(this.property_template_list.results[this.id-1].fields)
          for(var i=0;i<this.template_fields_keys.length;i++)
          {
             var arr = new Array()
             arr["key"] = this.template_fields_keys[i]
             arr["type"] = this.property_template_list.results[this.id-1].fields[this.template_fields_keys[i]]
             this.template_fields.push(arr)
          }
          console.log(Object.keys(this.property_template_list.results[this.id-1].fields))
          console.log(this.template_fields)
          console.log(this.property_template_list.results)
      })
      .catch((error) => {
        alert('error:' + error)
      })
    axios.get('/property-types', {})
      .then((response) => {
          this.property_type_list = response.data
          //console.log(this.property_template_list.results[id-1])
          console.log(this.property_template_list.results[this.id-1].thumbnail)
      })
      .catch((error) => {
        alert('error:' + error)
      })
    this.changePage(1)
  },
  methods: {
    handleClose(tag) {
      this.found_data[this.id-1].found_tags.splice(this.found_data[this.id-1].found_tags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.found_data[this.id-1].found_tags.push({type: inputValue, content: inputValue});
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    change: function () {
      // const newData = {}
      // for (const key in this.data) {
      //   if (this.data[key] !== '') {
      //     newData[key] = this.data[key]
      //   }
      // }

      // Axios.patch('/api/v1/' + this.target + '/' + this.id + '/', newData, {
      //   headers: {
      //     Authorization: 'Token ' + this.$store.getters.getUserKey
      //   }
      // })
      //   .then((response) => {
      //     location.reload()
      //     this.$message('修改成功')
      //     // this.$router.push({ name: 'admin' })
      //   })
      //   .catch((error) => {
      //     console.log(error.response)
      //     console.log(error.request.response)
      //     this.$alert(error.response.data)
      //   })
      this.notEdit=false
    },
    confirm: function () {
      // const newData = {}
      // for (const key in this.data) {
      //   if (this.data[key] !== '') {
      //     newData[key] = this.data[key]
      //   }
      // }

      // Axios.patch('/api/v1/' + this.target + '/' + this.id + '/', newData, {
      //   headers: {
      //     Authorization: 'Token ' + this.$store.getters.getUserKey
      //   }
      // })
      //   .then((response) => {
      //     location.reload()
      //     this.$message('修改成功')
      //     // this.$router.push({ name: 'admin' })
      //   })
      //   .catch((error) => {
      //     console.log(error.response)
      //     console.log(error.request.response)
      //     this.$alert(error.response.data)
      //   })
      this.notEdit=true
    },
    enterEquipment: function (id) {
      this.$router.push({ name: 'equipment', params: { equipmentId: id } })
    },
    enterUser: function (id) {
      this.$router.push({ name: 'user', params: { userId: id } })
    }
  }
}
</script>
