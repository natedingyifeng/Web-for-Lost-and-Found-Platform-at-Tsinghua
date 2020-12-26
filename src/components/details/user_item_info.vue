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
                        :disabled="!notEdit"
                        type="primary">修改</el-button>
        <el-button :id="id"
                      :data="data"
                      target="user"
                      class="change"
                      v-if="isAdmin"
                      @click="confirm"
                      :disabled="notEdit"
                      type="primary">确定</el-button>
        <el-button :id="id"
                    :data="data"
                    target="user"
                    class="change"
                    v-if="isAdmin"
                    @click="block_dialogFormVisible=true"
                    type="danger">封禁</el-button>
        <el-button :id="id"
                      target="user"
                      class="change"
                      v-if="isAdmin"
                      @click="DeleteUserConfirm"
                      type="danger">删除</el-button>
      </div>
    </el-card>
    <el-dialog class="new_type" title="封禁原因" :visible.sync="block_dialogFormVisible">
      <el-form label-width="100px">
        <el-form-item label="封禁原因">
          <el-input autocomplete="off" v-model="block_content" type='textarea'></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="foot">
          <el-button @click="block_dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="blockUserConfirm">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-card class='card'>
      <el-form class="form"
               label-width="100px">
        <el-divider>账户信息</el-divider>
        <el-form-item label='ID'>
          <el-row>
            <el-col :span="2">
              <el-input v-model="id"
                        :disabled="true"
                        style="width:100%;"></el-input>
            </el-col>
            <el-col :span="7">
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
            <el-col :span="7">
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
            <el-col :span="8">
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
            <el-col :span="10">
              姓
              <el-input v-model="user_data.last_name"
                        style="width:35%;"
                        :disabled=notEdit></el-input>
              名
              <el-input v-model="user_data.first_name"
                        :disabled=notEdit
                        style="width:35%;"></el-input>
            </el-col>
            <el-col :span="6">
              <el-form-item label='昵称'>
                <el-input v-model="user_data.username"
                          :disabled=notEdit></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label='用户状态'>
                <el-checkbox v-model="user_data.is_active" :disabled=notEdit>活跃中</el-checkbox>
                <el-checkbox v-model="user_data.is_verified" :disabled=notEdit>已认证</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label='Email'>
          <el-row>
            <el-col :span="5">
              <el-input v-model="user_data.email"
                        :disabled=notEdit></el-input>
            </el-col>
            <el-col :span="5">
              <el-form-item label='电话号码'>
                <el-input v-model="user_data.phone"
                          :disabled=notEdit></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label='微信id'>
                <el-input v-model="user_data.wechat_id"
                          :disabled=notEdit></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
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
        <el-form-item label='图片'
                      class="label">
          <div style="text-align: initial;margin-top: 20px;">
            <el-upload
              :class="{is_hidden:upload_show}"
              action="none"
              :on-preview="handleUserImagePreview"
              :before-remove="handleUserImageRemoveConfirm"
              :auto-upload="false"
              :limit="1"
              :on-exceed="handleExceed"
              list-type="picture-card"
              :file-list="user_images_urls"
              :on-change="saveImage"
              :disabled=notEdit>
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="user_image_visible">
              <img width="100%" :src="user_image_url" alt="">
            </el-dialog>
          </div>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-divider>失物招领</el-divider>
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in foundList.results"
                :key="index"
                :timestamp="activity.created_at">
                <el-link target="_blank" @click="enterFoundNotice(activity.id)">{{"发布失物招领: "+activity.property.name}}</el-link>
              </el-timeline-item>
            </el-timeline>
          </el-col>
          <el-col :span="12">
            <el-divider>寻物启事</el-divider>
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in lostList.results"
                :key="index"
                :timestamp="activity.created_at">
                <el-link target="_blank" @click="enterLostNotice(activity.id)">{{"发布寻物启事: "+activity.property.name}}</el-link>
              </el-timeline-item>
            </el-timeline>
          </el-col>
        </el-row>
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
.is_hidden .el-upload--picture-card{
  display:none;
}
</style>

<script>
/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios'
import lostTable from '../table/lost-table'
import foundTable from '../table/found-table'
import changeButton from '../button/change-button'
import delButton from '../button/del-button'
export default {
  components: {
    'lost-table': lostTable,
    'found-table': foundTable,
    'change-button': changeButton,
    'del-button': delButton,
  },
  props: {
    id: Number
  },
  data: function () {
    return {
      // isOwner: (this.id === this.$store.getters.getCurrentUser.id),
      // isAdmin: this.$store.getters.isAdmin,
      block_dialogFormVisible: false,
      block_content: '',
      isAdmin: true,
      isOwner: true,
      user_data: [],
      user_origin: [],
      foundList: [],
      lostList: [],
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
      Status: {
        PUB: "公开中",
        RET: "已归还",
        CLS: "已关闭",
        DFT: "草稿中"
      },
      notEdit: true,
      user_image_visible: false,
      user_image_url: '',
      user_images: [],
      user_images_urls: [],
      upload_show:false,
      user_image_change: false,
    }
  },
  created: function () {
    axios.get('/users/'+this.id+'/', {
      headers: {
        Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
      }
    })
      .then((response) => {
          this.user_data = response.data
          this.user_origin = response.data
          let joined_datetime = this.user_data.date_joined
          if(this.user_data.wechat_avatar == null)
          {
            this.upload_show = false
            this.user_images_urls = []
            this.user_images = {}
          }
          else
          {
            this.upload_show = true
            this.user_images_urls.push({url: this.user_data.wechat_avatar})
            this.user_images = {url: this.user_data.wechat_avatar}
          }
      })
      .catch((error) => {
        alert('error:' + error)
      })
    axios.get('/found-notices/', {
        params: {
          author__id: this.id
        }
      })
        .then((response) => {
          this.foundList = response.data
          for(var i=0;i<this.foundList.results.length;i++)
          {
            let found_datetime = this.foundList.results[i].found_datetime
            let created_at = this.foundList.results[i].created_at
            let updated_at = this.foundList.results[i].updated_at
            this.foundList.results[i].found_datetime=this.extractTime(found_datetime)
            this.foundList.results[i].created_at=this.extractTime(created_at)
            this.foundList.results[i].updated_at=this.extractTime(updated_at)
            this.foundList.results[i].status = this.Status[this.foundList.results[i].status]
          }
        }).catch((error) => {
          this.$alert(error.response.data)
        })
    axios.get('/lost-notices/', {
        params: {
          author__id: this.id
        }
      })
        .then((response) => {
          this.lostList = response.data
          for(var i=0;i<this.lostList.results.length;i++)
          {
            let lost_datetime = this.lostList.results[i].lost_datetime
            let created_at = this.lostList.results[i].created_at
            let updated_at = this.lostList.results[i].updated_at
            this.lostList.results[i].lost_datetime=this.extractTime(lost_datetime)
            this.lostList.results[i].created_at=this.extractTime(created_at)
            this.lostList.results[i].updated_at=this.extractTime(updated_at)
            this.lostList.results[i].status = this.Status[this.lostList.results[i].status]
          }
        }).catch((error) => {
          this.$alert(error.response.data)
        })
  },
  methods: {
    handleUserImagePreview(file) {
      this.user_image_url = file.url
      this.user_image_visible = true
    },
    handleUserImageRemove(file) {
      let index = -1
      let data=new FormData();
      let that=this
      data.append('url', this.user_images_urls[0].url)
      data.append('id', this.user_data.id)
      this.user_images = {}
      this.user_images_urls = []
      this.upload_show = false
      this.imageUserDeleteUpdate()
    },
    imageUserDeleteUpdate(){
      this.user_data.wechat_avatar = null
      this.user_origin.wechat_avatar = null
      axios.put('/users/'+this.id+'/', this.user_origin, {
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
        }
      })
        .then((response) => {
          this.upload_show = false
        })
        .catch((error) => {
          this.$alert(error.response.data)
        })
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
    },
    imageNoticeAddUpdate(){
      this.user_data.wechat_avatar = this.user_images_urls[0].url
      this.user_origin.images = this.user_images_urls[0].url
      axios.put('/users/'+this.id+'/', this.user_origin, {
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
        }
      })
        .then((response) => {
          this.upload_show = true
        })
        .catch((error) => {
          this.$alert(error.response.data)
        })
      this.$message({
        type: 'success',
        message: '添加成功!'
      });
    },
    handleUserImageRemoveConfirm(file) {
      this.$confirm('此操作将删除该图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleUserImageRemove(file)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      return false
    },
    saveImage(file,fileList) {
      this.user_images = file.raw
      this.user_image_change = true
      let data=new FormData();
      data.append(file.name, file.raw)
      data.append('id', this.user_data.id)
      axios({
        url: '/users/upload-avatar/',
        method: 'post',
        data: data,
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
        }
      })
        .then((response) => {
          this.upload_show = true
          this.user_images_urls = [{url:response.data.url[0]}]
          this.imageNoticeAddUpdate()
        })
        .catch((error) => {
          alert('error:' + error)
        })
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    DeleteUser() {
      axios.delete('/users/' + this.id + '/', {
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
        }
      })
      .then((response) => {
        this.$router.push('/user-list')
      })
      .catch((error) => {
        alert('error:' + error)
      })
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
    },
    DeleteUserConfirm() {
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.DeleteUser()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      return false
    },
    blockUserConfirm() {
      this.$confirm('此操作将封禁该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.blockUser()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消封禁'
          });          
        });
      return false
    },
    blockUser(){
      this.user_data.status="SUS"
      this.user_data.suspended_reason = this.block_content
      axios.put('/users/'+this.id+'/', this.user_data, {
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
        }
      })
        .then((response) => {
          location.reload()
        })
        .catch((error) => {
          this.$alert(error.response.data)
        })
      this.$message('修改成功')
      this.notEdit=true
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
      this.notEdit=false
    },
    confirm: function () {
      axios.put('/users/'+this.id+'/', this.user_data, {
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
        }
      })
        .then((response) => {
          location.reload()
        })
        .catch((error) => {
          this.$alert(error.response.data)
        })
      this.$message('修改成功')
      this.notEdit=true
    },
    enterFoundNotice: function (id) {
      this.$router.push({ name: 'found', params: { foundId: id } })
      // this.$router.push({ name: 'user', params: { userId: row.id } })
    },
    enterLostNotice: function (id) {
      this.$router.push({ name: 'lost', params: { lostId: id } })
      // this.$router.push({ name: 'user', params: { userId: row.id } })
    },
    openDialog: function () {
      this.dialogVisible = false
      this.dialogVisible = true
    }
  }
}
</script>
