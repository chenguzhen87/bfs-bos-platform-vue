<!--
 * @Description: 管理后台布局组件
 * @Author: icony/精武陈真
 * @Date: 2019-11-06 15:20:34
 * @LastEditTime: 2019-11-06 20:47:40
 * @LastEditors: icony/精武陈真
 -->

<template>
  <el-container>
    <el-header>
      <page-header />
    </el-header>
    <el-container>
      <el-aside width="200px" v-if="isPC">
        <el-menu>
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">
              <router-link class="nav-item" to="/console/activecode">激活码管理</router-link>
            </span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-document"></i>
            <span slot="title">
              <router-link class="nav-item" to="/console/user">用户管理</router-link>
            </span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-s-opportunity"></i>
            <span slot="title">
              <router-link class="nav-item" to="/console/instances">实例管理</router-link>
            </span>
          </el-menu-item>
          <el-menu-item index="4" >
            <i class="el-icon-setting"></i>
            <span slot="title">
               <router-link class="nav-item" to="/console/logs">日志管理</router-link>  
              <!--<router-link class="nav-item" to="#">日志管理</router-link> -->
            </span>
          </el-menu-item>
        </el-menu>
      </el-aside>
       <el-main>
         <div class="admin-main">
           <router-view></router-view>
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
      isPC: true
    }
  },
  mounted() {
    const isPCBrower = this.isPCBrower() 
    this.isPC = isPCBrower
  },
  methods: {
    isPCBrower(){
      //平台、设备和操作系统
      var system ={
        win : false,
        mac : false,
        xll : false
      };
      //检测平台
      var p = navigator.platform;
      system.win = p.indexOf("Win") == 0;
      system.mac = p.indexOf("Mac") == 0;
      system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
      if(system.win || system.mac || system.xll){
        return true
      } else {
        return false
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

.admin-main {
   background: #fff;
   padding:15px;
}

</style>
