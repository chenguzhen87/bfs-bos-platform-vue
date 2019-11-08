<template>
  <div>
    <center>
      <el-row>
        <div class="login">
          <el-tabs type="border-card">
            <span style="font-size:30px;">在线账户管理系统</span>
            <br>
            <br>
            <span style="font-size:30px;margin:50px;">注册</span>
            <br>
            <br>
            <br>

            <el-form ref="emailForm" :model="emailForm">
              <el-form-item
                style="text-align:left;width:80%"
                prop="email"
                :rules="[
                  { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                  { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]"
              >
                <el-input v-model="emailForm.email" placeholder="请选输入电子邮箱" />
                <br>
              </el-form-item>
              <el-form-item>
                <el-button type="warning" @click="preStep('emailForm')">上一步</el-button>
                <el-button type="primary" @click="next('emailForm')">下一步</el-button>
              </el-form-item>
            </el-form>
          </el-tabs>
        </div>
      </el-row>
    </center>
  </div>
</template>
<script>
import {
  base64Encoder,
  base64Decoder
} from '@/filters/convert'
import {
  registrationEmail
} from '@/api/user.js'
export default {
  name: 'RegistrationEmail',
  data() {
    return {
      emailForm: {
        email: ''
      },
      invitationCode: ''
    }
  },
  mounted() {
    // 邀请码
    this.invitationCode = base64Decoder(this.$route.query.invitationCode)
  },
  methods: {
    next(formName) {
      const email = this.emailForm.email
      // let url = `${apiBaseUrl}/v1/users/mailbox/check`; //  this.axios.post(url, data).
      // console.log("the query url:=" + url);
      const data = {
        mailbox: email
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          registrationEmail(data).then(
            response => {
              console.log(response)
              console.log('get the bfid then jump to the page .')
              console.log(response.data.data.message)
              const status = response.data.data.message
              if (status === 'success') {
                this.$router.push({
                  path: '/register/registrationCode',
                  query: {
                    invitationCode: base64Encoder(this.invitationCode),
                    email: base64Encoder(email)
                  }
                })
              }
              console.log('submit!')
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
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    preStep(formName) {
      this.$router.push('/register')
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import "../../../assets/styles/main_ui.css"; */
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
