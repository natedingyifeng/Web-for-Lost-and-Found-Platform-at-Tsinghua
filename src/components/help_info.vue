<template>
  <div>
    <el-card class='card'
             style="margin-top:20px;">
      <h2 style="text-align:center;">
        使用帮助
      </h2>
      
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
