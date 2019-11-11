<template>
  <div>
    <el-dialog
      title="批量生成激活码"
      :visible.sync="visible"
      :show="show"
      style="text-align:left;"
      @close="$emit('update:show', false)"
    >
      <el-form ref="batchActiveCodeForm" :model="batchActiveCodeForm">
        <el-form-item label="生成数量" :label-width="formLabelWidth">
          <el-select v-model="batchActiveCodeForm.code_total" placeholder="请选择生成数量">
            <el-option label="10" :value="10" />
            <el-option label="50" :value="50" />
            <el-option label="100" :value="100" />
          </el-select>
        </el-form-item>
        <el-form-item label="自动发送邮件" :label-width="formLabelWidth">
          <el-switch v-model="batchActiveCodeForm.send_mail_status" active-text="是" />
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="batchActiveCodeForm.remarks" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog('batchActiveCodeForm')">取 消</el-button>
        <el-button type="primary" @click="createBatchActiveCode('batchActiveCodeForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import apiBaseUrl from 'apiBaseUrl'
const Base64 = require('js-base64').Base64
import {
  createBatchActive
} from '@/api/admin'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.show,
      batchActiveCodeForm: {
        code_total: 10,
        send_mail_status: true,
        remarks: '',
        mailbox: '',
        code_manager: 'dxc'
      },
      formLabelWidth: '120px'
    }
  },
  watch: {
    show() {
      this.visible = this.show
    }
  },
  mounted() {
    // this.batchActiveCodeForm.mailbox=this.$store.state.userToken;
    this.batchActiveCodeForm.mailbox = this.$store.getters.currentUser.email
  },
  methods: {
    closeDialog(formName) {
      this.$emit('update:show', false)
    },
    resetForm() {
      // this.$refs[formName].resetFields();
      this.batchActiveCodeForm.code_total = 10
      this.batchActiveCodeForm.send_mail_status = true
      this.batchActiveCodeForm.remarks = ''
    },
    createBatchActiveCode(formName) {
      const data = this.batchActiveCodeForm

      if (data.mailbox == null || data.mailbox === '') {
        this.$message.error('请重新登录。')
        this.$router.push('/login')
        return
      }

      console.log(data)
      // let url = `${apiBaseUrl}/v1/activationcodes`; // this.axios.post(url, data)
      createBatchActive(data).then(
        response => {
          const keycode = Base64.encode(response.data.data.message)

          // 生成成功关闭页面，重置form
          this.closeDialog(formName)
          console.log('data.send_mail_status=' + data.send_mail_status)
          if (data.send_mail_status === true || data.send_mail_status === 'true') {
            debugger
            this.$alert(
              '激活码已经发送到' + this.batchActiveCodeForm.mailbox + ' 邮箱',
              '',
              {
                confirmButtonText: '确定',
                callback: action => {
                  // 重置表单
                  this.resetForm()
                  console.log('激活码，重置表单。。。')
                  this.$emit('requestData')
                }
              }
            )
          } else {
            this.downloadFile(keycode)
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
                this.$message.error(err.data.data.message)
            }
          }
        }
      )
    },
    downloadFile(keycode) {
      // 下载文件
      this.$alert('点击下载激活码列表', '', {
        confirmButtonText: '下载',
        callback: action => {
          this.$message('数据下载中...')
          // 请求下载数据
          try {
            const url = `${apiBaseUrl}/v1/activationcode/download/` + keycode
            var blob = new Blob([], {
              type: 'application/octet-stream;charset=utf-8'
            })
            var downloadElement = document.createElement('a')
            var href = window.URL.createObjectURL(blob) // 创建下载链接
            // let sendParams = Base64.encode(JSON.stringify('传递的参数')) // 可以省略  具体看业务需求
            downloadElement.href = url // '接口地址'// 此处可以通过拼接字符串的方式传递参数
            document.body.appendChild(downloadElement)
            downloadElement.click() // 点击下载
            document.body.removeChild(downloadElement) // 下载完成之后移除元素
            window.URL.revokeObjectURL(href) // 释放掉blob对象
          } catch (err) {
            console.log(err)
            this.$message.error('服务故障，下载失败！')
          }
        }
      })
    }
  }
}
</script>
