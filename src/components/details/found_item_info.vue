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
        <el-button :id="id"
                      target="user"
                      class="change"
                      v-if="isAdmin"
                      @click="DeleteFoundNotice"
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
    <el-card class='card'>
      <el-form class="form"
               label-width="100px">
        <el-divider>启事信息</el-divider>
        <el-form-item label='ID'>
          <el-row>
            <el-col span="2">
              <el-input v-model="id"
                          :disabled="true"></el-input>
            </el-col>
            <el-col span="5">
              <el-form-item label='创建者姓名'>
                <el-input v-model="found_notice.author.username"
                          :disabled="true"
                          style="width:100%;"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="7">
              <el-form-item label='创建时间'>
              <el-date-picker
                v-model="found_notice_created_at"
                type="datetime"
                :disabled="true"
                format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col span="7">
              <el-form-item label='最近更新'>
              <el-date-picker
                v-model="found_notice_updated_at"
                type="datetime"
                :disabled="true"
                format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col span="1">
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
            <el-col span="3">
              <el-select v-model="found_notice.property.template"
                     :disabled=notEdit>
                <el-option v-for="item in found_notice_item_options"
                          :key="item.name"
                          :label="item.name"
                          :value="item.name">
                </el-option>
              </el-select>
            </el-col>
            <el-col span="5" :offset="1">
              <el-form-item label='拾取物品名称'
                            class="label">
                <el-input v-model="found_notice.property.name"
                          :disabled=notEdit></el-input>
              </el-form-item>
            </el-col>
            <el-col span="7">
              <!-- <el-time-select
                placeholder="拾取时间"
                v-model="found_notice_found_datetime"
                :disabled=notEdit>
              </el-time-select> -->
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
            <el-col span="8">
              <el-form-item label='拾取地点'
                            class="label">
                <el-input v-model="found_notice.found_location"
                          :disabled=notEdit></el-input>
              </el-form-item>
            </el-col>
          </el-row>
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
          <!-- <el-input v-model="data.status"
                    :disabled="diseditable"></el-input> -->
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
              :on-change="saveImage">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="found_notice_image_visible">
              <img width="100%" :src="found_notice_image_url" alt="">
            </el-dialog>
          </div>
        </el-form-item>
        <!-- <el-form-item label='图片'
                      class="label">
            <el-row :gutter="10">
              <el-col v-for="url in found_notice.images" :key="url" span="7">
                <el-image :key="url.url" :src="url.url" :preview-src-list="url.url" fit="scale-down" lazy ></el-image>
              </el-col>
            </el-row>
        </el-form-item> -->
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
                <!-- <i class="el-icon-circle-plus"
                   @click="handleCreate(scope.$index, scope.row)"
                   :disabled=notEdit></i> -->
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
        <!-- <el-form-item v-for="item in found_data[0].found_contact_info" :key="item.type" :label="item.type" class="label">
          <el-input v-model="item.content"
                    :readOnly=notEdit></el-input>
        </el-form-item> -->
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
      edit_contact_dialogFormVisible: false,
      create_contact_dialogFormVisible: false,
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
    this.changePage(1)
  },
  methods: {
    DeleteFoundNotice() {
      axios.delete('/found-notices/' + this.id + '/', {})
      .then((response) => {
        this.$router.push('/found-list')
      })
      .catch((error) => {
        alert('error:' + error)
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
          that.found_notice_images.splice(index, 1);
          that.found_notice.images.splice(index, 1);
          that.found_notice_origin.images.splice(index, 1);
          that.found_notice_images_urls.splice(index, 1);
          if(that.found_notice_images_urls.length < 3)
          {
            that.upload_show = false
          }
          console.log(that.found_notice.images)
        })
        .catch((error) => {
          alert('error:' + error)
        })
      axios.put('/found-notices/'+this.id+'/', this.found_notice_origin, {})
        .then((response) => {
          if(this.found_notice.images.length == 0)
          {
            this.upload_show = false
          }
        })
        .catch((error) => {
          this.$alert(error.response.data)
        })
      console.log(index)
      this.$message({
        type: 'success',
        message: '删除成功!'
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
      this.found_notice_images_urls.push({url:file.url})
      this.found_notice_images.push(file.raw)
      this.found_notice_image_change = true
      if(this.found_notice.images.length + this.found_notice_images.length > 3)
      {
        this.upload_show = true
      }
      console.log(this.found_notice_images)
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
      if(this.template_image_change == false)
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
        data.append('images', this.found_notice_images)
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
    enterEquipment: function (id) {
      this.$router.push({ name: 'equipment', params: { equipmentId: id } })
    },
    enterUser: function (id) {
      this.$router.push({ name: 'user', params: { userId: id } })
    }
  }
}
</script>
