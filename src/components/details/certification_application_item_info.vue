// writen by xyh
<template>
  <div>
    <el-card class="title_card"
             style="font-size:24px;">
      {{'认证申请#' + this.id }}
      <div class="edit">
        <el-button :id="id"
                        :data="data"
                        target="user"
                        class="change"
                        v-if="isAdmin"
                        @click="change"
                        type="primary">修改</el-button>
        <el-button :id="id"
                      :data="data"
                      target="user"
                      class="change"
                      v-if="isAdmin"
                      @click="confirm"
                      type="primary">确定</el-button>
        <del-button :id="id"
                    class="delete"
                    target="user"
                    v-if="isAdmin"></del-button>
      </div>
    </el-card>
    <chat-dialog ref="dialog"
                 :myId=0
                 :opposite="id"
                 :name="data[id-1].last_name+' '+data[id-1].first_name"
                 :dialogVisible.sync="dialogVisible"></chat-dialog>
    <el-card class='card'>
      <el-form class="form"
               label-width="100px">
        <el-divider>账户信息</el-divider>
        <el-form-item label='ID'>
          <el-row>
            <el-col span="6">
              <el-input v-model="id"
                        :disabled="true"
                        style="width:100%;"></el-input>
            </el-col>
            <el-col span="9">
              <el-form-item label='创建时间'>
                <el-input v-model="data[id-1].date_joined"
                          :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="9">
              <el-form-item label='上次登陆'>
                <el-input v-model="data[id-1].last_login"
                          :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-divider>用户信息</el-divider>
        <el-form-item label='姓名'>
          <el-row>
            <el-col span="12">
              姓
              <el-input v-model="data[id-1].last_name"
                        style="width:40%;"
                        :readOnly=notEdit></el-input>
              名
              <el-input v-model="data[id-1].first_name"
                        :readOnly=notEdit
                        style="width:40%;"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label='昵称'>
          <el-row>
            <el-col span="6">
              <el-input v-model="data[id-1].nickname"
                        :readOnly=notEdit></el-input>
            </el-col>
            <el-col span="9">
              <el-form-item label='Email'>
                <el-input v-model="data[id-1].email"
                          :readOnly=notEdit></el-input>
              </el-form-item>
            </el-col>
            <el-col span="9">
              <el-form-item label='电话号码'>
                <el-input v-model="data[id-1].phone"
                          :readOnly=notEdit></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        
        
        <el-form-item label='状态'
                      class="label">
          <!-- <el-input v-model="data.status"
                    :disabled="diseditable"></el-input> -->
          <el-select v-model="data[id-1].status"
                     :disabled=notEdit>
            <el-option v-for="item in status_options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
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
.edit{
  position: relative;
  float: right;
  margin: auto;
  margin-bottom: 20px;
}
</style>

<script>
/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios'
import lostTable from '../table/lost-table'
import foundTable from '../table/found-table'
// import renterApplicationTable from '../table/renter-application-table'
// import releaseApplicationTable from '../table/release-application-table'
// import receivedRentApplicationTable from '../table/received-rent-application-table'
// import rentedEquipmentTable from '../table/rented-equipment-table'
import changeButton from '../button/change-button'
import delButton from '../button/del-button'
import chat from '../chat'
export default {
  components: {
    // 'equipment-table': equipmentTable,
    // 'rent-application-table': rentApplicationTable,
    // 'renter-application-table': renterApplicationTable,
    // 'release-application-table': releaseApplicationTable,
    // 'received-rent-application-table': receivedRentApplicationTable,
    'lost-table': lostTable,
    'found-table': foundTable,
    'change-button': changeButton,
    'del-button': delButton,
    'chat-dialog': chat
  },
  props: {
    id: Number
  },
  data: function () {
    return {
      // isOwner: (this.id === this.$store.getters.getCurrentUser.id),
      // isAdmin: this.$store.getters.isAdmin,
      isAdmin: true,
      isOwner: true,
      data: [{
        id: 0,
        last_login: '2020.11.4 15:19',
        first_name: '一峰',
        last_name: '丁',
        email: '123@qq.com',
        date_joined: '2020.11.1 12:58',
        nickname: 'natedingyifeng',
        phone: '12318012345',
        status: "未认证"
      },{
        id: 1,
        last_login: '2020.11.4 15:20',
        first_name: '敬恒',
        last_name: '苏',
        email: '456@qq.com',
        date_joined: '2020.11.2 21:23',
        nickname: 'hengsoosoo',
        phone: '12132012345',
        status: "未认证"
      }],
      dialogVisible: false,
      status_options: [{
        value: 'UNA',
        label: '未通过'
      }, {
        value: 'ACC',
        label: '已通过'
      }],
      notEdit: true
    }
  },
  created: function () {
    // if (this.id === -1) return
    // axios.get('/api/v1/user/' + this.id, {
    //   headers: {
    //     Authorization: 'Token ' + this.$store.getters.getUserKey
    //   }
    // })
    //   .then((response) => {
    //     this.data = response.data
    //   })
    //   .catch((error) => {
    //     this.$alert(error.response.data)
    //   })
  },
  methods: {
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
    enterEquipment: function (row) {
      this.$router.push({ name: 'user', params: { userId: row.id } })
    },
    openDialog: function () {
      this.dialogVisible = false
      this.dialogVisible = true
    }
  }
}
</script>
