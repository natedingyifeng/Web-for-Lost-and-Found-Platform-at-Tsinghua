// writen by xyh
<template>
  <div class = "info">
    <el-card class="title_card"
             style="font-size:24px;">
      {{'物品模板#' + this.property_template_list.id }}
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
                <el-select v-model="property_type_list.results[property_template_list.type-1].name"
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
        <el-divider>具体内容</el-divider>
        <el-form-item label='模板属性'
                      class="label">
          <el-tag v-for="item in template_fields" 
                  :disable-transitions="false"
                  :closable=!notEdit
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
              :on-change="saveImage">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="template_image_visible">
              <img width="100%" :src="template_image_url" alt="">
            </el-dialog>
          </div>
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
      upload_show:false
      // isAdmin: this.$store.getters.isAdmin
    }
  },
  created: function () {
    axios.get('/property-templates/' + this.id + '/', {})
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
             this.template_fields.push(arr)
          }
      })
      .catch((error) => {
        alert('error:' + error)
      })
    axios.get('/property-types', {})
      .then((response) => {
          this.property_type_list = response.data
      })
      .catch((error) => {
        alert('error:' + error)
      })
    this.changePage(1)
  },
  methods: {
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
        this.ruleForm.coverFile = self.blobToFile(imgblob, filename);
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
        json[this.template_fields[i].name]=""
      }
      this.property_template_list.fields = json
      if(this.template_image_change == false)
      {
        this.property_template_list.thumbnail = this.ruleForm.coverFile.raw
        axios.put('/property-templates/'+this.id+'/', this.property_template_list, {})
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
        axios.put('/property-templates/'+this.id+'/', data, {})
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
