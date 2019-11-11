<!--
 * @Description: 实例管理
 * @Author: icony/精武陈真
 * @Date: 2019-11-06 19:26:26
 * @LastEditTime: 2019-11-08 19:18:36
 * @LastEditors: Duchin/梁达钦
 -->
<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="float:left">实例管理</div>
      </el-col>
    </el-row>
    <el-divider />
    <el-row>
      <el-col :span="20">
        <el-input v-model="registEmail" placeholder="请输入注册邮箱" width="100%" />
      </el-col>
      <el-col :span="4">
        <el-select v-model="instanceStatus" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />

        </el-select>
      </el-col>
    </el-row>
    <el-divider />
    <el-table
      ref="multipleTable"
      :data="computedTableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      border
      :stripe="true"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="在线账户地址" width="120">
        <template slot-scope="scope">
          <router-link
            class="nav-item"
            :to="'/adminLayout/instanceDetail/'+scope.row.mailbox"
          >{{ scope.row.name }}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="mailbox" label="注册邮箱" width="180" />
      <el-table-column prop="version" label="版本" />
      <el-table-column prop="cpu" label="cpu" />
      <el-table-column prop="mem" label="内存" />
      <el-table-column prop="disk" label="磁盘" />
      <el-table-column prop="stream" label="进/出流量">
        <template
          slot-scope="scope"
        >{{ scope.row.import_flow | EmptyReplace }}/{{ scope.row.export_flow| EmptyReplace }}</template>
      </el-table-column>
      <el-table-column prop="vm_status" label="状态" />
      <el-table-column prop="creation_time" label="创建时间" width="160" />
      <!-- <el-table-column prop="due_time" label="截止日期1"></el-table-column> -->
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleDel(scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="handleStart(scope.row)">启动</el-button>
          <el-button type="text" size="small" @click="handleClose(scope.row)">关闭</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <div style="float:left">
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
import {
  delInstance,
  setInstanceStatus,
  getInstanceList
} from '@/api/admin'
export default {
  data() {
    return {
      multipleSelection: [],
      tableData: [],
      registEmail: '',
      currentPage: 1,
      pageSize: 10,
      currentTotal: 0,
      options: [
        {
          value: '删除',
          label: '删除'
        },
        {
          value: '启动',
          label: '启动'
        },
        {
          value: '关闭',
          label: '关闭'
        }
      ],
      instanceStatus: ''
    }
  },
  computed: {
    computedTableData: {
      get() {
        // 声明一个空数组来存放数据
        const arrByZM4RTN = []
        const queryCondition = this.registEmail
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].mailbox.search(queryCondition) != -1) {
            arrByZM4RTN.push(this.tableData[i])
          }
        }

        console.log('user ??....')
        console.log(arrByZM4RTN)
        return arrByZM4RTN
      },
      set(value) {
        const arr = []
        this.tableData.forEach(function(item, index) {
          arr.push(item)
        })
        return arr
      }
    }
  },
  mounted() {
    this.requestData()
  },
  methods: {
    handleDel(row) {
      console.log(row)
      if (row.vm_status == 'closed') {
        // let url =`${apiBaseUrl}/v1/virtualmachines/` + row.name +"/mailbox/" +row.Mailbox; // this.axios.delete(url)
        delInstance(row.name, row.Mailbox).then(
          response => {
            console.log(response)
            this.$message.info('删除成功')
            this.requestData() // 刷新数据
          },
          err => {
            this.requestError(err)
          }
        )
      } else {
        this.$message.info('账户状态不正确，不允许删除。')
      }
    },
    handleStart(row) {
      // let url =`${apiBaseUrl}/v1/virtualmachines/` + row.name + "/status/true" ; this.axios.put(url, data)
      const data = {}
      const type = true
      setInstanceStatus(row.name, type, data).then(
        response => {
          console.log(response)
          this.$message.info('启动成功')
          this.requestData() // 刷新数据
        },
        err => {
          this.requestError(err)
        }
      )
    },
    handleClose(row) {
      // let url = `${apiBaseUrl}/v1/virtualmachines/` + row.name + "/status/false" ; // this.axios.put(url, data).
      const data = {}
      const type = false
      setInstanceStatus(row.name, type, data).then(
        response => {
          console.log(response)
          this.$message.info('关闭成功')
          this.requestData() // 刷新数据
        },
        err => {
          this.requestError(err)
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
    },
    getData() {
      console.log(this.multipleSelection)
    },
    requestData() {
      // let url = `${apiBaseUrl}/v1/virtualmachines`; // this.axios.get(url).
      getInstanceList().then(
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
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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

