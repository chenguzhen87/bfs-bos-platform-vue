<template>
  <div>
    <el-dialog
      title="在线账户创建"
      :visible.sync="visible"
      :show="show"
      style="text-align:left;"
      :show-close="false"
      :close-on-click-modal="false"
      @close="closeDialog()"
    >
      <el-form :model="form">
        <el-form-item label="选择运营商" :label-width="formLabelWidth">
          <el-select v-model="form.operators" placeholder="请选择生成数量">
            <el-option label="帕拉丁" value="帕拉丁" />
            <el-option label="阿里云" value="阿里云" disabled="disabled" />
            <el-option label="腾讯" value="腾讯" disabled="disabled" />
            <el-option label="AWS" value="AWS" disabled="disabled" />
          </el-select>
        </el-form-item>
        <el-form-item label="选择大区" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择生成数量">
            <el-option label="北方" value="北方" />
            <el-option label="南方" value="南方" disabled="disabled" />
            <el-option label="HK" value="HK" disabled="disabled" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">取 消</el-button>
        <el-button type="primary" @click="next('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import apiBaseUrl from 'apiBaseUrl'
import {
  createAccount
} from '@/api/center'
export default {
  name: 'Accountregion',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.show,
      form: {
        operators: '帕拉丁',
        region: '北方'
      },
      formLabelWidth: '120px'
    }
  },
  watch: {
    show() {
      this.visible = this.show
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:show', false)
    },
    next(formName) {
      const createVMRequestData = {
        area: this.form.region,
        mailbox: this.$store.getters.currentUser.email,
        operators: this.form.region
      }
      console.log('创建虚机的时候，需使用登录用户的邮箱')
      // let url = `/v1/virtualmachine` // this.axios.post(url, createVMRequestData).
      createAccount(createVMRequestData).then(
        response => {
          console.log(response)
          console.log(response.data)
          this.closeDialog()

          const vm_name = response.data.data.vm_name
          const mailbox = response.data.data.Mailbox
          const temporary_password = response.data.data.temporary_password

          const data = {
            comname: 'AccountSecret',
            vm_name: vm_name,
            mailbox: mailbox,
            temporary_password: temporary_password
          }
          this.$emit('changenext', data)
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
      //
    }
  }
}
</script>
