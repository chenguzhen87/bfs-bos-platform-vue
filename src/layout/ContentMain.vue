<template>
    <el-container style="height:100%;  border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
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
      <el-container style="height:100%;">
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>
<style  scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
}

.el-aside {
  color: #333;
}
.mainItem {
  float: right;
  margin-right: 10px;
}

</style>