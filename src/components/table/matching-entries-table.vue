<template>
  <div>
    <el-card class="title-card">
      所有匹配信息
      <div class="edit">
        <el-button :id="id"
                    target="rent-application"
                    class="change"
                    @click="parameter_dialogFormVisible = true"
                    type="primary">修改匹配参数</el-button>
      </div>
    </el-card>
    <el-dialog class="edit_parameter" title="修改匹配参数" :visible.sync="parameter_dialogFormVisible" width="40%">
      <el-row>
        <el-col :span="12">
          <el-form label-width="180px">
            <el-form-item label="启事匹配阈值">
              <el-input-number v-model="edit_parameter.matching_threshold" :precision="1" :step="0.1" controls-position="right" :min="0" :max="1" size="mini" width="60%"></el-input-number>
            </el-form-item>
            <el-form-item label="启事“地点”权重">
              <el-input-number v-model="edit_parameter.notice_location_weight" :precision="1" :step="0.1" controls-position="right" :min="0" :max="10" size="mini" width="60%"></el-input-number>
            </el-form-item>
            <el-form-item label="启事“时间”权重">
              <el-input-number v-model="edit_parameter.notice_time_weight" :precision="1" :step="0.1" controls-position="right" :min="0" :max="10" size="mini" width="60%"></el-input-number>
            </el-form-item>
            <el-form-item label="启事“描述”权重">
              <el-input-number v-model="edit_parameter.notice_desc_weight" :precision="1" :step="0.1" controls-position="right" :min="0" :max="10" size="mini" width="60%"></el-input-number>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form label-width="120px">
            <el-form-item label="启事“其他”权重">
              <el-input-number v-model="edit_parameter.notice_extra_weight" :precision="1" :step="0.1" controls-position="right" :min="0" :max="10" size="mini" width="60%"></el-input-number>
            </el-form-item>
            <el-form-item label="物品“属性”权重">
              <el-input-number v-model="edit_parameter.prop_tag_weight" :precision="1" :step="0.1" controls-position="right" :min="0" :max="10" size="mini" width="60%"></el-input-number>
            </el-form-item>
            <el-form-item label="物品“描述”权重">
              <el-input-number v-model="edit_parameter.prop_desc_weight" :precision="1" :step="0.1" controls-position="right" :min="0" :max="10" size="mini" width="60%"></el-input-number>
            </el-form-item>
            <el-form-item label="物品“其他”权重">
              <el-input-number v-model="edit_parameter.prop_extra_weight" :precision="1" :step="0.1" controls-position="right" :min="0" :max="10" size="mini" width="60%"></el-input-number>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <div class="foot">
          <el-button @click="parameter_dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editMatchingParameters">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-card class="table-card">
      <el-table :data="matching_entries"
                stripe
                id="users-table"
                class="table"
                @row-click="enter"
                @sort-change='sortChange'>
        <el-table-column prop="id"
                         label="ID"
                         width="120"
                         sortable='custom'>
        </el-table-column>
        <el-table-column prop="lost_property_name"
                         label="失物名称"
                         width="150"
                         sortable='custom'
                         :show-overflow-tooltip='true'>
        </el-table-column>
        <el-table-column prop="lost_notice_description"
                         label="失物描述"
                         width="250"
                         sortable='custom'
                         :show-overflow-tooltip='true'>
        </el-table-column>
        <el-table-column prop="found_property_name"
                         label="拾物名称"
                         width="150"
                         sortable='custom'
                         :show-overflow-tooltip='true'>
        </el-table-column>
        <el-table-column prop="found_notice_description"
                         label="拾物描述"
                         width="250"
                         sortable='custom'
                         :show-overflow-tooltip='true'>
        </el-table-column>
        <el-table-column prop="matching_degree"
                         label="匹配相似度"
                         width="150">
        </el-table-column>
        <el-table-column prop="notified"
                         label="状态"
                         :filters="[{ text: '已通知', value: '已通知' }, { text: '未通知', value: '未通知' }]"
                         :filter-method="filterType"
                         width="130">
        </el-table-column>
        <el-table-column label="操作"
                         width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click.native.stop="handleMessage(scope.$index, scope.row)">通知</el-button>
          </template>
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
.foot{
  position: relative;
  top: -20px;
}
</style>

<script>
import Axios from 'axios'
import searchAndFilter from '../search&filter'
export default {
  components: {
    'search-filter': searchAndFilter
  },
  props: {
    id: Number,
    pageSize: Number,
    height: Number
  },
  data: function () {
    return {
      matching_entries: [],
      parameter_dialogFormVisible: false,
      edit_parameter: {},
      options: [
        { value: 'search', label: '全部搜索' },
        { value: 'submit_user__username', label: '筛选：举报者' },
        { value: 'user__username', label: '筛选：被举报者' },
        { value: 'type', label: '筛选：举报类型' },
        { value: 'verdict_type', label: '筛选：状态' }
      ],
      select: 'search',
      input: '',
      data: { count: 0 },
      Status: {
        GUI: "有罪",
        INN: "无罪",
        UNT: "未处理"
      },
      Types: {
        SCM: "诈骗行为",
        HRS: "恶意骚扰",
        ADV: "推销广告",
        PRN: "低俗色情",
        ILL: "违法信息",
        SPM: "垃圾内容",
        CPY: "侵权行为",
        OTH: "其他"
      },
      reports_notice: []
    }
  },
  created: function () {
    Axios.get('/matching-entries/', {
      headers: {
        Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
      }
    })
    .then((response) => {
      this.matching_entries = response.data.results
      for(let i=0;i<this.matching_entries.length;i++)
      {
        if(this.matching_entries[i].notified == false)
        {
          this.matching_entries[i].notified = "未通知"
        }
        else if(this.matching_entries[i].notified == true)
        {
          this.matching_entries[i].notified = "已通知"
        }
      }
    })
    .catch((error) => {
      alert('error:' + error)
    })
    Axios.get('/matching-hyperparameters/get-hyper/', {
      headers: {
        Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
      }
    })
    .then((response) => {
      this.edit_parameter = response.data
    })
    .catch((error) => {
      alert('error:' + error)
    })
  },
  methods: {
    editMatchingParameters() {
      Axios.post('/matching-hyperparameters/update-hyper/', this.edit_parameter, {
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
        }
      })
        .then((response) => {
          this.$message({
          type: 'success',
          message: '发送成功!'
        });
        location.reload()
      })
      .catch((error) => {
        alert('error:' + error)
      })
    },
    filterType(value, row) {
      return row.type === value;
    },
    handleMessage(value, row) {
      Axios.post('/matching-entries/'+row.id+'/matching-notify/', {
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
        }
      })
        .then((response) => {
          this.$message({
          type: 'success',
          message: '发送成功!'
        });
        location.reload()
      })
      .catch((error) => {
        alert('error:' + error)
      })
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
      Axios.get('/matching-entries', {
        params: {
          ordering: order_prop,
          offset: 0,
          limit: this.pageSize
        },
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
        }
      })
        .then((response) => {
          this.matching_entries = response.data.results
          for(let i=0;i<this.matching_entries.length;i++)
          {
            if(this.matching_entries[i].notified == "false")
            {
              this.matching_entries[i].notified = "未通知"
            }
            else if(this.matching_entries[i].notified == "true")
            {
              this.matching_entries[i].notified = "已通知"
            }
          }
        }).catch((error) => {
          // alert('error:' + error)
          console.log(error)
          this.$alert(error.response.data)
        })
    },
    enter: function (row) {
      // this.$router.push({ name: 'report', params: { reportId: row.id } })
    },
    searchAndFilter: function (select, input) {
      this.select = select
      this.input = input
      this.changePage(1)
    },
    changePage: function (page) {
      Axios.get('/reports', {
        params: {
          [this.select]: this.input,
          offset: (page - 1) * this.pageSize,
          limit: this.pageSize
        },
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getUserAccessToken
        }
      })
        .then((response) => {
          this.reports = response.data.results
          for(var i=0;i<this.reports.length;i++)
          {
            this.reports[i].created_at = this.extractTime(this.reports[i].created_at)
            this.reports[i].verdict_type = this.Status[this.reports[i].verdict_type]
            this.reports[i].type = this.Types[this.reports[i].type]
          }
        }).catch((error) => {
          // alert('error:' + error)
          console.log(error)
          this.$alert(error.response.data)
        })
    },
  }
}
</script>
