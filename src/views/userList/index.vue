<!--
 * @Description: 用户管理
 * @Author: icony/精武陈真
 * @Date: 2019-11-06 19:26:26
 * @LastEditTime: 2019-11-11 11:32:43
 * @LastEditors: Duchin/梁达钦
 -->
<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="float:left">用户管理</div>
      </el-col>
    </el-row>
    <el-divider />
    <el-row>
      <el-col :span="24">
        <el-input v-model="registEmail" placeholder="请输入注册邮箱" width="100%" />
      </el-col>
    </el-row>
    <el-divider />
    <el-table
      :data="computedTableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      border
      :stripe="true"
      style="width: 100%"
    >
      <el-table-column prop="mailbox" label="注册邮箱" width="200" />
      <el-table-column prop="administrators" label="管理员" width="80">
        <template slot-scope="scope">{{ scope.row.administrators | BooleanStrValue }}</template>
      </el-table-column>
      <el-table-column prop="instances_num" label="实例数量" width="80" />
      <el-table-column prop="activation_code" label="邀请码" />
      <el-table-column prop="user_status" label="状态" width="80">
        <template slot-scope="scope">{{ scope.row.user_status | BooleanStrValue }}</template>
      </el-table-column>
      <el-table-column prop="creation_time" label="创建时间" />
      <el-table-column prop="last_login_time" label="最后登录时间" />
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <div v-if="!scope.row.dock">
            <div style="float:left;">
              <div v-if="scope.row.user_status">
                <el-button type="text" size="small" @click="handleStatus(scope.row,2,false)">禁用</el-button>
              </div>
              <div v-else>
                <el-button type="text" size="small" @click="handleStatus(scope.row,1,true)">启用</el-button>
              </div>
            </div>
            <div style="float:left; margin-left:10px;">
              <div v-if="scope.row.administrators">
                <el-button
                  type="text"
                  size="small"
                  @click="handleAdministrator(scope.row,2,false)"
                >取消管理员</el-button>
              </div>
              <div v-else>
                <el-button
                  type="text"
                  size="small"
                  @click="handleAdministrator(scope.row,1,true)"
                >设置管理员</el-button>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <div>
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10,20 ,30, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="currentTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import {
  setUserStatus,
  setUserAdmin,
  getUserList
} from '@/api/admin'
export default {
  data() {
    return {
      tableData: [],
      registEmail: '',
      currentPage: 1,
      pageSize: 10,
      currentTotal: 0
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
    handleStatus(row, status, type) {
      // let url = `${apiBaseUrl}/v1/users/` + row.mailbox + "/status/" + type; // this.axios.put(url).
      setUserStatus(row.mailbox, type).then(
        response => {
          console.log('handleStatus-response', response)
          this.$message.info('操作成功')
          this.requestData() // 刷新数据
        },
        err => {
          console.log(err.data)
          this.$message.error(err.data.data.message)
        }
      )
    },
    handleAdministrator(row, status, type) {
      // const url = // `${apiBaseUrl}/v1/users/` + row.mailbox + "/administrator/status/" + type; // this.axios.put(url).
      setUserAdmin(row.mailbox, type).then(
        response => {
          console.log(response)
          this.$message.info('操作成功')
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

    requestData() {
      // let url = `${apiBaseUrl}/v1/users`; this.axios.get(url).
      getUserList().then(
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

