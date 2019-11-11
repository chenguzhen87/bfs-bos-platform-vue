<!--
 * @Description: 账户
 * @Author: icony/精武陈真
 * @Date: 2019-11-06 19:01:37
 * @LastEditTime: 2019-11-11 14:19:33
 * @LastEditors: Duchin/梁达钦
 -->
<template>
  <div style="padding:10px;">
    <el-row>
      <el-col :span="12" style="text-align:left; font-size:16pt;">在线账户管理</el-col>
      <el-col :span="12" style="text-align:right;">
        <account-region :show.sync="show" @changenext="changenext" />
        <account-secret
          :center-visible.sync="centerVisible"
          :temporary-password="temporaryPassword"
          @refreshData="refreshData"
        />
        <component :is="comname" />
        <div>
          <div v-if="hasAccount">
            <el-dropdown split-button type="primary" @command="handleCommand">
              操作
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="start">启动</el-dropdown-item>
                <el-dropdown-item command="close">关闭</el-dropdown-item>
                <el-dropdown-item command="del">删除</el-dropdown-item>
                <el-dropdown-item command="back-up">备份</el-dropdown-item>
                <el-dropdown-item command="restore">还原</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div v-else>
            <el-button type="success" @click="open">创建在线账户</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-divider />
    <div v-if="hasAccount">
      <account-detail />
    </div>
    <div v-else>
      <el-row>
        <el-col :span="24">
          <p>创建一个吧!</p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
<style>
.theLineHeight {
  padding-top: 10px;
}
</style>
<script>
import AccountSecret from '@/components/accountDialog/AccountSecret.vue'
import AccountRegion from '@/components/accountDialog/AccountRegion.vue'
import AccountDetail from '@/components/accountCommon/AccountDetail.vue'
import { mapActions } from '@icony/vue-container/vuex'
// import apiBaseUrl from 'apiBaseUrl'
import {
  startAccount,
  shutAccount,
  deleteAccount,
  getAccount
} from '@/api/center.js'
export default {
  name: 'Account',
  components: {
    AccountRegion,
    AccountSecret,
    AccountDetail
  },
  data() {
    return {
      comname: '',
      show: false,
      centerVisible: false,
      vm_name: '',
      mailbox: '',
      temporaryPassword: '',
      currentVM: ''
    }
  },
  computed: {
    hasAccount: function() {
      if (this.currentVM == null || this.currentVM == '') {
        // 为空或者不存在；代表没有vm
        return false
      } else {
        return true
      }
    }
  },
  mounted() {
    // console.log(this.$store.getters.currentUser);
    var email = this.getEmail()
    this.requestData(email)
    // 获取一下token
    console.log('userToken=' + this.$store.getters.currentUser.token)
    console.log('vmname=' + this.vm_name)
  },
  methods: {
    getEmail() {
      var email = this.$route.params.id
      if (typeof email === 'undefined') {
        // 个人账户管理
        // let user = this.$store.state.currentUser;
        const user = this.$store.getters.currentUser
        email = user.email
      } else {
        // 后台实例管理
      }
      return email
    },
    handleCommand(command) {
      console.log('this.vm_name=' + this.vm_name)
      this.mailbox = this.getEmail() // 从store里面获取当前登录token数据
      switch (command) {
        case 'start':
          this.handleStartAccount()
          break
        case 'close':
          this.handleShutAccount()
          break
        case 'del':
          this.handleDeleteAccount()
          break
        case 'back-up':
          this.$message('备份功能暂时未开发')
          break
        case 'restore':
          this.$message('还原功能暂时未开发')
          break
      }
    },
    handleStartAccount() {
      if (
        (this.mailbox === '' || this.mailbox === null) &&
          (this.vm_name === null || this.vm_name === '')
      ) {
        this.$message.error('故障:参数传递失败。需要重新登录')
        this.$router.push('/login')
        return false
      }
      // 启动
      // console.log('启动 url=' + url)const url = `${apiBaseUrl}` + '/v1/virtualmachines/' + this.vm_name + '/status/true' // this.axios.put(url, data)

      const data = {
        mailbox: this.mailbox,
        name: this.vm_name,
        running_status: true
      }

      startAccount(this.vm_name, data).then(
        response => {
          console.log(response)
          this.$message.success('操作成功，启动中...')
        },
        err => {
          this.requestError(err)
        }
      )
    },
    handleShutAccount() {
      if (this.vm_name == null || this.vm_name == '') {
        this.$message.error('故障:参数传递失败。需要重新登录')
        this.$router.push({
          path: '/login'
        })
        return false
      }
      // // 关闭
      // const url = `${apiBaseUrl}` + '/v1/virtualmachines/' + this.vm_name + '/status/false' // this.axios.put(url)
      // console.log('关闭 url=' + url)
      shutAccount(this.vm_name).then(
        response => {
          console.log(response)
          this.$message.success('操作成功，关闭中...')
        },
        err => {
          this.requestError(err)
        }
      )
    },
    handleDeleteAccount() {
      if (this.vm_name == null || this.vm_name == '') {
        this.$message.error('故障:参数传递失败。需要重新登录')
        this.$router.push({
          path: '/login'
        })
        return false
      } else {
        console.log('delete ....')
      }
      // 删除
      // console.log('删除 url=' + url) const url = `${apiBaseUrl}` + '/v1/virtualmachines/' + this.vm_name + '/mailbox/' + this.getEmail() // this.axios.delete(url).

      deleteAccount(this.vm_name, this.getEmail()).then(
        response => {
          console.log(response)
          this.$message.success('操作成功,删除中...')
          this.requestData(this.getEmail())
        },
        err => {
          this.requestError(err)
        }
      )
    },
    open() {
      this.show = true
      this.comname = 'AccountRegion'
    },
    clear() {
      this.comname = ''
    },
    changenext(data) {
      this.temporaryPassword = data.temporary_password
      this.centerVisible = true
      this.comname = data.comname

      console.log(
        'this.comname=' +
          this.comname +
          '; and the centerVisible=' +
          this.centerVisible +
          ';temporaryPassword=' +
          this.temporaryPassword
      )
    },
    refreshData(data) {
      console.log('requestData....' + data.email)
      this.requestData(data.email)
    },
    requestData(email) {
      if (email == null || email == '') {
        this.$alert('用户失效，请重新登录。')
        this.logout()
      }
      // const url = `/v1/virtualmachines/account/` + email // this.axios.get(url)
      getAccount(email).then(
        response => {
          console.log(response)
          if (
            typeof response.data.data === undefined ||
            response.data.data == null
          ) {
            this.currentVM = ''
          } else {
            this.vm_name = response.data.data.vm_instance_vo.name
            this.currentVM = this.vm_name
            console.log('this.vm_name=' + this.vm_name)
          }
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
    },
    ...mapActions({
      logout: 'user/logout'
    })
  }
}
</script>

