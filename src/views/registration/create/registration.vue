<template>
  <div>
    <center>
      <el-row>
        <div style="heigth:300px;width:500px;margin-top:100px;padding:30px;">
          <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="邀请码激活" name="first">
              <div style="margin-top:30px;">
                <span style="font-size:30px;">在线账户管理系统</span>
                <br>
                <br>
                <span style="font-size:30px;margin:50px;">注册</span>
                <br>
                <br>
                <br>
                <el-form ref="registerForm" :model="registerForm" :rules="rules">
                  <el-form-item style="text-align:left;width:80%" prop="invitationCode">
                    <el-input v-model="registerForm.invitationCode" placeholder="请选输入邀请码" />
                  </el-form-item>

                  <el-form-item style="text-align:left;padding-left:44px;">
                    <span>
                      <el-link type="primary" :href="invitationCodeUrl" target="_blank">哪里获取邀请码？</el-link>
                    </span>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="warning" @click="goHome()">返回主页</el-button>
                    <el-button type="primary" @click="next('registerForm')">下一步</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="付费用户" name="second" :disabled="true">配置管理</el-tab-pane>
            <el-tab-pane label="企业用户" name="third" :disabled="true">角色管理</el-tab-pane>
          </el-tabs>
        </div>
      </el-row>
      <br>
      <br>
    </center>
  </div>
</template>
<script>
// import skypegmwcnHomeUrl from 'skypegmwcnHomeUrl'
// import invitationCodeUrl from 'invitationCodeUrl'
import {
  base64Encoder
} from '@/filters/convert'
import {
  registrationActive
} from '@/api/user.js'
export default {
  name: 'Register',
  data() {
    return {
      invitationCodeUrl: '',
      registerForm: {
        invitationCode: ''
      },
      rules: {
        invitationCode: [
          { required: true, message: '请输入邀请码', trigger: 'blur' }
        ]
      },
      activeName: 'first'
    }
  },
  mounted() {
    this.invitationCodeUrl = `${INVITATION_CODE_URL}`
  },
  methods: {
    goHome() {
      window.open(`${SKYPEGMWCN_HOME_URL}`, '_self')
    },
    next(formName) {
      const invitationCode = this.registerForm.invitationCode
      // let url = `${apiBaseUrl}/v1/activationcode/check/` + invitationCode; // this.axios.get(url).
      this.$refs[formName].validate(valid => {
        if (valid) {
          registrationActive(invitationCode).then(
            response => {
              console.log(response.data)
              const checkStatus = response.data.data.message
              if (checkStatus) {
                this.$router.push({
                  path: '/register/registrationEmail',
                  query: { invitationCode: base64Encoder(invitationCode) }
                })
              } else {
                this.$message.warning('此邀请码已被使用或不存在！')
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
                    this.$message.error('获取验证码校验失败')
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
    handleClick(tab, event) {
      console.log(tab, event)
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
