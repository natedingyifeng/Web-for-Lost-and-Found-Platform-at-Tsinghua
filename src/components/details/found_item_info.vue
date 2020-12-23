// writen by xyh
<template>
  <div class = "info">
    <el-card class="title_card"
             style="font-size:24px;">
      {{'失物招领#' + this.id }}
      <div class="edit">
        <el-button :id="id"
                      target="rent-application"
                      class="change"
                      v-if="isAdmin"
                      @click="change"
                      :disabled="!notEdit"
                      type="primary">修改</el-button>
        <el-button :id="id"
                      target="rent-application"
                      class="change"
                      v-if="isAdmin"
                      @click="confirm"
                      :disabled="notEdit"
                      type="primary">确定</el-button>
        <el-button :id="id"
                      target="user"
                      class="change"
                      v-if="isAdmin"
                      @click="DeleteFoundNoticeConfirm"
                      type="danger">删除</el-button>
      </div>
    </el-card>
    <el-dialog class="create_contact" title="添加联系方式" :visible.sync="create_contact_dialogFormVisible">
      <el-form label-width="100px">
        <el-form-item label="联系人">
          <el-input autocomplete="off" v-model="create_contact.name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-select v-model="create_contact.method"
                     width="50%">
            <el-option v-for="item in found_notice_contact_type"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容">
          <el-input autocomplete="off" v-model="create_contact.details"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="foot">
          <el-button @click="create_contact_dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="createContact">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog class="edit_contact" title="修改联系方式" :visible.sync="edit_contact_dialogFormVisible">
      <el-form label-width="100px">
        <el-form-item label="联系人">
          <el-input autocomplete="off" v-model="edit_contact.name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-select v-model="edit_contact.method"
                     width="50%">
            <el-option v-for="item in found_notice_contact_type"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容">
          <el-input autocomplete="off" v-model="edit_contact.details"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="foot">
          <el-button @click="edit_contact_dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editContact">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog class="location_select" title="选择地址" :visible.sync="location_select_dialogFormVisible">
      <div v-for="(item, i) in location_search_results" :key="i" style="margin-bottom: 10px">
        <el-radio v-model="location_search_result" :label="item" border>{{"名称："+item.title+" 地址："+item.address}}</el-radio>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="foot">
          <el-button @click="location_select_dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="showSelectLocation">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-card class='card'>
      <el-form class="form"
               label-width="100px">
        <el-divider>启事信息</el-divider>
        <el-form-item label='ID'>
          <el-row>
            <el-col :span=2>
              <el-input v-model="id"
                          :disabled="true"></el-input>
            </el-col>
            <el-col :span=5>
              <el-form-item label='创建者姓名'>
                <el-input v-model="found_notice.author.username"
                          :disabled="true"
                          style="width:100%;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span=7>
              <el-form-item label='创建时间'>
              <el-date-picker
                v-model="found_notice_created_at"
                type="datetime"
                :disabled="true"
                format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span=7>
              <el-form-item label='最近更新'>
              <el-date-picker
                v-model="found_notice_updated_at"
                type="datetime"
                :disabled="true"
                format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span=1>
              <el-form-item>
                <el-button type='primary'
                          @click="enterUser(found_notice.author.id)"
                          style="margin-left:20px;">查看创建者</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-divider>物品信息</el-divider>
        <el-form-item label='拾取物品种类'
                      class="label">
          <el-row>
            <el-col :span=5>
              <el-select v-model="found_notice.property.template"
                     :disabled=notEdit>
                <el-option v-for="item in found_notice_item_options"
                          :key="item.name"
                          :label="item.name"
                          :value="item.name">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span=8>
              <el-form-item label='拾取物品名称'
                            class="label">
                <el-input v-model="found_notice.property.name"
                          :disabled=notEdit></el-input>
              </el-form-item>
            </el-col>
            <el-col :span=10>
              <el-form-item label='拾取时间'
                            class="label">
                <el-date-picker
                  v-model="found_notice_found_datetime"
                  type="datetime"
                  :disabled=notEdit
                  placeholder="拾取时间"
                  format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label='拾取地点'
                      class="label">
          <el-link v-if="has_location" target="_blank" :underline="false" :disabled=notEdit @click="editFoundLocationTriger" >{{found_notice.found_location.name}}<i class="el-icon-map-location el-icon--right"></i></el-link>
          <el-button
            v-if="has_location"
            size="mini"
            type="danger"
            @click="handleLocationDelete(item, i)"
            :disabled=notEdit
            style="margin-left: 15px">删除</el-button>
          <el-button v-if="!has_location" class="button-new-tag" size="mini" @click="createFoundLocationTriger" :disabled=notEdit>+ New Location</el-button>
          <el-dialog class="create_contact" title="修改地址" :visible.sync="edit_map_dialogFormVisible">
            <el-form label-width="80px">
              <el-form-item label="拾取地址">
                <el-input autocomplete="off" v-model="location_name">
                  <el-button slot="append" icon="el-icon-search" @click="searchMap"></el-button>
                </el-input>
              </el-form-item>
              <el-form-item label="地图" label-width="53px">
                <tecent-map id="edit_map" v-if="map_update" v-bind:latitude="location_latitude" v-bind:longitude="location_longitude" v-bind:zoom="location_zoom"></tecent-map>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <div class="foot">
                <el-button @click="edit_map_dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editFoundLocation">确 定</el-button>
              </div>
            </div>
          </el-dialog>
          <el-dialog class="create_contact" title="创建地址" :visible.sync="create_map_dialogFormVisible">
            <el-form label-width="80px">
              <el-form-item label="拾取地址">
                <el-input autocomplete="off" v-model="location_name">
                  <el-button slot="append" icon="el-icon-search" @click="searchMap"></el-button>
                </el-input>
              </el-form-item>
              <el-form-item label="地图" label-width="53px">
                <tecent-map id="create_map" v-if="map_update" v-bind:latitude="location_latitude" v-bind:longitude="location_longitude" v-bind:zoom="location_zoom"></tecent-map>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <div class="foot">
                <el-button @click="create_map_dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="createFoundLocation">确 定</el-button>
              </div>
            </div>
          </el-dialog>
        </el-form-item>
        <el-form-item label='详情描述'
                      class="label">
          <el-input v-model="found_notice.description"
                    type='textarea'
                    :disabled=notEdit></el-input>
        </el-form-item>
        <el-form-item label='标签'
                      class="label">
          <el-tag v-for="item in found_notice.property.tags" 
                  :closable=!notEdit
                  :disable-transitions="false"
                  :key="item" 
                  @close="handleClose(item)"
                  :disabled=!notEdit>{{item.name}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
            style="width:10%;"
            :disabled=notEdit></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput" :disabled=notEdit>+ New Tag</el-button>
        </el-form-item>
        <el-form-item label='状态'
                      class="label">
          <el-select v-model="found_notice.status"
                     :disabled=notEdit>
            <el-option v-for="item in found_notice_status_options"
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
              :on-preview="handleFoundImagePreview"
              :before-remove="handleFoundImageRemoveConfirm"
              :auto-upload="false"
              :limit="3"
              :on-exceed="handleExceed"
              list-type="picture-card"
              :file-list="found_notice_images_urls"
              :on-change="saveImage"
              :disabled=notEdit>
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="found_notice_image_visible">
              <img width="100%" :src="found_notice_image_url" alt="">
            </el-dialog>
          </div>
        </el-form-item>
        <el-divider>联系方式</el-divider>
        <el-form-item label=''
                      class="label">
          <el-table
            :data="contact_show"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="method"
              label="渠道"
              width="180">
            </el-table-column>
            <el-table-column
              prop="details"
              label="细节"
              width="380">
            </el-table-column>
            <el-table-column>
              <template slot="header" slot-scope="scope">
                操作
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-plus"
                  @click="handleCreate(scope.$index, scope.row)"
                  :disabled=notEdit
                  circle></el-button>
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  :disabled=notEdit>编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  :disabled=notEdit>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-divider>匹配启事</el-divider>
        <el-timeline :reverse="reverse" width="60%">
          <el-timeline-item
            v-for="(activity, index) in found_notice.matching_entries"
            :key="index"
            :timestamp="'匹配度：'+activity.matching_degree"
            placement="top">
            <el-card>
              <el-link target="_blank" @click="enterLostNotice(activity.lost_notice)">{{"寻物启事: "+activity.lost_property_name+"#"+activity.lost_notice}}</el-link>
              <p>{{"失物名称："+activity.lost_property_name}}</p>
              <p>{{"失物描述："+activity.lost_notice_description}}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-form>
    </el-card>
  </div>
</template>

<style>
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
.is_hidden .el-upload--picture-card{
  display:none;
}
.el-timeline {
  padding-left: 150px;
  padding-right: 150px;
}
</style>

<style scoped>

</style>

<script>
/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios'
import changeButton from '../button/change-button'
import rejButton from '../button/rej-button'
import approveButton from '../button/approve-button'
import delButton from '../button/del-button'
import map from '../tecent_map'
import { jsonp } from 'vue-jsonp'
export default {
  components: {
    'change-button': changeButton,
    'rej-button': rejButton,
    'approve-button': approveButton,
    'del-button': delButton,
    'tecent-map': map
  },
  props: {
    id: Number
  },
  data: function () {
    return {
      map_update: true,
      edit_contact_dialogFormVisible: false,
      create_contact_dialogFormVisible: false,
      edit_map_dialogFormVisible: false,
      create_map_dialogFormVisible: false,
      location_select_dialogFormVisible: false,
      edit_contact_id: -1,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      found_notice: [],
      found_notice_origin: [],
      found_notice_found_datetime: "",
      found_notice_created_at: "",
      found_notice_updated_at: "",
      contact_show: [],
      edit_contact: {
        name: "",
        method: "",
        details: ""
      },
      create_contact: {
        name: "",
        method: "",
        details: ""
      },
      found_notice_status_options: [{
        value: 'PUB',
        label: '公开中'
      }, {
        value: 'RET',
        label: '已归还'
      }, {
        value: 'CLS',
        label: '已关闭'
      }, {
        value: 'DFT',
        label: '草稿中'
      }],
      found_notice_item_options: [],
      found_notice_contact_type: [{
        value: "WCT",
        label: "微信"
      }, {
        value: "EML",
        label: "邮箱"
      }, {
        value: "PHN",
        label: "电话"
      }],
      Contact: {
        WCT: "微信",
        EML: "邮箱",
        PHN: "电话"
      },
      // eslint-disable-next-line eqeqeq
      isrenter: false,
      // eslint-disable-next-line eqeqeq
      isborrower: false,
      isAdmin: true,
      notEdit: true,
      inputVisible: false,
      inputValue: '',
      found_notice_image_visible: false,
      found_notice_image_url: '',
      found_notice_images: [],
      found_notice_images_urls: [],
      upload_show:false,
      found_notice_image_change: false,
      ruleForm: {
        coverUrl: "",
        coverFile: ""
      },
      location_name: "",
      location_search_results: [],
      location_search_result: "",
      location_latitude: 39.916527,
      location_longitude: 116.397128,
      location_zoom: 11,
      latitude: 39.916527,
      longitude: 116.397128,
      zoom: 11,
      edit_location_id: -1,
      edit_location: {
        name: "",
        address: "",
        latitude: 0,
        longitude: 0
      },
      create_location_id: -1,
      create_location: {
        name: "",
        address: "",
        latitude: 0,
        longitude: 0
      },
      has_location: false
      // isAdmin: this.$store.getters.isAdmin
    }
  },
  created: function () {
    axios.get('/found-notices/'+this.id, {
      // headers: {
      //   Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
      // }
    })
      .then((response) => {
          this.found_notice = response.data
          this.found_notice_origin = response.data
          this.contact_show = JSON.parse(JSON.stringify(this.found_notice.contacts))
          let found_datetime = this.found_notice.found_datetime
          let created_at = this.found_notice.created_at
          let updated_at = this.found_notice.updated_at
          // this.found_notice_found_datetime=this.extractTime(found_datetime)
          // this.found_notice_created_at=this.extractTime(created_at)
          // this.found_notice_updated_at=this.extractTime(updated_at)
          this.found_notice_found_datetime=found_datetime
          this.found_notice_created_at=created_at
          this.found_notice_updated_at=updated_at
          for(let i=0;i<this.contact_show.length;i++)
          {
            this.contact_show[i].method=this.Contact[this.contact_show[i].method]
          }
          if(this.found_notice.images.length == 3)
          {
            this.upload_show = true
          }
          for(let i=0;i<this.found_notice.images.length;i++)
          {
            // this.ruleForm.push({coverUrl: "", coverFile: ""})
            // this.imgUrlToFile(this.found_notice.images[i].url, i)
            this.found_notice_images_urls.push({url: this.found_notice.images[i].url})
            // console.log(this.found_notice_images_urls)
            this.found_notice_images.push({url: this.found_notice.images[i].url})
          }
          if(this.found_notice.found_location != {})
          {
            this.has_location = true
          }
          //console.log(this.property_template_list.results[id-1])
          console.log(this.found_notice)
      })
      .catch((error) => {
        alert('error:' + error)
      })
    axios.get('/property-templates', {
      // headers: {
      //   Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
      // }
    })
      .then((response) => {
          this.found_notice_item_options = response.data.results
      })
      .catch((error) => {
        alert('error:' + error)
      })
  },
  methods: {
    handleLocationDelete(){
      this.found_notice.found_location = {}
      this.has_location = false
    },
    createFoundLocationTriger(id){
      this.create_map_dialogFormVisible=true
      this.location_longitude = this.longitude
      this.location_latitude = this.latitude
      this.location_zoom = this.zoom
      this.map_update = false
      this.$nextTick(() => {
        this.map_update = true
      })
      this.create_location_id = id
    },
    createFoundLocation(){
      this.create_location.name = this.location_search_result.title
      this.create_location.address = this.location_search_result.address
      this.create_location.latitude = this.location_latitude
      this.create_location.longitude = this.location_longitude
      if(this.create_location.name == "")
      {
        alert('error: 地址不应为空!')
        return
      }
      let tem = JSON.parse(JSON.stringify(this.create_location))
      this.found_notice.found_location = tem
      this.create_location.name = ""
      this.create_location.address = ""
      this.create_location.latitude = 0
      this.create_location.longitude = 0
      this.create_map_dialogFormVisible=false
      this.has_location = true
    },
    editFoundLocationTriger(id){
      this.edit_map_dialogFormVisible=true
      this.location_longitude = this.lost_notice.lost_location.locations[id].longitude
      this.location_latitude = this.lost_notice.lost_location.locations[id].latitude
      this.location_zoom = 14
      this.map_update = false
      this.$nextTick(() => {
        this.map_update = true
      })
      this.edit_location_id = id
    },
    editFoundLocation(){
      this.edit_location.name = this.location_search_result.title
      this.edit_location.address = this.location_search_result.address
      this.edit_location.latitude = this.location_latitude
      this.edit_location.longitude = this.location_longitude
      if(this.edit_location.name == "")
      {
        alert('error: 地址不应为空!')
        return
      }
      let tem = JSON.parse(JSON.stringify(this.edit_location))
      this.found_notice.found_location = tem
      this.edit_location.name = ""
      this.edit_location.address = ""
      this.edit_location.latitude = 0
      this.edit_location.longitude = 0
      this.edit_map_dialogFormVisible=false
    },
    showSelectLocation(){
      this.location_longitude = this.location_search_result.location.lng
      this.location_latitude = this.location_search_result.location.lat
      this.location_zoom = 14
      this.location_select_dialogFormVisible = false
      this.map_update = false
      this.$nextTick(() => {
        this.map_update = true
      })
    },
    searchMap(){
      const KEY = "ZYMBZ-3EYKD-QCK4A-PN4DY-25NT6-72BK5";
      let url = "https://apis.map.qq.com/ws/place/v1/search"
      let keyword = this.location_name
      jsonp(url, {
          key: KEY,
          boundary: "region(北京,0)",
          keyword: keyword,
          output: "jsonp"
      }).then(res => {
        this.location_search_results = res.data
        if(this.location_search_results.length > 0)
        {
          this.location_select_dialogFormVisible = true
        }
        else
        {
          alert('error: 没有找到对应的地址!')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    enterLostNotice: function (id) {
      this.$router.push({ name: 'lost', params: { lostId: id } })
      // this.$router.push({ name: 'user', params: { userId: row.id } })
    },
    DeleteFoundNotice() {
      axios.delete('/found-notices/' + this.id + '/', {})
      .then((response) => {
        this.$router.push('/found-list')
      })
      .catch((error) => {
        alert('error:' + error)
      })
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
    },
    DeleteFoundNoticeConfirm() {
      this.$confirm('此操作将删除该启事, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.DeleteFoundNotice()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      return false
    },
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
    checkContactValidation(){
      if(this.create_contact.method == "EML")
      {
        return this.checkEmailValidation(this.create_contact.details)
      }
      else if(this.create_contact.method == "PHN")
      {
        return this.checkPhoneValidation(this.create_contact.details)
      }
      else if(this.edit_contact.method == "EML")
      {
        return this.checkEmailValidation(this.edit_contact.details)
      }
      else if(this.edit_contact.method == "PHN")
      {
        return this.checkPhoneValidation(this.edit_contact.details)
      }
      else{
        return true
      }
    },
    imgUrlToFile(url, i) {
      var self = this;
      var imgLink = url;
      var tempImage = new Image();
      //如果图片url是网络url，要加下一句代码
      tempImage.crossOrigin = "*";
      tempImage.onload = function() {
        var base64 = self.getBase64Image(tempImage);
        var imgblob = self.base64toBlob(base64);
        var filename = self.getFileName(self.ruleForm[i].coverUrl);
        this.ruleForm[i].coverFile = self.blobToFile(imgblob, filename);
      };
      tempImage.src = imgLink;
    },
    getBase64Image(img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
      var dataURL = canvas.toDataURL("image/" + ext);
      return dataURL;
    },
    base64toBlob(base64) {
      let arr = base64.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    blobToFile(blob, filename) {
      // edge浏览器不支持new File对象，所以用以下方法兼容
      blob.lastModifiedDate = new Date();
      blob.name = filename;
      return blob;
    },
    getFileName(url) {
      // 获取到文件名
      let pos = url.lastIndexOf("/"); // 查找最后一个/的位置
      return url.substring(pos + 1); // 截取最后一个/位置到字符长度，也就是截取文件名
    },
    handleFoundImagePreview(file) {
      this.found_notice_image_url = file.url
      this.found_notice_image_visible = true
    },
    handleFoundImageRemove(file) {
      let index = -1
      for(let i=0;i<this.found_notice_images_urls.length;i++)
      {
        if(this.found_notice_images_urls[i].url == file.url)
        {
          index = i
        }
      }
      console.log(this.found_notice_images)
      console.log(this.found_notice.images)
      console.log(this.found_notice_origin.images)
      console.log(this.found_notice_images_urls)
      let data=new FormData();
      let that=this
      data.append('url', this.found_notice_images_urls[index].url)
      console.log(data)
      axios({
        url: '/found-notices/delete-image/',
        method: 'post',
        data: data
      })
        .then((response) => {
          this.found_notice_images.splice(index, 1);
          this.found_notice_images_urls.splice(index, 1);
          if(this.found_notice_images_urls.length < 3)
          {
            this.upload_show = false
          }
          this.imageNoticeDeleteUpdate()
        })
        .catch((error) => {
          alert('error:' + error)
        });
    },
    imageNoticeDeleteUpdate(){
      this.found_notice.images = JSON.parse(JSON.stringify(this.found_notice_images_urls))
      this.found_notice_origin.images = JSON.parse(JSON.stringify(this.found_notice_images_urls))
      axios.put('/found-notices/'+this.id+'/', this.found_notice_origin, {})
        .then((response) => {
          console.log(this.found_notice_images)
          console.log(this.found_notice.images)
          console.log(this.found_notice_origin.images)
          console.log(this.found_notice_images_urls)
          if(this.found_notice.images.length < 3)
          {
            this.upload_show = false
          }
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
      this.found_notice.images = JSON.parse(JSON.stringify(this.found_notice_images_urls))
      this.found_notice_origin.images = JSON.parse(JSON.stringify(this.found_notice_images_urls))
      axios.put('/found-notices/'+this.id+'/', this.found_notice_origin, {})
        .then((response) => {
          if(this.found_notice.images.length >= 3)
          {
            this.upload_show = true
          }
        })
        .catch((error) => {
          this.$alert(error.response.data)
        })
      this.$message({
        type: 'success',
        message: '添加成功!'
      });
    },
    handleFoundImageRemoveConfirm(file) {
      this.$confirm('此操作将删除该图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleFoundImageRemove(file)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      return false
    },
    saveImage(file,fileList) {
      // this.found_notice_images_urls.push(file.url)
      this.found_notice_images.push(file.raw)
      this.found_notice_image_change = true
      let data=new FormData();
      data.append(file.name, file.raw)
      axios({
        url: '/found-notices/upload-image/',
        method: 'post',
        data: data
      })
        .then((response) => {
          // this.found_notice_images_urls.pop()
          if(this.found_notice_images_urls.length >= 3)
          {
            this.upload_show = true
          }
          this.found_notice_images_urls.push({url:response.data.url[0]})
          this.imageNoticeAddUpdate()
        })
        .catch((error) => {
          alert('error:' + error)
        })
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    createContact() {
      if(this.checkContactValidation() == true)
      {
        let tem = JSON.parse(JSON.stringify(this.create_contact))
        this.found_notice.contacts.push(tem)
        this.contact_show = JSON.parse(JSON.stringify(this.found_notice.contacts))
        for(let i=0;i<this.contact_show.length;i++)
        {
          this.contact_show[i].method=this.Contact[this.contact_show[i].method]
        }
        this.create_contact.name = ""
        this.create_contact.method = ""
        this.create_contact.details = ""
        this.create_contact_dialogFormVisible = false
      }
    },
    editContact() {
      if(this.checkContactValidation() == true)
      {
        this.found_notice.contacts.splice(this.edit_contact_id, 1)
        let tem = JSON.parse(JSON.stringify(this.edit_contact))
        this.found_notice.contacts.push(tem)
        this.contact_show = JSON.parse(JSON.stringify(this.found_notice.contacts))
        for(let i=0;i<this.contact_show.length;i++)
        {
          this.contact_show[i].method=this.Contact[this.contact_show[i].method]
        }
        this.edit_contact.name = ""
        this.edit_contact.method = ""
        this.edit_contact.details = ""
        this.edit_contact_dialogFormVisible = false
      }
    },
    handleEdit(index, row) {
      this.edit_contact_dialogFormVisible = true
      this.edit_contact_id = index
    },
    handleCreate(index, row) {
      this.create_contact_dialogFormVisible = true
    },
    handleDelete(index, row) {
      this.found_notice.contacts.splice(index, 1)
      this.contact_show = JSON.parse(JSON.stringify(this.found_notice.contacts))
      for(let i=0;i<this.contact_show.length;i++)
      {
        this.contact_show[i].method=this.Contact[this.contact_show[i].method]
      }
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    handleImageUploadSuccess(file) {
      this.template.thumbnail_url = file.url
      this.image_visible = true
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    checkType(file,fileList) {
      this.template.thumbnail=file
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
    handleClose(item) {
      this.found_notice.property.tags.splice(this.found_notice.property.tags.indexOf(item), 1);
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
        this.found_notice.property.tags.push({name: inputValue})
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    change: function () {
      this.notEdit=false
    },
    confirm: function () {
      const newData = {}
      for (const key in this.found_notice) {
        if (this.found_notice[key] !== '' && key !='') {
          newData[key] = this.found_notice[key]
        }
      }
      let is_edited = false
      this.$set(this.found_notice, "found_datetime", this.found_notice_found_datetime)
      if(true)
      {
        axios.put('/found-notices/'+this.id+'/', this.found_notice, {})
        .then((response) => {
          is_edited = true
          location.reload()
        })
        .catch((error) => {
          this.$alert(error.response.data)
        })
      }
      else
      {
        let data=new FormData();
        data.append('id', this.found_notice.id)
        data.append('contacts', this.found_notice.contacts)
        data.append('property', this.found_notice.property)
        data.append('author', this.found_notice.author)
        data.append('matching_entries', this.found_notice.matching_entries)
        data.append('description', this.found_notice.description)
        data.append('found_datetime', this.found_notice.found_datetime)
        data.append('found_location', this.found_notice.found_location)
        data.append('quizzes', this.found_notice.quizzes)
        data.append('status', this.found_notice.status)
        data.append('return_datetime', this.found_notice.return_datetime)
        data.append('extra', this.found_notice.extra)
        data.append('created_at', this.found_notice.created_at)
        data.append('updated_at', this.found_notice.updated_at)
        data.append('return_user', this.found_notice.return_user)
        data.append('images', this.found_notice.images)
        axios.put('/found-notices/'+this.id+'/', data, {})
        .then((response) => {
          is_edited = true
          location.reload()
        })
        .catch((error) => {
          this.$alert(error.response.data)
        })
      }
      this.$message('修改成功')
      this.notEdit=true
    },
    enterUser: function (id) {
      this.$router.push({ name: 'user', params: { userId: id } })
    }
  }
}
</script>
