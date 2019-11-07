<!--
 * @Description: 页面布局组件
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
       <el-main>
         <div class="content-main">
            <router-view></router-view>
         </div>
       </el-main>
    </el-container>
  </el-container>
</template>

<script>
import PageHeader from '@/components/PageHeader'
export default {
  name: 'Layout',
  components: {
    PageHeader
  }
}
</script>

<style lang='scss'  scoped>
.el-header {
  color: #333;
  line-height: 60px;
  background: #fff;
}

.content-main {
  background: #fff;
  padding: 15px;
}

</style>
