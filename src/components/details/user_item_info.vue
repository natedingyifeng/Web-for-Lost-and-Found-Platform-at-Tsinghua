// writen by xyh
<template>
  <div>
    <el-card class="title_card"
             style="font-size:24px;">
      {{'用户详情#' + this.id }}
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
                 :name="user_data.last_name+' '+user_data.first_name"
                 :dialogVisible.sync="dialogVisible"></chat-dialog>
    <el-card class='card'>
      <el-form class="form"
               label-width="100px">
        <el-divider>账户信息</el-divider>
        <el-form-item label='ID'>
          <el-row>
            <el-col span="2">
              <el-input v-model="id"
                        :disabled="true"
                        style="width:100%;"></el-input>
            </el-col>
            <el-col span="7">
              <el-form-item label='创建时间'
                            class="label">
                <el-date-picker
                  v-model="user_data.date_joined"
                  type="datetime"
                  :disabled=notEdit
                  placeholder="创建时间"
                  format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col span="7">
              <el-form-item label='上次登陆'
                            class="label">
                <el-date-picker
                  v-model="user_data.last_login"
                  type="datetime"
                  :disabled=notEdit
                  placeholder="上次登陆"
                  format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label='用户身份'
                            class="label">
                <el-checkbox v-model="user_data.is_superuser" :disabled=notEdit>超级用户</el-checkbox>
                <el-checkbox v-model="user_data.is_staff" :disabled=notEdit>员工</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-divider>用户信息</el-divider>
        <el-form-item label='姓名'>
          <el-row>
            <el-col span="10">
              姓
              <el-input v-model="user_data.last_name"
                        style="width:35%;"
                        :disabled=notEdit></el-input>
              名
              <el-input v-model="user_data.first_name"
                        :disabled=notEdit
                        style="width:35%;"></el-input>
            </el-col>
            <el-col span="6">
              <el-form-item label='昵称'>
                <el-input v-model="user_data.username"
                          :disabled=notEdit></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label='用户状态'>
                <el-checkbox v-model="user_data.is_active" :disabled=notEdit>活跃中</el-checkbox>
                <el-checkbox v-model="user_data.is_verified" :disabled=notEdit>已认证</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label='Email'>
          <el-row>
            <el-col span="5">
              <el-input v-model="user_data.email"
                        :disabled=notEdit></el-input>
            </el-col>
            <el-col span="5">
              <el-form-item label='电话号码'>
                <el-input v-model="user_data.phone"
                          :disabled=notEdit></el-input>
              </el-form-item>
            </el-col>
            <el-col span="7">
              <el-form-item label='微信id'>
                <el-input v-model="user_data.wechat_id"
                          :disabled=notEdit></el-input>
              </el-form-item>
            </el-col>
            <el-col span="7">
              <el-form-item label='学生证号'>
                <el-input v-model="user_data.student_id"
                          :disabled=notEdit></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        
        
        <el-form-item label='状态'
                      class="label">
          <!-- <el-input v-model="data.status"
                    :disabled="diseditable"></el-input> -->
          <el-select v-model="user_data.status"
                     :disabled=notEdit>
            <el-option v-for="item in status_options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-divider>全部发帖</el-divider>
        <!-- <el-form-item label='全部发帖'> -->
          <el-collapse accordion>
            <el-collapse-item title="失物招领"
                              name="1">
              <lost-table :id="id"
                          :pageSize=5
                          :height=400></lost-table>
            </el-collapse-item>
            <el-collapse-item title="寻物启事"
                              name="2">
              <found-table :id="id"
                           :pageSize=5
                           :height=400></found-table>
            </el-collapse-item>
          </el-collapse>
        <!-- </el-form-item> -->
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
      user_data: [],
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
        value: 'ACT',
        label: '活跃中'
      }, {
        value: 'INA',
        label: '不活跃'
      }, {
        value: 'SUS',
        label: '已禁用'
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
    axios.get('/users/'+this.id, {})
      .then((response) => {
          this.user_data = response.data
          let joined_datetime = this.user_data.date_joined
          // this.user_data.date_joined=this.extractTime(joined_datetime)
          //console.log(this.property_template_list.results[id-1])
          //console.log(this.found_notice)
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
      // this.$set(this.found_notice, "found_datetime", this.found_notice_found_datetime)
      axios.put('/users/'+this.id+'/', this.user_data, {})
        .then((response) => {
          location.reload()
        })
        .catch((error) => {
          this.$alert(error.response.data)
        })
      this.$message('修改成功')
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
