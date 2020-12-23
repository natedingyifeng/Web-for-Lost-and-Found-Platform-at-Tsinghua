// writen by xyh
<template>
  <div>
    <el-card class="title_card"
             style="font-size:24px;">
      {{'认证申请#' + this.id }}
      <div class="edit">
        <el-button :id="id"
                        target="user"
                        class="change"
                        v-if="isAdmin"
                        @click="AcceptApplication"
                        type="primary">通过</el-button>
        <el-button :id="id"
                      target="user"
                      class="change"
                      v-if="isAdmin"
                      @click="RejectApplication"
                      type="primary">否决</el-button>
        <el-button :id="id"
                      target="user"
                      class="change"
                      v-if="isAdmin"
                      @click="DeleteApplication"
                      type="danger">删除</el-button>
      </div>
    </el-card>
    <el-card class='card'>
      <el-form class="form"
               label-width="100px">
        <el-divider>基本信息</el-divider>
        <el-form-item label='ID'>
          <el-row>
            <el-col span="4">
              <el-input v-model="verification_application.id"
                        disabled=false
                        style="width:100%;"></el-input>
            </el-col>
            <el-col span="7">
              <el-form-item label='创建时间'
                            class="label">
                <el-date-picker
                  v-model="verification_application.created_at"
                  type="datetime"
                  placeholder="创建时间"
                  format="yyyy-MM-dd HH:mm:ss"
                  disabled=false>
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col span="7">
              <el-form-item label='最近更新'
                            class="label">
                <el-date-picker
                  v-model="verification_application.updated_at"
                  type="datetime"
                  placeholder="更新时间"
                  format="yyyy-MM-dd HH:mm:ss"
                  disabled=false>
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col span="6">
              <el-form-item label='申请人'>
                <el-input v-model="applicant" disabled=false></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-divider>申请内容</el-divider>
        <el-form-item label='申请内容'
                      class="label">
          <el-input v-model="verification_application.description"
                    type='textarea'
                    disabled=false></el-input>
        </el-form-item>
        <el-form-item label='申请附件'
                      class="label">
          <el-link :href="verification_application.supporting_document" target="_blank" :underline="false" :disabled="!verification_application.supporting_document">查看<i class="el-icon-view el-icon--right"></i></el-link>
        </el-form-item>
        <el-form-item label='状态'
                      class="label">
          <!-- <el-input v-model="data.status"
                    :disabled="diseditable"></el-input> -->
          <el-select v-model="verification_application.status"
                     disabled=false>
            <el-option v-for="item in applications_status_options"
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
      dialogVisible: false,
      status_options: [{
        value: 'UNA',
        label: '未通过'
      }, {
        value: 'ACC',
        label: '已通过'
      }],
      notEdit: true,
      verification_application: {},
      applications_status_options: [{
        value: 'ACC',
        label: '通过'
      }, {
        value: 'REJ',
        label: '拒绝'
      }, {
        value: 'TBD',
        label: '未处理'
      }],
      applicant: ''
    }
  },
  created: function () {
    axios.get('/user-verification-applications/'+ this.id +'/', {
      headers: {
        Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
      }
    })
    .then((response) => {
      this.verification_application = response.data
      this.getUserName(this.verification_application.user)
    })
    .catch((error) => {
      alert('error:' + error)
    })
  },
  methods: {
    AcceptApplication() {
      this.verification_application.status = "ACC"
      axios.put('/user-verification-applications/' + this.id + '/', this.verification_application, {
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
        }
      })
      .then((response) => {
        location.reload()
      })
      .catch((error) => {
        alert('error:' + error)
      })
    },
    RejectApplication() {
      this.verification_application.status = "REJ"
      axios.put('/user-verification-applications/' + this.id + '/', this.verification_application, {
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
        }
      })
      .then((response) => {
        location.reload()
      })
      .catch((error) => {
        alert('error:' + error)
      })
    },
    DeleteApplication() {
      axios.delete('/user-verification-applications/' + this.id + '/', {
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
        }
      })
      .then((response) => {
        this.$router.push('/certification-application-list')
      })
      .catch((error) => {
        alert('error:' + error)
      })
    },
    getUserName(id) {
      axios.get('/users/' + id + '/', {
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
        }
      })
      .then((response) => {
        this.applicant = response.data.username
      })
      .catch((error) => {
        alert('error:' + error)
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
