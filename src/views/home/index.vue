<!--
 * @Description: 首页
 * @Author: icony/精武陈真
 * @Date: 2019-11-06 15:24:39
 * @LastEditTime: 2019-11-07 16:28:01
 * @LastEditors: Duchin/梁达钦
 -->
<template>
  <div class="home">
    <div class="logo">
      <img src="@/assets/images/solarfs_logo.jpeg" width="100" />
    </div>
    <div class="title">{{ $t('lang.home-title') }}</div>
    <el-row type="flex" class="row-bg" justify="center">
       <router-link
        class="nav-item"
        to="/register"
        style="text-decoration:none;">
          <el-card shadow="hover">
            {{ $t('lang.home-reg') }}
          </el-card>
       </router-link>
        <router-link
        class="nav-item"
        to="/login"
        style="text-decoration:none;"
        >
          <el-card class="card-box" shadow="hover">
            {{ $t('lang.home-login') }}
          </el-card>
        </router-link>
    </el-row>
  </div>
</template>
<style  lang="scss" scoped>
  .home {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    margin-top: -250px;
  }

  .logo {
    margin-bottom: 30px;
  }

  .card-box {
    margin-left: 20px;
  }
  .title {
    font-size: 28px;
    margin-bottom: 30px;
    line-height: 2;
    padding:0 10px;
  }

  .nav-item:hover {
    color: #409EFF
  }
</style>
