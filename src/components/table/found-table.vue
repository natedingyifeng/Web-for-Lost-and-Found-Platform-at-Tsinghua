<template>
  <div>
    <el-card class="title-card">
      所有失物招领
      <div class="edit">
        <el-button :id="id"
                    target="rent-application"
                    class="change"
                    @click="notice_dialogFormVisible = true"
                    type="primary">新建失物招领</el-button>
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
    <el-dialog class="new_notice" title="新建失物招领" :visible.sync="notice_dialogFormVisible">
      <el-divider>物品信息</el-divider>
      <el-form label-width="100px">
        <el-form-item label='物品模板'
                      class="label">
          <el-select v-model="create_found_notice.property.template">
            <el-option v-for="item in property_template_list"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                      @click.native="handleShow(item)">
            </el-option>
          </el-select>
        </el-form-item>
        <div v-if="fields_show">
          <div v-for="(item,i) in create_found_notice.property.attributes" :key="i">
            <el-form-item :label="i">
              <el-input autocomplete="off" v-model="create_found_notice.property.attributes[i]"></el-input>
            </el-form-item>
          </div>
        </div>
        <el-form-item label="物品名称">
          <el-input autocomplete="off" v-model="create_found_notice.property.name"></el-input>
        </el-form-item>
        <el-form-item label='物品描述'
                      class="label">
          <el-input v-model="create_found_notice.property.description"
                    type='textarea'></el-input>
        </el-form-item>
        <el-form-item label='物品属性'
                      class="label">
          <el-tag v-for="item in create_found_notice.property.tags" 
                  :disable-transitions="false"
                  :key="item" 
                  @close="handleClose(item)"
                  :closable="true">{{item.name}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
            style="width:15%;"></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-form-item>
        <el-divider>启事信息</el-divider>
        <el-form-item label='拾取时间'>
          <el-date-picker
            v-model="create_found_notice.found_datetime"
            type="datetime"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="拾取地点">
          <el-link v-if="has_location" target="_blank" :underline="false" @click="editFoundLocationTriger" >{{create_found_notice.found_location.name}}<i class="el-icon-map-location el-icon--right"></i></el-link>
          <el-button
            v-if="has_location"
            size="mini"
            type="danger"
            @click="handleLocationDelete(item, i)"
            style="margin-left: 15px">删除</el-button>
          <el-button v-if="!has_location" class="button-new-tag" size="mini" @click="createFoundLocationTriger">+ New Location</el-button>
        </el-form-item>
        <el-form-item label='详情描述'
                      class="label">
          <el-input v-model="create_found_notice.description"
                    type='textarea'></el-input>
        </el-form-item>
        <el-form-item label='启事图片'
                      class="label">
          <div style="text-align: initial;margin-top: 20px;">
            <el-upload
              :class="{is_hidden:upload_show}"
              action="none"
              :on-preview="handleFoundImagePreview"
              :on-remove="handleFoundImageRemove"
              :auto-upload="false"
              :limit="3"
              :on-exceed="handleExceed"
              list-type="picture-card"
              :file-list="found_notice_images_urls"
              :on-change="saveImage">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="found_notice_image_visible">
              <img width="100%" :src="found_notice_image_url" alt="">
            </el-dialog>
          </div>
        </el-form-item>
        <el-divider>联系方式</el-divider>
        <el-form-item label=''
                      class="label"
                      label-width="40px">
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
              width="300">
            </el-table-column>
            <el-table-column>
              <template slot="header" slot-scope="scope">
                操作
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-plus"
                  @click="handleCreate(scope.$index, scope.row)"
                  circle></el-button>
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="foot">
          <el-button @click="notice_dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="CreateNewFoundNotice">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <search-filter :options="options"
                   @search="searchAndFilter"></search-filter>
    <el-card class="table-card">
      <el-table :data="foundList.results"
                stripe
                id="users-table"
                class="table"
                @row-click="enter"
                @sort-change='sortChange'>
        <el-table-column prop="id"
                         label="ID"
                         width="80"
                         sortable='custom'>
        </el-table-column>
        <el-table-column prop="created_at"
                         label="创建时间"
                         width="200"
                         sortable='custom'>
        </el-table-column>
        <el-table-column prop="author.username"
                         label="创建者"
                         width="200"
                         sortable='custom'>
        </el-table-column>
        <el-table-column prop="property.name"
                         label="拾取物品"
                         width="230"
                         sortable='custom'>
        </el-table-column>
        <el-table-column prop="found_location.name"
                         label="拾取地点"
                         width="250"
                         sortable='custom'>
        </el-table-column>
        <el-table-column prop="found_datetime"
                         label="拾取时间"
                         width="200"
                         sortable='custom'>
        </el-table-column>
        <el-table-column prop="status"
                         label="状态"
                         width="130"
                         :filters="[{ text: '公开中', value: '公开中' }, { text: '已归还', value: '已归还' }, { text: '已关闭', value: '已关闭' }, { text: '草稿中', value: '草稿中' }]"
                         :filter-method="filterTag"
                         filter-placement="bottom-end">
        </el-table-column>
      </el-table>
      <el-pagination background
                     layout="prev, pager, next"
                     :total="found_notice_sum"
                     class="page-chooser"
                     @current-change="changePage">
      </el-pagination>
    </el-card>
  </div>
</template>

<style scoped>
.title-card {
  margin: auto;
  margin-top: 20px;
  position: relative;
  width: 1350px;
}
.table {
  position: relative;
  margin: 0 auto 40px auto;
  width: 1350px;
}
.table-card{
  position: relative;
  margin: 0 auto 0 auto;
  width: 1350px;
}
.page-chooser {
  position: relative;
  left: 43%;
  top: -10px;
}
.edit{
  position: relative;
  float: right;
  margin: auto;
  margin-bottom: 20px;
}
.is_hidden .el-upload--picture-card{
  display:none;
}
</style>

<script>
import Axios from 'axios'
import searchAndFilter from '../search&filter'
import map from '../tecent_map'
import { jsonp } from 'vue-jsonp'
export default {
  components: {
    'search-filter': searchAndFilter,
    'tecent-map': map
  },
  props: {
    id: Number,
    pageSize: Number,
    height: Number
  },
  data: function () {
    return {
      map_update: true,
      edit_map_dialogFormVisible: false,
      create_map_dialogFormVisible: false,
      location_select_dialogFormVisible: false,
      notice_dialogFormVisible: false,
      fields_show: false,
      image_visible: false,
      property_template_list: [],
      foundList: [],
      real_author: '',
      options: [
        { value: 'search', label: '全部搜索' },
        { value: 'author__username', label: '筛选：创建者' },
        { value: 'property__template__type__name', label: '筛选：物品种类' },
        { value: 'property__tags__name', label: '筛选：标签' },
        { value: 'status', label: '筛选：状态' }
      ],
      select: 'search',
      input: '',
      data: { count: 0 },
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
      Status: {
        PUB: "公开中",
        RET: "已归还",
        CLS: "已关闭",
        DFT: "草稿中"
      },
      create_contact: {
        name: "",
        method: "",
        details: ""
      },
      create_template: {},
      create_template_fields: {},
      create_notice_location: '',
      create_found_notice: {
        contacts: [],
        property: {
          template: '',
          attributes: {},
          description: '',
          name: '',
          tags: []
        },
        description: '',
        found_datetime: '',
        found_location: {
          address: '',
          latitude: '',
          longitude: '',
          name: ''
        },
        images: []
      },
      inputVisible: false,
      inputValue: '',
      create_notice_thumbnail: null,
      create_notice_thumbnail_url: '',
      edit_contact_dialogFormVisible: false,
      create_contact_dialogFormVisible: false,
      edit_contact_id: -1,
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
      found_notice_image_visible: false,
      found_notice_image_url: '',
      found_notice_images: [],
      found_notice_images_urls: [],
      upload_show:false,
      found_notice_image_change: false,
      create_found_notice_image_url: [],
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
      has_location: false,
      page_begin: 0,
      page_end: 9,
      page_size: 10,
      found_notice_sum: 0
    }
  },
  created: function () {
    Axios.get('/found-notices/index/', {
      params: {
        start: this.page_begin,
        end: this.page_end
      },
      headers: {
        Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
      }
    })
      .then((response) => {
          this.foundList = response.data
          for(var i=0;i<this.foundList.results.length;i++)
          {
            let found_datetime = this.foundList.results[i].found_datetime
            let created_at = this.foundList.results[i].created_at
            let updated_at = this.foundList.results[i].updated_at
            this.foundList.results[i].found_datetime=this.extractTime(found_datetime)
            this.foundList.results[i].created_at=this.extractTime(created_at)
            this.foundList.results[i].updated_at=this.extractTime(updated_at)
            this.foundList.results[i].status = this.Status[this.foundList.results[i].status]
          }
          this.found_notice_sum = response.data.total
      })
      .catch((error) => {
        alert('error:' + error)
      })
    let page_num = 0
    Axios.get('/property-templates/', {
      params: {
        page: 1
      }
    })
      .then((response) => {
          this.property_template_list = response.data.results
          page_num = Math.ceil(response.data.count/10)
          this.getFullTemplateList(page_num)
      })
      .catch((error) => {
        alert('error:' + error)
      })
    this.changePage(1)
  },
  methods: {
    getFullTemplateList(page_num) {
      for(let i=2;i<=page_num;i++)
      {
        Axios.get('/property-templates/', {
          params: {
            page: i
          }
        })
          .then((response) => {
              this.property_template_list = this.property_template_list.concat(response.data.results)
          })
          .catch((error) => {
            alert('error:' + error)
          })
      }
    },
    handleClose(item) {
      this.create_found_notice.property.tags.splice(this.create_found_notice.property.tags.indexOf(item), 1);
    },
    handleLocationDelete(){
      this.create_found_notice.found_location = {}
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
      this.create_found_notice.found_location = tem
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
      this.create_found_notice.found_location = tem
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
        this.$alert(err.response.data)
      })
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
    createContact() {
      if(this.checkContactValidation() == true)
      {
        let tem = JSON.parse(JSON.stringify(this.create_contact))
        this.create_found_notice.contacts.push(tem)
        this.contact_show = JSON.parse(JSON.stringify(this.create_found_notice.contacts))
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
        this.create_found_notice.contacts.splice(this.edit_contact_id, 1)
        let tem = JSON.parse(JSON.stringify(this.edit_contact))
        this.create_found_notice.contacts.push(tem)
        this.contact_show = JSON.parse(JSON.stringify(this.create_found_notice.contacts))
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
      this.create_found_notice.contacts.splice(index, 1)
      this.contact_show = JSON.parse(JSON.stringify(this.create_found_notice.contacts))
      for(let i=0;i<this.contact_show.length;i++)
      {
        this.contact_show[i].method=this.Contact[this.contact_show[i].method]
      }
    },
    handleShow(template) {
      let new_template_fields = template.fields;
      this.$set(this, 'create_template_fields', new_template_fields)
      this.$set(this, 'fields_show', true)
      this.create_found_notice.property.attributes = JSON.parse(JSON.stringify(new_template_fields))
    },
    CreateNewFoundNotice() {
      this.create_found_notice.images = JSON.parse(JSON.stringify(this.create_found_notice_image_url))
      Axios({
        url: '/found-notices/',
        method: 'post',
        data: this.create_found_notice,
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
        }
      })
        .then((response) => {
          location.reload()
        })
        .catch((error) => {
          alert('error:' + error)
        })
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.create_found_notice.property.tags.push({name:inputValue})
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleFoundImagePreview(file) {
      this.found_notice_image_url = file.url
      this.found_notice_image_visible = true
    },
    handleFoundImageRemove(file) {
      let is_removed = false
      let index = -1
      for(let i=0;i<this.found_notice_images_urls.length;i++)
      {
        if(this.found_notice_images_urls[i].url == file.url)
        {
          index = i
        }
      }
      let data=new FormData();
      let that=this
      data.append('url', this.create_found_notice_image_url[index].url)
      Axios({
        url: '/found-notices/delete-image/',
        method: 'post',
        data: data,
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
        }
      })
        .then((response) => {
          that.found_notice_images.splice(index, 1);
          that.create_found_notice_image_url.splice(index, 1);
          that.found_notice_images_urls.splice(index, 1);
          if(that.found_notice_images.length < 3)
          {
            that.upload_show = false
          }
        })
        .catch((error) => {
          alert('error:' + error)
        })
    },
    saveImage(file,fileList) {
      this.found_notice_images_urls.push({url:file.url})
      this.found_notice_images.push(file.raw)
      this.found_notice_image_change = true
      if(this.found_notice_images.length >= 3)
      {
        this.upload_show = true
      }
      let data=new FormData();
      data.append(file.name, file.raw)
      Axios({
        url: '/found-notices/upload-image/',
        method: 'post',
        data: data,
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
        }
      })
        .then((response) => {
          this.create_found_notice_image_url.push({url:response.data.url[0]})
        })
        .catch((error) => {
          alert('error:' + error)
        })
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    filterTag(value, row) {
      return row.status === value;
    },
    sortChange: function(column, prop, order) {
      let order_prop
      if(column.order == "descending")
      {
        order_prop = "-" + column.prop
      }
      else
      {
        order_prop=column.prop
      }
      Axios.get('/found-notices/', {
        params: {
          ordering: order_prop
        }
      })
        .then((response) => {
          this.foundList = response.data
          for(var i=0;i<this.foundList.results.length;i++)
          {
            let found_datetime = this.foundList.results[i].found_datetime
            let created_at = this.foundList.results[i].created_at
            let updated_at = this.foundList.results[i].updated_at
            this.foundList.results[i].found_datetime=this.extractTime(found_datetime)
            this.foundList.results[i].created_at=this.extractTime(created_at)
            this.foundList.results[i].updated_at=this.extractTime(updated_at)
            this.foundList.results[i].status = this.Status[this.foundList.results[i].status]
          }
        }).catch((error) => {
          this.$alert(error.response.data)
        })
    },
    enter: function (row) {
      this.$router.push({ name: 'found', params: { foundId: row.id } })
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
    searchAndFilter: function (select, input) {
      this.select = select
      this.input = input
      this.changePage(1)
    },
    changePage: function (page) {
      this.page_begin = 0 + (page-1)*this.page_size
      this.page_end = 9 + (page-1)*this.page_size
      Axios.get('/found-notices/index/', {
        params: {
          start: this.page_begin,
          end: this.page_end
        },
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
        }
      })
        .then((response) => {
          this.foundList = response.data
          for(var i=0;i<this.foundList.results.length;i++)
          {
            let found_datetime = this.foundList.results[i].found_datetime
            let created_at = this.foundList.results[i].created_at
            let updated_at = this.foundList.results[i].updated_at
            this.foundList.results[i].found_datetime=this.extractTime(found_datetime)
            this.foundList.results[i].created_at=this.extractTime(created_at)
            this.foundList.results[i].updated_at=this.extractTime(updated_at)
            this.foundList.results[i].status = this.Status[this.foundList.results[i].status]
          }
        }).catch((error) => {
          this.$alert(error.response.data)
        })
    }
  }
}
</script>
