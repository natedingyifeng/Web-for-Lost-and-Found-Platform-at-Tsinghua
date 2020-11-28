// writen by xyh
<template>
  <div class = "info">
    <el-card class="title_card"
             style="font-size:24px;">
      {{'失物招领#' + this.id }}
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
        <el-form-item label='ID'>
          <el-row>
            <el-col span="5">
              <el-input v-model="id"
                          :disabled="true"></el-input>
            </el-col>
            <el-col span="8">
              <el-form-item label='创建者姓名'>
                <el-input v-model="found_notice.author.username"
                          :disabled="true"
                          style="width:100%;"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label='创建时间'>
              <el-input v-model="found_notice.created_at"
                          :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="3">
              <el-form-item>
                <el-button type='primary'
                          @click="enterUser(rent_data.renter)"
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
              <el-input v-model="found_notice.property.template"
                        :readOnly=notEdit></el-input>
            </el-col>
            <el-col span="10" :offset="1">
              <el-form-item label='拾取物品名称'
                            class="label">
                <el-input v-model="found_notice.property.name"
                          :readOnly=notEdit></el-input>
              </el-form-item>
            </el-col>
            <el-col span="6">
              <el-form-item label='拾取者'
                            class="label">
                <el-input v-model="found_notice.author.username"
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
                placeholder="拾取时间"
                v-model="found_notice.found_datetime"
                :disabled=notEdit>
              </el-time-select>
            </el-col>
            <el-col span="13">
              <el-form-item label='拾取地点'
                            class="label">
                <el-input v-model="found_notice.found_location"
                          :readOnly=notEdit></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label='详情描述'
                      class="label">
          <el-input v-model="found_notice.description"
                    type='textarea'
                    :readOnly=notEdit></el-input>
        </el-form-item>
        <el-form-item label='标签'
                      class="label">
          <el-tag v-for="item in found_data[0].found_tags" 
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
          <el-select v-model="found_notice.status"
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
          <!-- <el-scrollbar wrapClass="yf-container"
                        viewClass="yf-content"
                        wrap-class="default-scrollbar__wrap" 
                        view-class="default-scrollbar__view"> -->
            <el-row :gutter="10">
              <el-col v-for="url in found_data[0].found_urls" :key="url" span="7">
                <el-image :key="url" :src="url" :preview-src-list="found_data[0].found_urls" fit="scale-down" lazy ></el-image>
              </el-col>
            </el-row>
          <!-- </el-scrollbar> -->
        </el-form-item>
        <el-divider>联系方式</el-divider>
        <el-form-item v-for="item in found_data[0].found_contact_info" :key="item.type" :label="item.type" class="label">
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
      found_notice: [],
      found_data: [{
        created_at: '2020.10.29 9:32',
        created_by: '3',
        found_item_type: '证件',
        found_item_name: '一张学生证',
        found_description: '29日我在紫荆食堂丢失了一张学生证，如果有好心的同学捡到了，麻烦您与我联系，谢谢！',
        found_time: '10月29日上午九点半',
        found_man: '李祁',
        found_place: '紫荆食堂',
        found_status: '丢失中',
        found_tags: [{
          type: "color",
          content: "磨损较严重"
        }, {
          type: "characteristic",
          content: "没有壳子"
        }],
        found_urls: [
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604481835330&di=dbf01baac278a2ea9e3d98144485a5e9&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190629%2F9b93e03380d84eac98585d517e121f2a.jpeg'
        ],
        found_contact_info: [{
          type: "QQ",
          content: "89035689"
        }, {
          type: "email",
          content: "89035689@qq.com"
        }, {
          type: "微信",
          content: "yihao_xu"
        }, {
          type: "phone",
          content: "18611362038"
        }]
      },{
        created_at: '2020.11.1 12:14',
        created_by: '4',
        found_item_type: '衣服',
        found_item_name: '一件粉色外套',
        found_description: '1日中午我在西操跑步时丢失了一件粉色外套，如果有好心的同学捡到了，麻烦您与我联系，谢谢！',
        found_time: '11月1日上午十点左右',
        found_man: '徐亦豪',
        found_place: '西操',
        found_status: '丢失中',
        found_tags: [{
          type: "color",
          content: "粉色"
        }, {
          type: "characteristic",
          content: "几乎崭新"
        }],
        found_urls: [
          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2875408364,952330868&fm=26&gp=0.jpg'
        ],
        found_contact_info: [{
          type: "QQ",
          content: "89035689"
        }, {
          type: "email",
          content: "89035689@qq.com"
        }, {
          type: "微信",
          content: "yihao_xu"
        }, {
          type: "phone",
          content: "18611362038"
        }]
      }],
      status_options: [{
        value: 'UNA',
        label: '丢失中'
      }, {
        value: 'ACC',
        label: '已找到'
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
    axios.get('/found-notices/'+this.id, {})
      .then((response) => {
          this.found_notice = response.data
          let found_datetime = this.found_notice.found_datetime
          let created_at = this.found_notice.created_at
          let updated_at = this.found_notice.updated_at
          this.found_notice.found_datetime=this.extractTime(found_datetime)
          this.found_notice.created_at=this.extractTime(created_at)
          this.found_notice.updated_at=this.extractTime(updated_at)
          //console.log(this.property_template_list.results[id-1])
          console.log(this.found_notice)
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
    handleClose(tag) {
      this.found_data[this.id-1].found_tags.splice(this.found_data[this.id-1].found_tags.indexOf(tag), 1);
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
        this.found_data[this.id-1].found_tags.push({type: inputValue, content: inputValue});
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
