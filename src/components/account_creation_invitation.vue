<template>
  <div>
    <el-card class='card'
             style="margin-top:20px;">
      <h2 style="text-align:center;">
        创建账户
      </h2>
      <el-form class="form"
               label-width="136px"
               align>
        <el-form-item label='名(First Name)' class="form-item-require-lable">
          <el-input v-model="user_data_invitation.first_name"
                    style="width:30%;"></el-input>
        </el-form-item>
        <el-form-item label='姓(Last Name)' class="form-item-require-lable">
          <el-input v-model="user_data_invitation.last_name"
                    style="width:30%;"></el-input>
        </el-form-item>
        <el-form-item label='用户名(Username)' class="form-item-require-lable">
          <el-input v-model="user_data_invitation.username"
                    style="width:30%;"></el-input>
        </el-form-item>
        <el-form-item label='密码(Password)' class="form-item-require-lable">
          <el-input v-model="user_data_invitation.password"
                    style="width:30%;"
                    show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="CreateUser">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div>
    </div>
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
      user_data_invitation: {
        username: "",
        password: "",
        first_name: "",
        last_name: "",
      }
    }
  },
  created: function () {

  },
  methods: {
    CreateUser()
    {
      Axios({
        url: '/users/',
        method: 'post',
        data: this.user_data_invitation
      })
      .then((response) => {
        location.reload()
      })
      .catch((error) => {
        alert('error:' + error)
      })
    },
    sendEmailInvitation()
    {
      Axios({
        url: '/user-invitations/',
        method: 'post',
        data: this.email_invitation
      })
      .then((response) => {
          // this.userList = response.data
          // for(var i=0;i<this.userList.results.length;i++)
          // {
          //   let joined_datetime = this.userList.results[i].date_joined
          //   this.userList.results[i].date_joined=this.extractTime(joined_datetime)
          //   this.userList.results[i].status = this.Status[this.userList.results[i].status]
          // }
          // console.log(this.property_type_list.results)
      })
      .catch((error) => {
        alert('error:' + error)
      })
    }
  }
}
</script>
