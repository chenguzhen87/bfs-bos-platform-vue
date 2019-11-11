<!--
 * @Description: 激活码管理
 * @Author: icony/精武陈真
 * @Date: 2019-11-06 19:26:26
 * @LastEditTime: 2019-11-11 16:39:18
 * @LastEditors: Duchin/梁达钦
 -->
<template>
  <div class="active-code-list">
    <el-row>
      <el-col :span="4">
        <div class="title" style="float:left">
          <span>激活码管理</span>
        </div>
      </el-col>
      <el-col :span="20">
        <div style="float:right;">
          <service-dialog :show.sync="show" @requestData="requestData" />
          <el-button @click="open">批量生产激活码</el-button>
        </div>
      </el-col>
    </el-row>
    <el-divider />
    <!-- <el-row>
      <el-col :span="24">
        <div style="float:left;">
          <span>项目统计</span>
        </div>
      </el-col>
    </el-row> -->
    <el-table
      :data="newTableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      border
      :stripe="true"
      style="width: 100%"
    >
      <el-table-column prop="new_key_code" label="ID" width="200" :show-overflow-tooltip="true">
        <!--<template slot-scope="scope">{{scope.row.code_key | base64Encoder}}</template> -->
      </el-table-column>
      <el-table-column prop="totalQuantity" label="总数" width="80">
        <template slot-scope="scope">
          <router-link
            class="nav-item"
            :to="'/adminLayout/activeQuantityList/'+scope.row.new_key_code"
          >{{ scope.row.used_code_num + scope.row.un_used_code_num }}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="used_code_num" label="已激活" width="80" />
      <el-table-column prop="un_used_code_num" label="未激活" width="80" />
      <el-table-column prop="activation_base_info.Mailbox" label="激活码管理员" />
      <el-table-column prop="activation_base_info.remarks" label="备注" />
      <el-table-column prop="activation_base_info.send_mail_status" label="自动发送邮件" width="80">
        <template
          slot-scope="scope"
        >{{ scope.row.activation_base_info.send_mail_status | BooleanStrValue }}</template>
      </el-table-column>
      <el-table-column prop="created_time" label="创建日期" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button class="table-stark" type="text" size="small" @click="handleSend(scope.row)">发送</el-button>
          <!--<el-button @click="handleDownload(scope.row)" type="text" size="small">下载</el-button>  -->
          <a class="table-download" style="text-decoration:none;color:87CEFA" :href="scope.row.url" download>下载</a>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <div>
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10,20 ,30, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pageSize"
        :total="currentTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import serviceDialog from '@/components/Admin/BatchCreateActiveCode.vue'
// import apiBaseUrl from 'apiBaseUrl'
import {
  sendActive,
  downloadActiveFile,
  getActiveList
} from '@/api/admin'
const Base64 = require('js-base64').Base64
export default {
  components: {
    serviceDialog
  },
  data() {
    return {
      tableData: [],
      show: false,
      projectQuery: '',
      currentPage: 1,
      pageSize: 10,
      currentTotal: 0
    }
  },
  computed: {
    newTableData: function() {
      var arr = []
      this.tableData.forEach(function(item, index) {
        item.new_key_code = Base64.encode(item.code_key)
        item.url =
          `${API_BASE_URL}/v1/activationcode/download/` +
          Base64.encode(item.code_key)
        arr.push(item)
      })
      return arr
    }
  },
  mounted() {
    this.requestData()
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
    },
    open() {
      this.show = true
    },
    handleSend(row) {
      console.log(row)
      // let url = `${apiBaseUrl}/v1/activationcode/resend/codeKey/` + row.new_key_code; // this.axios.get(url)
      sendActive(row.new_key_code).then(
        response => {
          console.log(response)
          this.$message.info('操作成功,请查看邮箱')
          // this.requestData(); //刷新数据
        },
        err => {
          this.requestError(err)
        }
      )
    },
    handleDownload(row) {
      console.log(row)
      // const url = `${apiBaseUrl}/v1/activationcode/download/` + row.new_key_code // this.axios.get(url).
      // console.log('downur=' + url)
      downloadActiveFile(row.new_key_code).then(
        response => {
          console.log(response)
          this.$message.info('操作成功,保存文件')
          // this.requestData(); //刷新数据
        },
        err => {
          this.requestError(err)
        }
      )
    },
    requestData() {
      // let url = `${apiBaseUrl}/v1/activationcodes`; // this.axios.get(url).
      getActiveList().then(
        response => {
          console.log(response)
          this.tableData = response.data.data
          this.currentTotal = this.tableData.length
        },
        err => {
          this.requestError(err)
        }
      )
    },
    requestError(err) {
      if (err.data) {
        switch (err.data.status) {
          case 401:
            console.log('拦截器统一处理...')
            break
          default:
            console.log(err.data)
            console.log(err.data.data.message)
            this.$message.error('操作失败:' + err.data.data.message)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.active-code-list{
  .title{
    height: 40px;
    line-height: 40px;
  }
  .table-stark{
    font-size: 14px;
    margin-right: 8px;
  }
  .table-download{
    font-size: 14px;
    color: #66b1ff;
  }
  .nav-item{
    color: #66b1ff;
  }
}

.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
/***/
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

