<template>
  <div>
    <el-dialog
      title="在线账户创建"
      :visible.sync="centerDialogVisible"
      :center-visible="centerVisible"
      :temporary-password="temporaryPassword"
      style="text-align:left;"
      :show-close="false"
      :close-on-click-modal="false"
      @close="closeDialog()"
    >
      <span
        class="el-icon-thumb"
        style="border:solid 1px #5C5C5C;line-height:40px;padding:5px;margin-left:30px;"
      >
        在线账户已经生成。请记录
        <b>临时密码</b>用于初始化在线账户
      </span>
      <br>
      <br>
      <el-row style="text-align:center;">
        <span style="border:solid 1px #5C5C5C;line-height:40px;padding:15px;">
          <b>临时密码：
            <span style="color:#ff0000;">{{ initFirstPwd }}</span></b>
        </span>
      </el-row>
      <br>
      <br>
      <br>
      <el-row :gutter="20">
        <el-col :span="3">
          <el-card :body-style="{ padding: '5px' }">
            <img src="@/assets/images/04.png" class="image">
          </el-card>
        </el-col>
        <el-col :span="3">
          <el-card :body-style="{ padding: '5px' }">
            <img src="@/assets/images/04.png" class="image">
          </el-card>
        </el-col>
        <el-col :span="3">
          <el-card :body-style="{ padding: '5px' }">
            <img src="@/assets/images/02.png" class="image">
          </el-card>
        </el-col>
        <el-col :span="3">
          <el-card :body-style="{ padding: '5px' }">
            <img src="@/assets/images/02.png" class="image">
          </el-card>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="nextTo()">完 成</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import apiBaseUrl from 'apiBaseUrl'
export default {
  props: {
    centerVisible: {
      type: Boolean,
      default: false
    },
    temporaryPassword: {
      type: String,
      default: '123456'
    }
  },
  data() {
    return {
      centerDialogVisible: this.centerVisible,
      initFirstPwd: '123456'
    }
  },
  watch: {
    centerVisible() {
      this.centerDialogVisible = this.centerVisible
      console.log('watch . this.centerVisible=' + this.centerVisible)
    }
  },
  mounted() {
    // this.centerVisible=true;
    console.log('this.centerVisible=' + this.centerVisible)
    console.log('temporaryPassword=' + this.temporaryPassword)
  },
  methods: {
    closeDialog() {
      this.$emit('update:centerVisible', false)
      this.$emit('update:temporaryPassword', '123456')
    },
    nextTo() {
      this.closeDialog()
      this.$message.info('刷新页面')
      const data = {
        // email:this.$store.state.userToken
        email: this.$store.getters.currentUser.email
      }
      console.log('this.$store.state.userToken=' + this.$store.getters.currentUser.token)
      this.$emit('refreshData', data)
    }
  }
}
</script>
