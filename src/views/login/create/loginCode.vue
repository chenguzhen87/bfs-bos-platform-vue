<template>
  <div>
    <center>
      <el-row>
        <div class="login">
          <el-tabs type="border-card">
            <span style="font-size:30px;">在线账户管理系统</span>
            <br>
            <br>
            <span style="font-size:30px;margin:50px;">登录</span>
            <br>
            <br>
            <br>

            <el-form ref="loginForm" :model="loginForm" :rules="rules">
              <el-form-item style="text-align:left;width:80%" prop="code">
                <el-input v-model="loginForm.code" placeholder="请选输入验证码" />
                <br>
                <span>验证码已发送邮箱</span>
                <br>
                <span>没收到，请检查垃圾邮件</span>
              </el-form-item>
              <el-form-item>
                <el-button type="warning" plain @click="changeEmail()">更换邮箱</el-button>
                <el-button type="primary" @click="onSubmit('loginForm')">登录</el-button>
              </el-form-item>
            </el-form>
          </el-tabs>
        </div>
      </el-row>
    </center>
  </div>
</template>
<script>
import { mapActions } from '@icony/vue-container/vuex'
import {
  base64Decoder
} from '@/filters/index'
export default {
  name: 'Logincode',
  data() {
    return {
      loginForm: {
        code: ''
      },
      email: '',
      rules: {
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.email = base64Decoder(this.$route.query.email)
  },
  methods: {
    onSubmit(formName) {
      const verificationCode = this.loginForm.code
      // let url = `/v1/user/login`;this.axios.post(url, data)
      const data = {
        mailbox: this.email,
        verification_code: verificationCode
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login(data).then(
            response => {
              // print login
              if (response) {
                this.$router.push({ path: '/layout' })
              }
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
                    this.$message.error('登录失败：' + err.data.data.message)
                }
              }
            }
          )
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    changeEmail() {
      this.$router.push('/login')
    },
    ...mapActions({
      login: 'user/login'
    })
  }
}
</script>
<style lang="scss" scoped>
body {
  margin: 0px;
}

.login {
  height: auto;
  width: 500px;
  /**border: solid 1px #0F0F0F;*/
  margin-top: 100px;
  padding: 30px;
}
</style>
