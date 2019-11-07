<!--
 * @Description: 页头
 * @Author: icony/精武陈真
 * @Date: 2019-11-06 20:09:51
 * @LastEditTime: 2019-11-06 20:11:44
 * @LastEditors: icony/精武陈真
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
          <!-- <div v-if="'admin'== this.$store.getters.currentUser.role">
                <el-dropdown-item command="console">管理后台</el-dropdown-item>
                </div> -->
          <el-dropdown-item command="quit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: 'admin'
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'account') {
        this.$router.push('/layout/account')
      } else if (command === 'log') {
        this.$router.push('/center/log')
      } else if (command === 'console') {
        this.$router.push('/console')
      } else if (command === 'quit') {
        // 清除本地缓存，跳转到登录页面
        const url = '/v1/user/logout'
        console.log('关闭 url=' + url)
        this.axios.get(url).then(
          response => {
            console.log(response)
            this.$message.success('操作成功，退出登录...')
            this.$router.push('/login')
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
      }
    }
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
