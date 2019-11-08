<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/adminLayout/activeCodeList' }">激活码管理</el-breadcrumb-item>
      <el-breadcrumb-item>数量</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider />
    <el-row>
      <el-col :span="20">
        <el-input v-model="queryActiveCode" placeholder="请输入激活码" width="100%" />
      </el-col>
      <el-col :span="4">
        <el-select v-model="queryMode" placeholder="请选择">
          <el-option label="全部" :value="1" />
          <el-option label="已激活" :value="2" />
          <el-option label="未激活" :value="3" />
        </el-select>
      </el-col>
    </el-row>
    <el-divider />
    <el-table
      :data="computedTableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      border
      :stripe="true"
      style="width: 100%"
    >
      <el-table-column prop="active_code" label="邀请码" width="200" :show-overflow-tooltip="true" />
      <el-table-column prop="code_status" label="状态">
        <template slot-scope="scope">{{ scope.row.code_status | BooleanStrValue }}</template>
      </el-table-column>
    </el-table>
    <br>
    <div>
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="currentTotal"
        :page-sizes="[10,20 ,30, 50, 100]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
// import apiBaseUrl from 'apiBaseUrl'
import {
  getActiveList
} from '@/api/admin'
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      currentTotal: 0,
      queryMode: 1,
      queryActiveCode: ''
    }
  },
  computed: {
    computedTableData: {
      get() {
        let arrByZM = [] // 声明一个空数组来存放数据
        const arrByZM4RTN = []
        if (this.queryMode == 3) {
          // 未激活
          arrByZM = this.tableData.filter(item => !item.code_status)
        } else if (this.queryMode == 2) {
          // 已激活
          arrByZM = this.tableData.filter(item => item.code_status)
        } else {
          // 全部
          arrByZM = this.tableData
        }
        const queryCondition = this.queryActiveCode
        for (var i = 0; i < arrByZM.length; i++) {
          if (arrByZM[i].active_code.search(queryCondition) != -1) {
            arrByZM4RTN.push(arrByZM[i])
          }
        }

        return arrByZM4RTN
      },
      set(value) {
        const arr = []
        this.tableData.forEach(function(item, index) {
          arr.push(item)
        })
        return arr
      }
    },
    UsedComputedTableData: function() {
      const arr = []
      this.tableData.forEach(function(item, index) {
        if (item.code_status) {
          arr.push(item)
        }
      })
      return arr
    },
    UnusedComputedTableData: function() {
      const arr = []
      this.tableData.forEach(function(item, index) {
        if (!item.code_status) {
          arr.push(item)
        }
      })
      return arr
    }
  },
  mounted() {
    var key_code = this.$route.params.id
    this.requestData(key_code)
  },
  methods: {
    requestData(key_code) {
      // const url = `${apiBaseUrl}/v1/activationcodes/` + key_code // this.axios.get(url).
      getActiveList(key_code).then(
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
              default:
                console.log(err.data)
                console.log(err.data.data.message)
                this.$message.error(err.data.data.message)
            }
          }
        }
      )
    },

    handleSizeChange(val) {
      this.pageSize = val
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
