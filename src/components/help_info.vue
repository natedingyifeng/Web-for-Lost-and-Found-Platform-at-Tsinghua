<template>
  <div>
    <el-card class='card'
             style="margin-top:20px;">
      <h2 style="text-align:center;">
        紫荆寻物THU网页端使用指南
      </h2>
      <p style="text-indent:2em;">
        紫荆寻物THU是面向清华师生的一款失物招领&寻物启事发布平台，致力于为清华师生提供一个更好的寻物平台。紫荆寻物THU拥有网页端和小程序端两个界面，其中小程序面向的是普通用户，而网页端面向的是管理员。本使用指南将指导平台管理者使用紫荆寻物THU网页端对平台进行管理。
      </p>
      <p style="text-indent:2em;">
        紫荆寻物THU是面向清华师生的一款失物招领&寻物启事发布平台，致力于为清华师生提供一个更好的寻物平台。
      </p>
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
  props: {
    token: String
  },
  data: function () {
    return {

    }
  },
  created: function () {
    
  },
  methods: {
    
  }
}
</script>
