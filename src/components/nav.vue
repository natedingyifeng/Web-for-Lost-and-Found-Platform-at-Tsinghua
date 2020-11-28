// writen by ms
<template>
  <div>
    <div class="line"></div>
    <el-menu :default-active="activeIndex"
             class="el-menu-demo"
             mode="horizontal"
             @select="handleSelect"
             background-color="#82318E"
             text-color="#fff"
             active-text-color="#ffd04b">
      <div class="logo"
           aria-disabled="true">
        <a href="/login">
          <h3 style="float:left;color:white;margin-left:100px;">
            紫荆寻物THU
          </h3>
        </a>
      </div>
      <el-menu-item index="1"
                    style="margin-left:30px;"
                    v-if="hasLogin === true">寻物启事列表</el-menu-item>
      <el-menu-item index="2"
                    v-if="hasLogin === true">失物招领列表</el-menu-item>
      <el-menu-item index="7"
                    v-if="hasLogin === true">用户列表</el-menu-item>
      <el-menu-item index="6"
                    v-if="hasLogin === true">认证申请</el-menu-item>
      <el-submenu index="8"
                  v-if="hasLogin === true && isAdmin === true">
        <template slot="title">添加物品</template>
        <el-menu-item index="8-1">物品种类</el-menu-item>
        <el-menu-item index="8-2">物品类别</el-menu-item>
      </el-submenu>
      <el-menu-item index="3"
                    v-if="hasLogin === true && isAdmin === true">平台信息</el-menu-item>
      <el-submenu index="4"
                  style="float:right;margin-right:100px;"
                  v-if="hasLogin">
        <template slot="title">
          <div>
            <img src="../assets/user.png"
                 style="background-color:white;width: 40px;height: 40px;border-radius: 50%;float: left;margin-top: 10px;" />
          </div>
        </template>
        <el-menu-item index="4-1">个人中心</el-menu-item>
        <el-menu-item index="4-3"
                      @click="logout">退出登录</el-menu-item>
      </el-submenu>
      <!-- <el-submenu index="5"
                  style="float:right;"
                  v-if="hasLogin">
        <template slot="title">发布申请</template>
        <el-menu-item index="5-1">申请添加设备</el-menu-item>
        <el-menu-item index="5-4">申请成为出租者</el-menu-item>
      </el-submenu> -->
      <el-menu-item style="margin-right:100px;float:right;font-size:19px;"
                    v-if="!hasLogin"><a href="/login">未登录</a></el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
</style>

<script>
import Axios from 'axios'
export default {
  data () {
    return {
      hasLogin: true,
      activeIndex: '1',
      inputSearch: '',
      select: '1',
      isAdmin: true
    }
  },
  methods: {
    handleSelect (key) {
      if (key === null) return
      console.log(key)
      switch (key) {
        case '1': {
          this.activeIndex = '1'
          this.$router.push('/lost-list')
          break
        }
        case '2': {
          this.activeIndex = '2'
          this.$router.push('/found-list')
          break
        }
        case '3': {
          this.activeIndex = '3'
          this.$router.push('/analysis')
          break
        }
        case '4-1': {
          const path = '/user/' + String(this.$store.getters.getCurrentUser.id)
          this.$router.push(path)
          break
        }
        case '5-1': {
          this.activeIndex = '5'
          this.$router.push('/create-equipment')
          break
        }
        case '5-4': {
          this.activeIndex = '5'
          this.$router.push('/create-renter-application')
          break
        }
        case '6': {
          this.activeIndex = '6'
          this.$router.push('/certification-application-list')
          break
        }
        case '7': {
          this.activeIndex = '7'
          this.$router.push('/user-list')
          break
        }
        case '8-1': {
          this.activeIndex = '8'
          this.$router.push('/property-types-list')
          break
        }
        case '8-2': {
          this.activeIndex = '8'
          this.$router.push('/property-templates-list')
          break
        }
      }
    },
    goRouter (path) {
      this.$router.go(path)
    },
    logout () {
      // console.log('logout')
      // console.log(this.$store.getters.getUserKey)
      Axios({
        url: '/api/v1/rest-auth/logout/',
        method: 'post',
        headers: {
          Authorization: 'Token ' + this.$store.getters.getUserKey
        }
      })
        .then(() => {
          this.$store.commit('resetState')
          this.$router.push('/login')
          location.reload()
          // console.log(this.$store.getters.getUserKey)
        })
        .catch((error) => {
          // this.$alert(error.response.statusText, '登出失败！')
          this.$store.commit('resetState')
          // location.reload()
          this.$router.push('/login')
          console.log(error.request)
          this.$alert(error.response.data)
        })
    },
    search () {
      console.log('search')
      console.log(this.select)
      console.log(this.inputSearch)
    }
  },
  mounted () {
    if (this.$store.getters.getUserKey !== 'null') {
      this.hasLogin = true
      this.isAdmin = this.$store.getters.isAdmin
    }
  }
}
</script>
<style scoped>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
