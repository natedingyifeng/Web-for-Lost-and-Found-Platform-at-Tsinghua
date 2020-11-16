// writen by xyh
<template>
  <div class = "info">
    <el-card class="title_card"
             style="font-size:24px;">
      {{'失物招领#' + id }}
      <div class="edit">
        <el-button :id="id"
                      :data="rent_data"
                      target="rent-application"
                      class="change"
                      v-if="isAdmin"
                      @click="change"
                      type="primary">修改</el-button>
        <el-button :id="id"
                      :data="rent_data"
                      target="rent-application"
                      class="change"
                      v-if="isAdmin"
                      @click="confirm"
                      type="primary">确定</el-button>
        <del-button :id="id"
                    class="delete"
                    target="rent-application"
                    v-if="isAdmin"></del-button>
      </div>
    </el-card>
    <el-card class='card'>
      <el-form class="form"
               label-width="100px">
        <el-divider>启事信息</el-divider>
        <el-form-item label="ID">
          <el-row>
            <el-col span="5">
              <el-input v-model="id"
                          :disabled="true"></el-input>
            </el-col>
            <el-col span="8">
              <el-form-item label='创建者ID'>
                <el-input v-model="lost_data[id-1].created_by"
                          :disabled="true"
                          style="width:100%;"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label='创建时间'>
              <el-input v-model="lost_data[id-1].created_at"
                        :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="3">
              <el-form-item>
                  <el-button type='primary'
                            @click="enterUser(lost_data[id-1].created_by)"
                            style="margin-left:20px;">查看创建者</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-divider>物品信息</el-divider>
        <el-form-item label='拾取物品种类'
                      class="label">
          <el-row>
            <el-col span="7">
              <el-input v-model="lost_data[id-1].lost_item_type"
                        :readOnly=notEdit></el-input>
            </el-col>
            <el-col span="10" :offset="1">
              <el-form-item label='拾取物品名称'
                            class="label">
                <el-input v-model="lost_data[id-1].lost_item_name"
                          :readOnly=notEdit></el-input>
              </el-form-item>
            </el-col>
            <el-col span="6">
              <el-form-item label='拾取者'
                            class="label">
                <el-input v-model="lost_data[id-1].lost_man"
                          :readOnly=notEdit></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label='拾取时间'
                      class="label">
          <el-row>
            <el-col span="11">
              <el-time-select
                placeholder="起始时间"
                v-model="startTime"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30'
                }">
              </el-time-select>
              <el-time-select
                placeholder="结束时间"
                v-model="endTime"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30',
                  minTime: startTime
                }">
              </el-time-select>
            </el-col>
            <el-col span="13">
              <el-form-item label='拾取地点'
                            class="label">
                <el-input v-model="lost_data[id-1].lost_place"
                          :readOnly=notEdit></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label='详情描述'
                      class="label">
          <el-input v-model="lost_data[id-1].lost_description"
                    type='textarea'
                    :readOnly=notEdit></el-input>
        </el-form-item>
        <el-form-item label='标签'
                      class="label">
          <el-tag v-for="item in lost_data[id-1].lost_tags" 
                  closable
                  :disable-transitions="false"
                  :key="item" 
                  @close="handleClose(item)">{{item.content}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
            style="width:10%;"></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-form-item>
        <el-form-item label='状态'
                      class="label">
          <!-- <el-input v-model="data.status"
                    :disabled="diseditable"></el-input> -->
          <el-select v-model="lost_data[id-1].lost_status"
                     :disabled=notEdit>
            <el-option v-for="item in status_options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='图片'
                      class="label"
                      overflow=scroll>
          <!-- <el-scrollbar wrapClass="yf-container"
                        viewClass="yf-content"
                        wrap-class="default-scrollbar__wrap" 
                        view-class="default-scrollbar__view"> -->
            <el-row :gutter="10">
              <el-col v-for="url in lost_data[id-1].lost_urls" :key="url" span="7">
                <el-image :key="url" :src="url" :preview-src-list="lost_data[id-1].lost_urls" fit="scale-down" lazy ></el-image>
              </el-col>
            </el-row>
          <!-- </el-scrollbar> -->
        </el-form-item>
        <el-divider>联系方式</el-divider>
        <el-form-item v-for="item in lost_data[id-1].lost_contact_info" :key="item.type" :label="item.type" class="label">
          <el-input v-model="item.content"
                    :readOnly=notEdit></el-input>
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
.label{
  position: relative;
}
.edit{
  position: relative;
  float: right;
  margin: auto;
  margin-bottom: 20px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

<script>
/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios'
import changeButton from '../button/change-button'
import rejButton from '../button/rej-button'
import approveButton from '../button/approve-button'
import delButton from '../button/del-button'
export default {
  components: {
    'change-button': changeButton,
    'rej-button': rejButton,
    'approve-button': approveButton,

    'del-button': delButton
  },
  props: {
    id: Number
  },
  data: function () {
    return {
      lost_data: [{
        created_at: '2020.11.1 12:58',
        created_by: '1',
        lost_item_type: '耳机',
        lost_item_name: 'Airpods Pro',
        lost_description: '今天我在六教捡到了一对Airpods Pro耳机，请失主看到后与我联系，取回失物。',
        lost_time: '10月31日晚上八点左右',
        lost_man: '丁一峰',
        lost_place: '第六教学楼',
        lost_status: '未归还',
        lost_tags: [{
          type: "color",
          content: "白色"
        }, {
          type: "characteristic",
          content: "没有壳子"
        }],
        lost_urls: [
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604477010511&di=c08bd38506c9a8d75d89d1fc87776242&imgtype=0&src=http%3A%2F%2Fp2.ifengimg.com%2Fa%2F2016_53%2F2010c7bb043d507_size34_w700_h467.jpg',
          'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3105500193,4070100373&fm=26&gp=0.jpg',
          'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=252475654,1044743506&fm=26&gp=0.jpg'
        ],
        lost_contact_info: [{
          type: "QQ",
          content: "89035689"
        }, {
          type: "email",
          content: "89035689@qq.com"
        }, {
          type: "微信",
          content: "yifeng_ding"
        }, {
          type: "phone",
          content: "18611362038"
        }]
      },
      {
        created_at: '2020.11.2 21:23',
        created_by: '2',
        lost_item_type: '电脑',
        lost_item_name: 'Macbook Pro',
        lost_description: '今天我在清华学堂捡到了一台mac笔记本，请失主看到后与我联系，取回失物。',
        lost_time: '11月2日上午十点左右',
        lost_man: '苏敬恒',
        lost_place: '清华学堂',
        lost_status: '未归还',
        lost_tags: [{
          type: "color",
          content: "宇宙灰"
        }, {
          type: "characteristic",
          content: "有一个套子"
        }],
        lost_urls: [
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604477073121&di=adc2a6c94b6609364d0b67ffe6ecf2ff&imgtype=0&src=http%3A%2F%2Fpic8.58cdn.com.cn%2Fzhuanzh%2Fn_v2bd1411791bf04d76aaddd6703a59ff60.jpg%3Fw%3D750%26h%3D0',
          'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1612119353,819905212&fm=26&gp=0.jpg'
        ],
        lost_contact_info: [{
          type: "QQ",
          content: "2416918200"
        }, {
          type: "email",
          content: "2416918200@qq.com"
        }, {
          type: "微信",
          content: "jingheng_su"
        }, {
          type: "phone",
          content: "18563892038"
        }]
      }],
      status_options: [{
        value: 'UNA',
        label: '未归还'
      }, {
        value: 'ACC',
        label: '已归还'
      }],
      // eslint-disable-next-line eqeqeq
      isrenter: false,
      // eslint-disable-next-line eqeqeq
      isborrower: false,
      isAdmin: true,
      notEdit: true,
      inputVisible: false,
      inputValue: ''
      // isAdmin: this.$store.getters.isAdmin
    }
  },
  created: function () {
    // axios.get('/api/v1/rent-application/' + this.id, {
    //   headers: {
    //     Authorization: 'Token ' + this.$store.getters.getUserKey
    //   }
    // })
    //   .then((response) => {
    //     this.rent_data = response.data
    //     this.isrenter = this.rent_data.renter === this.$store.getters.getCurrentUser.id
    //     this.isborrower = this.rent_data.borrower === this.$store.getters.getCurrentUser.id
    //     console.log(this.isborrower)
    //   })
    //   .catch((error) => {
    //     this.$alert(error.response.data)
    //   })
  },
  methods: {
    handleClose(tag) {
      this.lost_data[this.id-1].lost_tags.splice(this.lost_data[this.id-1].lost_tags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.lost_data[this.id-1].lost_tags.push({type: inputValue, content: inputValue});
      }
      this.inputVisible = false;
      this.inputValue = '';
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
    enterEquipment: function (id) {
      this.$router.push({ name: 'equipment', params: { equipmentId: id } })
    },
    enterUser: function (id) {
      this.$router.push({ name: 'user', params: { userId: id } })
    }
  }
}
</script>
