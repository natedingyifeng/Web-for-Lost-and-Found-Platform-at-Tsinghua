<template>
  <div>
    <el-card class='card'
             style="margin-top:50px;">
      <h2 style="text-align:center;">
        创建账户
      </h2>
      <h3 style="text-align:left;">
        邮件邀请
      </h3>
      <el-form class="form"
               label-width="100px">
        <el-form-item label='邀请邮箱'
                      class="label">
          
        </el-form-item>
      </el-form>
      <h3 style="text-align:left;">
        直接创建
      </h3>
    </el-card>
    <div>
    </div>
  </div>
</template>

<style scoped>
.el-card {
  margin-right: 10%;
  margin-left: 10%;
  margin-bottom: 5%;
}
.el-progress {
  margin-top: 5%;
  margin-right: 10%;
  margin-left: 10%;
}
</style>

<script>
/* eslint-disable @typescript-eslint/camelcase */

import Axios from 'axios'
export default {
  data: function () {
    return {
      email_invation: ''
    }
  },
  created: function () {

  },
  methods: {

  }
}
</script>
