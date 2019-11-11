<!--
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2019-11-08 19:05:48
 * @LastEditTime: 2019-11-11 16:27:09
 * @LastEditors: Duchin/梁达钦
 -->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/adminLayout/instanceList' }">平台</el-breadcrumb-item>
      <el-breadcrumb-item>在线账户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider />
    <el-row>
      <el-col :span="12">
        <div style="float:left;margin:0px;">在线账户管理</div>
      </el-col>
      <el-col :span="12" style="text-align:right;">
        <el-dropdown>
          <el-button type="primary">
            操作
            <i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>启动</el-dropdown-item>
            <el-dropdown-item>关闭</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
            <el-dropdown-item>导入</el-dropdown-item>
            <el-dropdown-item>导出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-divider />

    <account-detail />
  </div>
</template>

<style>
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

<script>
import AccountDetail from '@/components/AccountCommon/AccountDetail.vue'
export default {
  components: {
    AccountDetail
  },
  methods: {
    handleClick() {
      alert('button click')
    }
  }
}
</script>
