<template>
  <div>
    <el-card class='card'
             style="margin-top:20px;">
      <h2 style="text-align:center;">
        创建账户
      </h2>
      <el-row>
        <el-col :span="11" style="margin-left: 51px">
          <h3 style="text-align:left;">
            邮件邀请
          </h3>
          <el-form class="form"
                  label-width="130px">
            <el-form-item label='邀请邮箱(Email)'
                          class="label">
              <el-row :gutter="10">
                <el-col span="16">
                  <el-input autocomplete="off" v-model="email_invitation.email" placeholder="Send invitations through email"></el-input>
                </el-col>
                <el-col span="4">
                  <el-button :id="id"
                          :data="data"
                          target="user"
                          class="change"
                          @click="sendEmailInvitation"
                          type="primary">发送</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="11" style="margin-left: 50px">
          <h3 style="text-align:left;">
            直接创建(*为必填项)
          </h3>
          <el-form class="form"
                  label-width="136px"
                  align>
            <el-form-item label='名(First Name)' class="form-item-require-lable">
              <el-input v-model="user_data_invitation.first_name"
                        style="width:70%;"></el-input>
            </el-form-item>
            <el-form-item label='姓(Last Name)' class="form-item-require-lable">
              <el-input v-model="user_data_invitation.last_name"
                        style="width:70%;"></el-input>
            </el-form-item>
            <el-form-item label='用户名(Username)' class="form-item-require-lable">
              <el-input v-model="user_data_invitation.username"
                        style="width:70%;"></el-input>
            </el-form-item>
            <el-form-item label='密码(Password)' class="form-item-require-lable">
              <el-input v-model="user_data_invitation.password"
                        style="width:70%;"
                        show-password></el-input>
            </el-form-item>
            <el-form-item label='邮箱(Email)'>
              <el-input v-model="user_data_invitation.email"
                        style="width:70%;"></el-input>
            </el-form-item>
            <el-form-item label='电话(Phone)'>
              <el-input v-model="user_data_invitation.phone"
                        style="width:70%;"></el-input>
            </el-form-item>
            <el-form-item label='部门(Department)'>
              <el-input v-model="user_data_invitation.department"
                        style="width:70%;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="CreateUser" style="margin-left: 46.8%;">立即创建</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style lang="scss">
.form-item-require-lable {
  .el-form-item__label:before {
    content: "*";
    color: #f56c6c;
    margin-right: 0px;
    font-weight: bold;
  }
}
.form-item-normal-lable {
  .el-form-item__label:before {
    content: "";
    margin-right: 20px;
    font-weight: bold;
  }
}
</style>

<style scoped>
.el-card {
  margin-right: 15%;
  margin-left: 15%;
  margin-bottom: 5%;
}
</style>

<script>
/* eslint-disable @typescript-eslint/camelcase */

import Axios from 'axios'
export default {
  data: function () {
    return {
      email_invitation: {
        email: "",
        role: "STF"
      },
      user_data_invitation: {
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        department: "",
        status: "ACT",
        is_staff: true,
        is_active: true
      }
    }
  },
  created: function () {

  },
  methods: {
    checkPhoneValidation(phone){
      if(phone != '')
      {
        if (/^1[34578]\d{9}$/.test(phone) == false) {
          alert('error: 手机号格式错误!')
          return false
        }
      }
      return true
    },
    checkEmailValidation(email){
      if(email != '')
      {
        if (/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email) == false) {
          alert('error: 邮箱地址格式错误!')
          return false
        }
      }
      return true
    },
    CreateUser()
    {
      if(this.checkPhoneValidation(this.user_data_invitation.phone) && this.checkEmailValidation(this.user_data_invitation.email))
      {
        Axios({
          url: '/users/',
          method: 'post',
          data: this.user_data_invitation,
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
          }
        })
        .then((response) => {
          this.$message({
            type: 'success',
            message: '创建成功!'
          });
          location.reload()
        })
        .catch((error) => {
          alert('error:' + error)
        })
      }
    },
    sendEmailInvitation()
    {
      Axios({
        url: '/user-invitations/',
        method: 'post',
        data: this.email_invitation,
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
        }
      })
      .then((response) => {
        this.$message({
          type: 'success',
          message: '发送成功!'
        });
        location.reload()
      })
      .catch((error) => {
        alert('error:' + error)
      })
    }
  }
}
</script>
