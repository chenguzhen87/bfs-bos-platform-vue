<!--
 * @Description: 操作日志
 * @Author: icony/精武陈真
 * @Date: 2019-11-06 19:26:26
 * @LastEditTime: 2019-11-08 17:25:55
 * @LastEditors: Duchin/梁达钦
 -->
<template>
  <div style="padding-left:10px;">
    <el-row>
      <el-col :span="24">
        <div style="float:left;padding-left:10px;">操作日志</div>
      </el-col>
    </el-row>
    <el-divider />
    <el-row>
      <el-col :span="24">
        <el-form ref="logForm" :model="logForm" label-width="80px">
          <div style="float:left;">
            <div style="float:left;text-align:center;padding-left:10px;">起止时间:</div>
            <div class="block" style="float:left;">
              <el-date-picker
                v-model="logForm.dateConditions"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </div>
            <div style="float:left;">
              <el-select v-model="logForm.optionType" placeholder="请选择">
                <el-option label="全部" value="all" />
                <el-option label="创建" value="create" />
                <el-option label="启动" value="start" />
                <el-option label="关闭" value="closed" />
                <el-option label="删除" value="delete" />
                <el-option label="登陆" value="login" />
                <el-option label="登出" value="logout" />
              </el-select>
            </div>
            <div style="float:left;">
              <el-input v-model="logForm.queryCondition" placeholder="请输入内容" />
            </div>
            <div style="float:left;">
              <el-button round @click="querySubmit()">查询</el-button>
            </div>
          </div>
        </el-form>
      </el-col>
    </el-row>
    <el-divider />
    <el-table
      :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      border
      :stripe="true"
      style="width: 100%"
    >
      <el-table-column prop="remote_addr" label="操作ip" />
      <!--<el-table-column prop="account_address" label="在线账户"></el-table-column> -->
      <el-table-column prop="Mailbox" label="邮箱" />
      <el-table-column prop="operation_type" label="操作">
        <template slot-scope="scope">{{ scope.row.operation_type | LogOptionType }}</template>
      </el-table-column>
      <el-table-column prop="operation_time" label="操作时间" />
    </el-table>
    <br>
    <div>
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10,20 ,30, 50, 100]"
        :page-size="pageSize"
        :total="currentTotal"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
// import apiBaseUrl from 'apiBaseUrl'
import {
  base64Encoder,
  formatDate
} from '@/filters/convert'
import {
  getLogList
} from '@/api/center'
export default {
  name: 'ActionLogList',
  data() {
    return {
      logType: this.$route.query.log || 'true',
      logForm: {
        queryCondition: '',
        dateConditions: [],
        optionType: ''
      },
      tableData: [],
      registEmail: '',
      currentPage: 1,
      pageSize: 10,
      currentTotal: 0
    }
  },
  mounted() {
    const data = {
      end_time: '',
      operation_type: '',
      start_time: ''
    }
    this.requestData(data)
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
    querySubmit() {
      // 查询提交
      const date1 = this.logForm.dateConditions
      let start = ''
      let end = ''

      if (date1 != null && date1.length == 2) {
        start = formatDate(date1[0])
        end = formatDate(date1[1])
      }

      const data = {
        end_time: end,
        operation_type: this.logForm.optionType,
        start_time: start
      }
      if (this.logForm.optionType == 'all') {
        data.operation_type = ''
      }
      // this.$message("---******");

      console.log('the query data')
      console.log(data)
      this.requestData(data)
    },
    // 请求加载数据
    requestData(data) {
      const base64Mailbox = base64Encoder(this.$store.getters.currentUser.email)
      // console.log('user log query :the mailbox is =' + base64Mailbox)
      // let url = `${apiBaseUrl}/v1/audits/`+base64Mailbox; // this.axios.post(url, data).
      const mailbox = this.logType === 'true' ? base64Mailbox : ''
      getLogList(mailbox, data).then(
        response => {
          console.log(response)
          this.tableData = response.data.data
          this.currentTotal = this.tableData.length
        },
        err => {
          if (err.data) {
            switch (err.data.status) {
              case 401:
                console.log('拦截器统一处理...')
                break
              default:
                console.log(err.data)
                console.log(err.data.data.message)
                this.$message.error('数据加载失败')
            }
          }
        }
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
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
/**dropdown*/
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
