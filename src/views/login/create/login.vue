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
              <el-form-item style="text-align:left;width:80%" prop="email">
                <el-input v-model="loginForm.email" placeholder="请选输入登录邮箱" />
                <br>
                <span>
                  还没有账户？
                  <el-link type="primary" @click="jumpRegistration()">创建一个</el-link>
                </span>
              </el-form-item>
              <el-form-item style>
                <el-button type="warning" @click="goHome()">返回主页</el-button>
                <el-button type="primary" @click="next('loginForm')">下一步</el-button>
              </el-form-item>
            </el-form>
          </el-tabs>
        </div>
      </el-row>
    </center>
  </div>
</template>
<script>
// import apiBaseUrl from "apiBaseUrl";
import skypegmwcnHomeUrl from 'skypegmwcnHomeUrl'
import {
  base64Encoder
} from '@/filters/index'
import {
  loginOne
} from '@/api/user.js'
export default {
  name: 'Loginone',
  data() {
    return {
      loginForm: {
        email: ''
      },
      rules: {
        email: [
          { required: true, message: '登录邮箱不能为空', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  methods: {
    goHome() {
      window.open(`${skypegmwcnHomeUrl}`, '_self')
      // this.$router.push({ path:"/" });
    },
    next(formName) {
      const email = this.loginForm.email
      // let url = `/v1/users/mailbox`; this.axios.post(url, data)
      const data = {
        mailbox: email
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          loginOne(data).then(
            response => {
              console.log('longin-response', response)
              console.log(response.data)
              //  this.$router.push("/login/code");
              // debugger
              this.$router.push({
                path: '/login/logincode',
                query: {
                  email: base64Encoder(email)
                }
              })
            },
            err => {
              if (err.data) {
                switch (err.data.status) {
                  case 401:
                    console.log('拦截器统一处理...')
                  default:
                    console.log(err.data)
                    console.log(err.data.data.message)
                    this.$message.error(err.data.data.message)
                }
                // debugger
              }
            }
          )
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    jumpRegistration() {
      this.$router.push('/register')
    }
  }
  // beforeRouteEnter: (to, from, next) => {
  //   console.log("login router is call ... ");
  //   next(vm => {
  //     vm.$store.dispatch("setUser", null);
  //   });
  // }
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
