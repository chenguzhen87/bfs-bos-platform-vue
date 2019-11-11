<!--
 * @Description: 管理后台布局组件
 * @Author: icony/精武陈真
 * @Date: 2019-11-06 15:20:34
 * @LastEditTime: 2019-11-08 19:22:37
 * @LastEditors: Duchin/梁达钦
 -->

<template>
  <el-container>
    <el-header>
      <page-header />
    </el-header>
    <el-container>
      <el-aside v-if="isPC" width="200px">
        <el-menu
          @select="handleMenu"
        >
          <el-menu-item index="1">
            <i class="el-icon-menu" />
            <span slot="title">
              激活码管理
            </span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-document" />
            <span slot="title">
              用户管理
            </span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-s-opportunity" />
            <span slot="title">
              实例管理
            </span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting" />
            <span slot="title">
              日志管理
              <!--<router-link class="nav-item" to="#">日志管理</router-link> -->
            </span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="admin-main">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import PageHeader from '@/components/PageHeader'
export default {
  name: 'AdminLayout',
  components: {
    PageHeader
  },
  data() {
    return {
      isPC: true,
      menuIndex: '1'
    }
  },
  mounted() {
    const isPCBrower = this.isPCBrower()
    this.isPC = isPCBrower
  },
  methods: {
    isPCBrower() {
      // 平台、设备和操作系统
      var system = {
        win: false,
        mac: false,
        xll: false
      }

      // 检测平台
      var p = navigator.platform
      system.win = p.indexOf('Win') === 0
      system.mac = p.indexOf('Mac') === 0
      system.x11 = (p === 'X11') || (p.indexOf('Linux') === 0)
      if (system.win || system.mac || system.xll) {
        return true
      } else {
        return false
      }
    },
    handleMenu(index, indexKey) {
      if (this.menuIndex === index) {
        return
      } else {
        this.menuIndex = index
      }
      console.log('index,', index, indexKey)
      switch (index) {
        case '1':
          this.$router.push('/adminLayout/activeCodeList')
          break
        case '2':
          this.$router.push('/adminLayout/userList')
          break
        case '3':
          this.$router.push('/adminLayout/instanceList')
          break
        case '4':
          this.$router.push({
            path: '/adminLayout/logList',
            query: {
              log: false
            }
          })
          break
      }
    }
  }
}

</script>

<style lang='scss'  scoped>
.el-header {
  color: #333;
  line-height: 60px;
  background: #fff;
  border-bottom: 1px solid#e6e6e6;
}

.el-aside{
   height: calc(100vh - 60px);
   background: #fff;
   border-right: 1px solid#e6e6e6;
}

.el-menu {
  border:none
}
.el-main {
   height: calc(100vh - 60px);
   overflow: auto
}

.admin-main {
   background: #fff;
   padding:15px;
}

</style>
