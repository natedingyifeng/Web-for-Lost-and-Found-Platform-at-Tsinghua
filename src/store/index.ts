import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // userId: null, // 用户id
    // userEmail: null, // 用户email
    userAccessToken: null, // 用户key
    userRefreshToken: null, // 用户key
    userId: -1,
    userAvatar: null,
    navIndex: 0,
    hasLogin: false,
    trytoLogout: false,
    isAdmin: false,
    user: {
    }
    // hasLogin: false, // 登录状态
    // showLogin: false, // 显示/隐藏 登录/注册框
    // showLoginBtn: true, // 显示/隐藏 header登录/注册按钮
    // isOverdue: false // 是否登录过期
  },
  mutations: {
    setUserToken (state, token) {
      state.userAccessToken = token.access
      state.userRefreshToken = token.refresh
      localStorage.userAccessToken = token.access
      localStorage.userRefreshToken = token.refresh
    },
    setUserLoginStatus (state, status) {
      state.hasLogin = status
      localStorage.hasLogin = status
    },
    setUserLogoutStatus (state, status) {
      state.trytoLogout = status
      localStorage.trytoLogout = status
    },
    setUserId (state, id) {
      state.userId = id
      localStorage.userId = id
    },
    setUserIsAdmin (state, isAdmin) {
      state.isAdmin = isAdmin
      localStorage.isAdmin = isAdmin
    },
    setUserAvatar (state, url) {
      state.userAvatar = url
      localStorage.userAvatar = url
    },
    setNavIndex (state, index){
      state.navIndex = index
      localStorage.navIndex = index
    },
    // setCurrentUser (state, payload) {
    //   state.user = payload.user
    //   localStorage.user = JSON.stringify(payload.user)
    //   state.isAdmin = payload.isAdmin
    //   localStorage.isAdmin = payload.isAdmin
    // },
    resetState (state) {
      state.userAccessToken = null // 用户key
      state.userRefreshToken = null // 用户key
      state.userAvatar = null
      state.navIndex = 0
      state.userId = -1
      state.hasLogin = false
      state.trytoLogout = false
      state.isAdmin = false
      state.user = {}
      localStorage.user = JSON.stringify({})
      localStorage.userAccessToken = null // 用户key
      localStorage.userRefreshToken = null // 用户key
      localStorage.navIndex = 0
      localStorage.hasLogin = false
      localStorage.trytoLogout = false
      localStorage.userId = -1
      localStorage.userAvatar = null
      localStorage.isAdmin = false
    }
  },
  actions: {
  },
  modules: {

  },
  getters: {
    getUserId (state) {
      if (localStorage.userId) {
        state.userId = localStorage.userId
      }
      return state.userId
    },
    getUserIsAdmin (state) {
      if (localStorage.isAdmin) {
        state.isAdmin = localStorage.isAdmin
      }
      return state.isAdmin
    },
    getUserAvatar (state) {
      if (localStorage.userAvatar) {
        state.userAvatar = localStorage.userAvatar
      }
      return state.userAvatar
    },
    getUserAccessToken (state) {
      if (localStorage.userAccessToken) {
        state.userAccessToken = localStorage.userAccessToken
      }
      return state.userAccessToken
    },
    getUserRefreshToken (state) {
      if (localStorage.userAccessToken) {
        state.userRefreshToken = localStorage.userRefreshToken
      }
      return state.userRefreshToken
    },
    getUserLoginStatus (state) {
      if (localStorage.hasLogin) {
        state.hasLogin = localStorage.hasLogin
      }
      return state.hasLogin
    },
    getUserLogoutStatus (state) {
      if (localStorage.trytoLogout) {
        state.trytoLogout = localStorage.trytoLogout
      }
      return state.trytoLogout
    },
    getNavIndex (state) {
      if (localStorage.navIndex) {
        state.navIndex = localStorage.navIndex
      }
      return state.navIndex
    }
    // getCurrentUser (state) {
    //   if (localStorage.user) {
    //     state.user = JSON.parse(localStorage.user)
    //   }
    //   return state.user
    // },
    // isAdmin (state) {
    //   if (localStorage.isAdmin) {
    //     state.isAdmin = localStorage.isAdmin === 'true'
    //   }
    //   return state.isAdmin
    // }
  }
})
