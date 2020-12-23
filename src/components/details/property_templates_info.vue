// writen by xyh
<template>
  <div class = "info">
    <el-card class="title_card"
             style="font-size:24px;">
      {{'物品模板#' + this.property_template_list.id }}
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
                      @click="DeleteTemplateConfirm"
                      type="danger">删除</el-button>
      </div>
    </el-card>
    <el-dialog class="create_contact" title="添加属性" :visible.sync="create_field_dialogFormVisible">
      <el-form label-width="100px">
        <el-form-item label="属性名称">
          <el-input autocomplete="off" v-model="create_field.name"></el-input>
        </el-form-item>
        <el-form-item label="属性权重">
          <el-input autocomplete="off" v-model="create_field.details"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="foot">
          <el-button @click="create_field_dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="createField">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog class="edit_contact" title="修改属性" :visible.sync="edit_field_dialogFormVisible">
      <el-form label-width="100px">
        <el-form-item label="属性名称">
          <el-input autocomplete="off" v-model="edit_field.name"></el-input>
        </el-form-item>
        <el-form-item label="属性名称">
          <el-input autocomplete="off" v-model="edit_field.details"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="foot">
          <el-button @click="edit_field_dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editField">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-card class='card'>
      <el-form class="form"
               label-width="100px">
        <el-divider>基本信息</el-divider>
        <el-form-item label='ID'>
          <el-row>
            <el-col span="5">
              <el-input v-model="property_template_list.id"
                          :disabled="true"></el-input>
            </el-col>
            <el-col span="8">
              <el-form-item label='物品名称'>
                <el-input v-model="property_template_list.name"
                          :disabled=notEdit
                          style="width:100%;"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label='物品种类'
                      class="label">
                <el-select v-model="property_type_list.results[template_type].name"
                          :disabled=notEdit>
                  <el-option v-for="item in property_type_list.results"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label='图片'
                      class="label">
          <div style="text-align: initial;margin-top: 20px;">
            <el-upload
              :class="{is_hidden:upload_show}"
              action="none"
              :on-preview="handleTemplateImagePreview"
              :on-remove="handleTemplateImageRemove"
              :auto-upload="false"
              :limit="1"
              :on-exceed="handleExceed"
              list-type="picture-card"
              :file-list="template_images"
              :on-change="saveImage"
              :disabled=notEdit>
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="template_image_visible">
              <img width="100%" :src="template_image_url" alt="">
            </el-dialog>
          </div>
        </el-form-item>
        <el-divider>物品属性</el-divider>
        <el-form-item label=''
                      class="label"
                      label-width="130px">
          <el-table
            :data="template_fields"
            style="width: 80%">
            <el-table-column
              prop="name"
              label="名称"
              width="330">
            </el-table-column>
            <el-table-column
              prop="details"
              label="权重"
              width="330">
            </el-table-column>
            <el-table-column>
              <template slot="header" slot-scope="scope">
                操作
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-plus"
                  @click="handleFieldCreate(scope.$index, scope.row)"
                  circle
                  :disabled=notEdit></el-button>
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleFieldEdit(scope.$index, scope.row)" :disabled=notEdit>编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleFieldDelete(scope.$index, scope.row)" :disabled=notEdit>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
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
      property_template_list: null,
      property_type_list: [],
      template_fields_keys: [],
      template_fields: [],
      // eslint-disable-next-line eqeqeq
      isrenter: false,
      // eslint-disable-next-line eqeqeq
      isborrower: false,
      isAdmin: true,
      notEdit: true,
      inputVisible: false,
      inputValue: '',
      ruleForm: {
        coverUrl: "",
        coverFile: ""
      },
      inputVisible: false,
      inputValue: '',
      ruleForm: {
        coverUrl: "",
        coverFile: ""
      },
      template_images: [],
      template_image_visible: false,
      template_image_url: '',
      template_image_change: false,
      upload_show:false,
      create_field_dialogFormVisible: false,
      edit_field_dialogFormVisible: false,
      edit_field_id: -1,
      field_show: [],
      edit_field: {
        name: "",
        details: ""
      },
      create_field: {
        name: "",
        details: ""
      },
      template_type: ""
      // isAdmin: this.$store.getters.isAdmin
    }
  },
  created: function () {
    axios.get('/property-templates/' + this.id + '/', {
      headers: {
        Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
      }
    })
      .then((response) => {
          this.property_template_list = response.data
          this.imgUrlToFile(this.property_template_list.thumbnail)
          this.template_images.push({url: this.property_template_list.thumbnail})
          if(this.template_images.length != 0)
          {
            this.upload_show = true
          }
          console.log(this.upload_show)
          this.template_fields_keys = Object.keys(this.property_template_list.fields)
          for(var i=0;i<this.template_fields_keys.length;i++)
          {
             var arr = {}
             arr["name"] = this.template_fields_keys[i]
             arr["details"] = this.property_template_list.fields[this.template_fields_keys[i]]
             this.template_fields.push(arr)
          }
      })
      .catch((error) => {
        alert('error:' + error)
      })
    axios.get('/property-types/', {})
      .then((response) => {
          this.property_type_list = response.data
          for(let i=0;i<this.property_type_list.results.length;i++)
          {
            if(this.property_template_list.type == this.property_type_list.results[i].id)
            {
              this.template_type = i
            }
          }
      })
      .catch((error) => {
        alert('error:' + error)
      })
    // this.changePage(1)
  },
  methods: {
    createField() {
      let tem = JSON.parse(JSON.stringify(this.create_field))
      this.template_fields.push(tem)
      this.create_field.name = ""
      this.create_field.details = ""
      this.create_field_dialogFormVisible = false
    },
    editField() {
      let tem = JSON.parse(JSON.stringify(this.edit_field))
      this.$set(this.template_fields, this.edit_field_id, tem)
      this.edit_field.name = ""
      this.edit_field.details = ""
      this.edit_field_dialogFormVisible = false
    },
    handleFieldEdit(index, row) {
      this.edit_field_dialogFormVisible = true
      this.edit_field_id = index
    },
    handleFieldCreate(index, row) {
      this.create_field_dialogFormVisible = true
    },
    handleFieldDelete(index, row) {
      this.template_fields.splice(index, 1)
    },
    DeleteTemplateConfirm() {
      this.$confirm('此操作将删除该模板, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.DeleteTemplate()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      return false
    },
    DeleteTemplate(){
      axios.delete('/property-templates/' + this.id + '/', {
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
        }
      })
      .then((response) => {
        this.$router.push('/property-types-list')
      })
      .catch((error) => {
        alert('error:' + error)
      })
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
    },
    imgUrlToFile(url) {
      var self = this;
      var imgLink = url;
      var tempImage = new Image();
      //如果图片url是网络url，要加下一句代码
      tempImage.crossOrigin = "*";
      tempImage.onload = function() {
        var base64 = self.getBase64Image(tempImage);
        var imgblob = self.base64toBlob(base64);
        var filename = self.getFileName(self.ruleForm.coverUrl);
        self.ruleForm.coverFile = self.blobToFile(imgblob, filename);
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
    handleClose(tag) {
      this.template_fields.splice(this.template_fields.indexOf(tag), 1);
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
        this.template_fields.push({name: inputValue});
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    handleTemplateImagePreview(file) {
      this.template_image_url = file.url
      this.template_image_visible = true
    },
    handleTemplateImageRemove(file) {
      this.template_images.splice(this.template_images.indexOf({url:file.url}), 1);
      if(this.template_images.length == 0)
      {
        this.upload_show = false
      }
    },
    saveImage(file,fileList) {
      this.template_images.push({url:file.url})
      this.property_template_list.thumbnail=file
      this.template_image_change = true
      if(this.template_images.length != 0)
      {
        this.upload_show = true
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    change: function () {
      this.notEdit=false
    },
    confirm: function () {
      var json = {}
      for(var i=0;i<this.template_fields.length;i++)
      {
        json[this.template_fields[i].name]=this.template_fields[i].details
      }
      this.property_template_list.fields = json
      if(true)
      {
        this.property_template_list.thumbnail = this.ruleForm.coverFile.raw
        axios.put('/property-templates/'+this.id+'/', this.property_template_list, {
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
          }
        })
        .then((response) => {
          location.reload()
        })
        .catch((error) => {
          this.$alert(error.response.data)
        })
      }
      else
      {
        let data=new FormData();
        data.append('name', this.property_template_list.name)
        data.append('type', this.property_template_list.type)
        data.append('thumbnail', this.property_template_list.thumbnail.raw)
        data.append('fields', JSON.stringify(this.property_template_list.fields))
        axios.put('/property-templates/'+this.id+'/', data, {
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
          }
        })
        .then((response) => {
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
