// writen by xyh
<template>
  <div>
    <el-card class="title_card"
             style="font-size:24px;">
      {{'举报信息#' + this.id }}
      <div class="edit">
        <el-button :id="id"
                        target="user"
                        class="change"
                        v-if="isAdmin"
                        @click="AcceptReport"
                        type="primary">通过</el-button>
        <el-button :id="id"
                      target="user"
                      class="change"
                      v-if="isAdmin"
                      @click="RejectReport"
                      type="primary">否决</el-button>
        <el-button :id="id"
                      target="user"
                      class="change"
                      v-if="isAdmin"
                      @click="DeleteReport"
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
              <el-input v-model="report.id"
                        disabled=false
                        style="width:100%;"></el-input>
            </el-col>
            <el-col span="7">
              <el-form-item label='创建时间'
                            class="label">
                <el-date-picker
                  v-model="report.created_at"
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
                  v-model="report.updated_at"
                  type="datetime"
                  placeholder="更新时间"
                  format="yyyy-MM-dd HH:mm:ss"
                  disabled=false>
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col span="6">
              <el-form-item label='举报人'>
                <el-input v-model="report.submit_user.username" disabled=false></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-divider>举报内容</el-divider>
        <el-form-item label='被举报人'
                      class="label">
          <el-row>
            <el-col span="4">
              <el-input v-model="report.user.username" disabled=false></el-input>
            </el-col>
            <el-col span="6">
              <el-form-item label='被举报寻物启事'
                    class="label"
                    label-width="140px">
                <el-link target="_blank" :underline="false" :disabled="!report.lost_notice" @click="enterLostNotice(report.lost_notice)">{{"寻物启事#"+report.lost_notice}}<i class="el-icon-view el-icon--right"></i></el-link>
              </el-form-item>
            </el-col>
            <el-col span="6">
              <el-form-item label='被举报失物招领'
                      class="label"
                      label-width="140px">
                <el-link target="_blank" :underline="false" :disabled="!report.found_notice" @click="enterFoundNotice(report.found_notice)">{{"寻物启事#"+report.found_notice}}<i class="el-icon-view el-icon--right"></i></el-link>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label='举报内容'
                      class="label">
          <el-input v-model="report.description"
                    type='textarea'
                    disabled=false></el-input>
        </el-form-item>
        <el-form-item label='举报内容'
                      class="label">
          <el-select v-model="report.type"
                     disabled=false>
            <el-option v-for="item in type_options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='状态'
                      class="label">
          <el-select v-model="report.verdict_type"
                     disabled=false>
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
      dialogVisible: false,
      status_options: [{
        value: 'GUI',
        label: '有罪'
      }, {
        value: 'INN',
        label: '无罪'
      }, {
        value: 'UNT',
        label: '未处理'
      }],
      notEdit: true,
      report: {},
      type_options: [{
        value: 'SCM',
        label: '诈骗行为'
      }, {
        value: 'HRS',
        label: '恶意骚扰'
      }, {
        value: 'ADV',
        label: '推销广告'
      }, {
        value: 'PRN',
        label: '低俗色情'
      }, {
        value: 'ILL',
        label: '违法信息'
      }, {
        value: 'SPM',
        label: '垃圾内容'
      }, {
        value: 'CPY',
        label: '侵权行为'
      }, {
        value: 'OTH',
        label: '其他'
      }],
      applicant: ''
    }
  },
  created: function () {
    axios.get('/reports/'+ this.id +'/', {})
    .then((response) => {
      this.report = response.data
    })
    .catch((error) => {
      alert('error:' + error)
    })
  },
  methods: {
    enterFoundNotice: function (id) {
      this.$router.push({ name: 'found', params: { foundId: id } })
      // this.$router.push({ name: 'user', params: { userId: row.id } })
    },
    enterLostNotice: function (id) {
      this.$router.push({ name: 'lost', params: { lostId: id } })
      // this.$router.push({ name: 'user', params: { userId: row.id } })
    },
    AcceptReport() {
      this.report.verdict_type = "GUI"
      axios.put('/reports/' + this.id + '/', this.report, {})
      .then((response) => {
        location.reload()
      })
      .catch((error) => {
        alert('error:' + error)
      })
    },
    RejectReport() {
      this.report.verdict_type = "INN"
      axios.put('/reports/' + this.id + '/', this.report, {})
      .then((response) => {
        location.reload()
      })
      .catch((error) => {
        alert('error:' + error)
      })
    },
    DeleteReport() {
      axios.delete('/reports/' + this.id + '/', {})
      .then((response) => {
        this.$router.push('/report-list')
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
