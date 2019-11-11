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

            <el-form ref="verificationForm" :model="verificationForm" :rules="rules">
              <el-form-item style="text-align:left;width:80%" prop="code">
                <el-input v-model="verificationForm.code" placeholder="请选输入验证码" />
                <br>
                <span>验证码已发送邮箱</span>
                <br>
                <span>没收到，请检查垃圾邮件</span>
              </el-form-item>
              <el-form-item>
                <el-button type="warning" @click="resetEmail">更换邮箱</el-button>
                <el-button type="primary" @click="register('verificationForm')">注册</el-button>
              </el-form-item>
            </el-form>
          </el-tabs>
        </div>
      </el-row>
    </center>
  </div>
</template>
<script>
import { mapMutations } from '@icony/vue-container/vuex'
import { UPDATE_USER_INFO } from '@/utils/mutation-types'
import {
  registrationCode
} from '@/api/user.js'
import {
  base64Encoder,
  base64Decoder
} from '@/filters/convert'
export default {
  name: 'RegistrationCode',
  data() {
    return {
      verificationForm: {
        code: ''
      },
      invitationCode: '',
      email: '',
      rules: {
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    // 邀请码
    this.invitationCode = base64Decoder(this.$route.query.invitationCode)
    this.email = base64Decoder(this.$route.query.email)
    console.log('invitationCode=' + this.invitationCode)
    console.log('email=' + this.email)
  },
  methods: {
    register(formName) {
      // const url = `${apiBaseUrl}/v1/user/register` //this.axios.post(url, data).
      const data = {
        activation_code: this.invitationCode,
        mailbox: this.email,
        verification_code: this.verificationForm.code
      }

      console.log('data=', data)
      this.$refs[formName].validate(valid => {
        if (valid) {
          registrationCode(data).then(
            response => {
              console.log(response.data)
              this.UPDATE_USER_INFO(response)
              this.$message({
                message: '注册成功，将为你登录并跳转主页.....',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.$router.push('/layout')
                }
              })
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
                    this.$message.error('注册失败')
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
    resetEmail() {
      this.$router.push({
        path: '/register/registrationEmail',
        query: {
          invitationCode: base64Encoder(this.invitationCode)
        }
      })
    },
    ...mapMutations('user', [UPDATE_USER_INFO])
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
