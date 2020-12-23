<template>
  <div>
    <el-card class="title-card">
      所有寻物启事
      <div class="edit">
        <el-button :id="id"
                    target="rent-application"
                    class="change"
                    @click="notice_dialogFormVisible = true"
                    type="primary">新建寻物启事</el-button>
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
            <el-option v-for="item in lost_notice_contact_type"
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
            <el-option v-for="item in lost_notice_contact_type"
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
        <el-form-item label="丢失地址">
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
          <el-button type="primary" @click="editLostLocation">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog class="create_contact" title="创建地址" :visible.sync="create_map_dialogFormVisible">
      <el-form label-width="80px">
        <el-form-item label="丢失地址">
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
          <el-button type="primary" @click="createLostLocation">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog class="new_notice" title="新建寻物启事" :visible.sync="notice_dialogFormVisible">
      <el-divider>物品信息</el-divider>
      <el-form label-width="100px">
        <el-form-item label='物品模板'
                      class="label">
          <el-select v-model="create_lost_notice.property.template">
            <el-option v-for="item in property_template_list.results"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                      @click.native="handleShow(item)">
            </el-option>
          </el-select>
        </el-form-item>
        <div v-if="fields_show">
          <div v-for="(item,i) in create_lost_notice.property.attributes" :key="i">
            <el-form-item :label="i">
              <el-input autocomplete="off" v-model="create_lost_notice.property.attributes[i]"></el-input>
            </el-form-item>
          </div>
        </div>
        <el-form-item label="物品名称">
          <el-input autocomplete="off" v-model="create_lost_notice.property.name"></el-input>
        </el-form-item>
        <el-form-item label='物品描述'
                      class="label">
          <el-input v-model="create_lost_notice.property.description"
                    type='textarea'></el-input>
        </el-form-item>
        <el-form-item label='物品属性'
                      class="label">
          <el-tag v-for="item in create_lost_notice.property.tags" 
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
        <el-form-item label='最早拾取时间'>
          <el-date-picker
            v-model="create_lost_notice.est_lost_start_datetime"
            type="datetime"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm">
          </el-date-picker>
        </el-form-item>
        <el-form-item label='最晚拾取时间'>
          <el-date-picker
            v-model="create_lost_notice.est_lost_end_datetime"
            type="datetime"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="拾取地点">
          <div v-for="(item, i) in create_lost_notice.lost_location.locations" :key="i">
            <el-link target="_blank" :underline="false" :disabled=notEdit @click="editLostLocationTriger(i)" >{{item.name}}<i class="el-icon-map-location el-icon--right"></i></el-link>
            <el-button
              size="mini"
              type="danger"
              @click="handleLocationDelete(item, i)"
              :disabled=notEdit
              style="margin-left: 15px">删除</el-button>
            <el-button v-if="i == create_lost_notice.lost_location.locations.length-1" class="button-new-tag" size="mini" @click="createLostLocationTriger(i)" :disabled=notEdit>+ New Location</el-button>
          </div>
          <el-button v-if="create_lost_notice.lost_location.locations.length==0" class="button-new-tag" size="mini" @click="createLostLocationTriger(-1)" :disabled=notEdit>+ New Location</el-button>
        </el-form-item>
        <el-form-item label='详情描述'
                      class="label">
          <el-input v-model="create_lost_notice.description"
                    type='textarea'></el-input>
        </el-form-item>
        <el-form-item label='启事图片'
                      class="label">
          <div style="text-align: initial;margin-top: 20px;">
            <el-upload
              :class="{is_hidden:upload_show}"
              action="none"
              :on-preview="handleLostImagePreview"
              :on-remove="handleLostImageRemove"
              :auto-upload="false"
              :limit="3"
              :on-exceed="handleExceed"
              list-type="picture-card"
              :file-list="lost_notice_images_urls"
              :on-change="saveImage">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="lost_notice_image_visible">
              <img width="100%" :src="lost_notice_image_url" alt="">
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
          <el-button type="primary" @click="CreateNewLostNotice">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <search-filter :options="options"
                   @search="searchAndFilter"></search-filter>
    <el-card class="table-card">
      <el-table :data="lostList.results"
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
                         width="150"
                         sortable='custom'>
        </el-table-column>
        <el-table-column prop="author.username"
                         label="创建者"
                         width="150"
                         sortable='custom'>
        </el-table-column>
        <el-table-column prop="property.name"
                         label="丢失物品"
                         width="130"
                         sortable='custom'>
        </el-table-column>
        <el-table-column prop="est_lost_start_datetime"
                         label="最早丢失时间"
                         width="175"
                         sortable='custom'>
        </el-table-column>
        <el-table-column prop="est_lost_end_datetime"
                         label="最晚丢失时间"
                         width="175"
                         sortable='custom'>
        </el-table-column>
        <el-table-column prop="lost_location.locations[0].name"
                         label="丢失地点"
                         width="300"
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
                     :total="1"
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
}
.table {
  position: relative;
  margin: 0 auto 40px auto;
}
.table-card{
  position: relative;
  margin: 0 auto 0 auto;
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
import { jsonp } from 'vue-jsonp'
import map from '../tecent_map'
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
      lostList: [],
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
      lost_notice_status_options: [{
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
      create_lost_notice: {
        contacts: [],
        property: {
          template: '',
          attributes: {},
          description: '',
          name: '',
          tags: []
        },
        description: '',
        lost_datetime: '',
        lost_location: {
          locations: []
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
      lost_notice_contact_type: [{
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
      lost_notice_image_visible: false,
      lost_notice_image_url: '',
      lost_notice_images: [],
      lost_notice_images_urls: [],
      upload_show:false,
      lost_notice_image_change: false,
      create_lost_notice_image_url: [],
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
      }
    }
  },
  created: function () {
    Axios.get('/lost-notices/', {})
      .then((response) => {
          this.lostList = response.data
          for(var i=0;i<this.lostList.results.length;i++)
          {
            let est_lost_start_datetime = this.lostList.results[i].est_lost_start_datetime
            let est_lost_end_datetime = this.lostList.results[i].est_lost_end_datetime
            let created_at = this.lostList.results[i].created_at
            let updated_at = this.lostList.results[i].updated_at
            this.lostList.results[i].est_lost_start_datetime=this.extractTime(est_lost_start_datetime)
            this.lostList.results[i].est_lost_end_datetime=this.extractTime(est_lost_end_datetime)
            this.lostList.results[i].created_at=this.extractTime(created_at)
            this.lostList.results[i].updated_at=this.extractTime(updated_at)
            this.lostList.results[i].status = this.Status[this.lostList.results[i].status]
            this.lostList.results[i].lost_location.locations[0].name = this.lostList.results[i].lost_location.locations[0].name + " 等"
          }
      })
      .catch((error) => {
        alert('error:' + error)
      })
    Axios.get('/property-templates', {})
      .then((response) => {
          this.property_template_list = response.data
          console.log(this.property_template_list.results)
      })
      .catch((error) => {
        alert('error:' + error)
      })
    this.changePage(1)
  },
  methods: {
    handleLocationDelete(item, id){
      this.create_lost_notice.lost_location.locations.splice(id,1)
    },
    createLostLocationTriger(id){
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
    createLostLocation(){
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
      this.create_lost_notice.lost_location.locations.push(tem)
      this.create_location.name = ""
      this.create_location.address = ""
      this.create_location.latitude = 0
      this.create_location.longitude = 0
      this.create_map_dialogFormVisible=false
    },
    editLostLocationTriger(id){
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
    editLostLocation(){
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
      this.create_lost_notice.lost_location.locations[this.edit_location_id] = tem
      this.edit_location.name = ""
      this.edit_location.address = ""
      this.edit_location.latitude = 0
      this.edit_location.longitude = 0
      console.log(tem)
      this.edit_map_dialogFormVisible=false
    },
    showSelectLocation(){
      this.location_longitude = this.location_search_result.location.lng
      this.location_latitude = this.location_search_result.location.lat
      this.location_zoom = 14
      console.log(this.location_longitude,this.location_latitude)
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
        this.create_lost_notice.contacts.push(tem)
        this.contact_show = JSON.parse(JSON.stringify(this.create_lost_notice.contacts))
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
        this.create_lost_notice.contacts.splice(this.edit_contact_id, 1)
        let tem = JSON.parse(JSON.stringify(this.edit_contact))
        this.create_lost_notice.contacts.push(tem)
        this.contact_show = JSON.parse(JSON.stringify(this.create_lost_notice.contacts))
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
      this.create_lost_notice.contacts.splice(index, 1)
      this.contact_show = JSON.parse(JSON.stringify(this.create_lost_notice.contacts))
      for(let i=0;i<this.contact_show.length;i++)
      {
        this.contact_show[i].method=this.Contact[this.contact_show[i].method]
      }
    },
    handleShow(template) {
      let new_template_fields = template.fields;
      this.$set(this, 'create_template_fields', new_template_fields)
      this.$set(this, 'fields_show', true)
      this.create_lost_notice.property.attributes = JSON.parse(JSON.stringify(new_template_fields))
      console.log(this.create_template_fields)
    },
    CreateNewLostNotice() {
      this.create_lost_notice.images = JSON.parse(JSON.stringify(this.create_lost_notice_image_url))
      console.log(this.create_lost_notice)
      Axios({
        url: '/lost-notices/',
        method: 'post',
        data: this.create_lost_notice
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
        this.create_lost_notice.property.tags.push({name:inputValue})
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
    handleLostImagePreview(file) {
      this.lost_notice_image_url = file.url
      this.lost_notice_image_visible = true
    },
    handleLostImageRemove(file) {
      console.log(this.create_lost_notice_image_url.length)
      console.log(this.create_lost_notice_image_url[0])
      let is_removed = false
      let index = -1
      for(let i=0;i<this.lost_notice_images_urls.length;i++)
      {
        if(this.lost_notice_images_urls[i].url == file.url)
        {
          index = i
        }
      }
      console.log(index)
      console.log(this.lost_notice_images_urls)
      let data=new FormData();
      let that=this
      data.append('url', this.create_lost_notice_image_url[index].url)
      Axios({
        url: '/lost-notices/delete-image/',
        method: 'post',
        data: data
      })
        .then((response) => {
          that.lost_notice_images.splice(index, 1);
          that.create_lost_notice_image_url.splice(index, 1);
          that.lost_notice_images_urls.splice(index, 1);
          if(that.lost_notice_images.length < 3)
          {
            that.upload_show = false
          }
        })
        .catch((error) => {
          alert('error:' + error)
        })
      console.log(this.lost_notice_images)
      console.log(this.lost_notice_images_urls)
      console.log(this.create_lost_notice_image_url)
    },
    saveImage(file,fileList) {
      this.lost_notice_images_urls.push({url:file.url})
      this.lost_notice_images.push(file.raw)
      this.lost_notice_image_change = true
      if(this.lost_notice_images.length >= 3)
      {
        this.upload_show = true
      }
      let data=new FormData();
      data.append(file.name, file.raw)
      Axios({
        url: '/lost-notices/upload-image/',
        method: 'post',
        data: data
      })
        .then((response) => {
          this.create_lost_notice_image_url.push({url:response.data.url[0]})
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
      console.log(column + '-' + column.prop + '-' + column.order)
      let order_prop
      if(column.order == "descending")
      {
        order_prop = "-" + column.prop
      }
      else
      {
        order_prop=column.prop
      }
      Axios.get('/lost-notices', {
        params: {
          ordering: order_prop,
          offset: 0,
          limit: this.pageSize
        }
      })
        .then((response) => {
          this.lostList = response.data
          for(var i=0;i<this.lostList.results.length;i++)
          {
            let est_lost_start_datetime = this.lostList.results[i].est_lost_start_datetime
            let est_lost_end_datetime = this.lostList.results[i].est_lost_end_datetime
            let created_at = this.lostList.results[i].created_at
            let updated_at = this.lostList.results[i].updated_at
            this.lostList.results[i].est_lost_start_datetime=this.extractTime(est_lost_start_datetime)
            this.lostList.results[i].est_lost_end_datetime=this.extractTime(est_lost_end_datetime)
            this.lostList.results[i].created_at=this.extractTime(created_at)
            this.lostList.results[i].updated_at=this.extractTime(updated_at)
            this.lostList.results[i].status = this.Status[this.lostList.results[i].status]
          }
        }).catch((error) => {
          // alert('error:' + error)
          console.log(error)
          this.$alert(error.response.data)
        })
    },
    enter: function (row) {
      this.$router.push({ name: 'lost', params: { lostId: row.id } })
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
      Axios.get('/lost-notices', {
        params: {
          [this.select]: this.input,
          offset: (page - 1) * this.pageSize,
          limit: this.pageSize
        }
      })
        .then((response) => {
          this.lostList = response.data
          for(var i=0;i<this.lostList.results.length;i++)
          {
            let est_lost_start_datetime = this.lostList.results[i].est_lost_start_datetime
            let est_lost_end_datetime = this.lostList.results[i].est_lost_end_datetime
            let created_at = this.lostList.results[i].created_at
            let updated_at = this.lostList.results[i].updated_at
            this.lostList.results[i].est_lost_start_datetime=this.extractTime(est_lost_start_datetime)
            this.lostList.results[i].est_lost_end_datetime=this.extractTime(est_lost_end_datetime)
            this.lostList.results[i].created_at=this.extractTime(created_at)
            this.lostList.results[i].updated_at=this.extractTime(updated_at)
            this.lostList.results[i].status = this.Status[this.lostList.results[i].status]
          }
        }).catch((error) => {
          console.log(error)
          this.$alert(error.response.data)
        })
    }
  }
}
</script>
