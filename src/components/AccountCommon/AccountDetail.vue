<template>
  <div>
    <div v-if="hasTheBosAccount">
      <el-row class="theLineHeight">
        <el-col :span="4" style="text-align:right;">在线账户地址：</el-col>
        <el-col :span="20" style="text-align:left;">
          <div style="border:solid 1px #5c5c5c;padding:3px;width:400px;height:20px;">
            <span>{{ account.address }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="theLineHeight">
        <el-col :span="4" style="text-align:right;">运营商：</el-col>
        <el-col :span="20" style="text-align:left;">
          <span>{{ account.operators }}</span>
        </el-col>
      </el-row>
      <el-row class="theLineHeight">
        <el-col :span="4" style="text-align:right;">大区：</el-col>
        <el-col :span="20" style="text-align:left;">
          <span>{{ account.region }}</span>
        </el-col>
      </el-row>
      <el-row class="theLineHeight">
        <el-col :span="4" style="text-align:right;">所在地：</el-col>
        <el-col :span="20" style="text-align:left;">
          <span>{{ account.location }}</span>
        </el-col>
      </el-row>
      <el-row class="theLineHeight">
        <el-col :span="4" style="text-align:right;">版本：</el-col>
        <el-col :span="20" style="text-align:left;">
          <span>{{ account.version }}</span>
        </el-col>
      </el-row>
      <el-row class="theLineHeight">
        <el-col :span="4" style="text-align:right;">状态：</el-col>
        <el-col :span="20" style="text-align:left;">
          <span>{{ account.status }}</span>
        </el-col>
      </el-row>
      <el-row class="theLineHeight">
        <el-col :span="4" style="text-align:right;">公钥地址：</el-col>
        <el-col :span="20" style="text-align:left;">
          <span>{{ account.publicSecret }}</span>
        </el-col>
      </el-row>
      <el-row class="theLineHeight">
        <el-col :span="4" style="text-align:right;">创建时间：</el-col>
        <el-col :span="20" style="text-align:left;">
          <span>{{ account.createTime }}</span>
        </el-col>
      </el-row>
    <!--
    <el-row class="theLineHeight">
      <el-col :span="4" style="text-align:right;">到期时间：</el-col>
      <el-col :span="20" style="text-align:left;">
        <span>{{account.expireTime}}</span>
      </el-col>
    </el-row>
    -->
    </div>
    <div v-else>
      <span style="color:#ff0000;">{{ tips }}</span>

    </div>

  </div>
</template>
<script>
// import apiBaseUrl from 'apiBaseUrl'
import {
  getAccountData
} from '@/api/center.js'
export default {
  props: {
    currentVM: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      timer: '',
      tips: '数据加载中...',
      hasTheBosAccount: false,
      account: {
        address: 'xxxx',
        operators: '',
        region: '',
        location: '',
        version: '',
        status: '',
        publicSecret: 'xxxxxxxxxxxxxxxx',
        createTime: '2019-10-10 10:10:10',
        expireTime: '2019-10-10 10:10:10'
      }
    }
  },
  mounted() {
    var email = this.$route.params.id
    console.log('=====email===' + email)
    if (typeof email === 'undefined') {
      // 个人账户管理
      email = this.$store.getters.currentUser.email
      console.log('个人账户管理===email2=' + email)
    } else {
      // 后台实例管理
      console.log('实例信息===email=' + email)
    }
    this.timer = setInterval(this.refreshVMData, 3000)
    // this.requestData(email);
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    refreshVMData() {
      console.log('detail ...')

      var email = this.$route.params.id
      console.log('=====email===' + email)
      if (typeof email === 'undefined') {
        // 个人账户管理
        email = this.$store.getters.currentUser.email
        console.log('个人账户管理===email2=' + email)
      } else {
        // 后台实例管理
        console.log('实例信息===email=' + email)
      }
      console.log('detail ...' + email)
      this.requestData(email)
    },
    requestData(email) {
      // const url = `${apiBaseUrl}/v1/virtualmachines/account/` + email // this.axios.get(url).
      // console.log('the instance vm url=' + url)
      if (typeof email === 'undefined' || email === null || email === '') {
        this.$message.error('token失效，请重新登录')
        this.$router.push('/login')
      }
      getAccountData(email).then(
        response => {
          console.log(response)
          if (response.data.data == null) {
            // 没有查询到数据
            this.hasTheBosAccount = false
            this.tips = '没有对应的数据...'
          } else {
            this.hasTheBosAccount = true
            this.tips = ''
            this.account.address =
              response.data.data.vm_instance_vo.account_address
            this.account.operators =
              response.data.data.vm_instance_vo.operators
            this.account.region = response.data.data.vm_instance_vo.area
            this.account.location = response.data.data.location
            this.account.version = response.data.data.vm_instance_vo.version
            this.account.status = response.data.data.vm_instance_vo.vm_status
            this.account.publicSecret = response.data.data.public_key_address
            this.account.createTime =
              response.data.data.vm_instance_vo.creation_time
            this.account.expireTime =
              response.data.data.vm_instance_vo.due_time
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
                this.$message.error(err.data.data.message)
            }
          }
        }
      )
    }
  }
}
</script>
<style scoped>
.theLineHeight {
  padding-top: 10px;
}
</style>
