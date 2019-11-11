<!--
 * @Description: 页头
 * @Author: icony/精武陈真
 * @Date: 2019-11-06 20:09:51
 * @LastEditTime: 2019-11-11 11:13:06
 * @LastEditors: Duchin/梁达钦
 -->
<template>
  <div class="flexBox">
    <div>
      <img
        src="@/assets/imgs/solarfs_logo.png"
        class="image-logo"
      >
      <b>SolarFS</b>
    </div>
    <div class="flexItem" style="text-align: right;">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <!-- {{this.$store.getters.currentUser.email}} -->
          <i
            class="el-icon-menu"
          />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="account">账户管理</el-dropdown-item>
          <el-dropdown-item command="log">操作日志</el-dropdown-item>
          <template v-if="'admin'== this.$store.getters.currentUser.role">
            <el-dropdown-item command="admin">管理后台</el-dropdown-item>
          </template>
          <el-dropdown-item command="quit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapActions } from '@icony/vue-container/vuex'
export default {
  data() {
    return {
      user: 'admin',
      commandKey: ''
    }
  },
  methods: {
    handleCommand(command) {
      if (this.commandKey === command) {
        return
      } else {
        this.commandKey = command
      }
      switch (command) {
        case 'account':
          this.$router.push('/layout')
          break
        case 'log':
          this.$router.push({
            path: '/layout/actionLogList',
            query: {
              log: true
            }
          })
          break
        case 'admin':
          this.$router.push('/adminLayout/activeCodeList')
          break
        case 'quit':
          this.handleLogout()
          break
      }
    },
    handleLogout() {
      // 清除本地缓存，跳转到登录页面
      // let url = "/v1/user/logout"; this.axios.get(url)
      // console.log("关闭 url=" + url);
      this.logout().then(
        response => {
          console.log(response)
          this.$message.success('操作成功，退出登录...')
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
                this.$message.error(err.data.data.message)
            }
          }
        }
      )
    },
    ...mapActions({
      logout: 'user/logout'
    })
  }
}
</script>
<style lang="scss" scoped>
    .image-logo {
        width:35px;
        height: 35px;
        vertical-align: middle;
        margin-right: 10px;
    }

    .el-dropdown-link {
        font-size: 30px;
    }
</style>
