<!--
 * @Description: 页面头部
 * @Author: icony/精武陈真
 * @Date: 2019-11-06 15:20:34
 * @LastEditTime: 2019-11-06 15:33:48
 * @LastEditors: icony/精武陈真
 -->
<template>
  <div class="header">
     <div class="app-container">
      <div class="flexBox" style="align-items:center">
          <div class="flexItem">
           <h2>
             <router-link to='/home'>
                {{title}}
             </router-link>
             </h2>
          </div>
          <div class="flexItem" style="text-align:right;" v-if="user.id">
            <router-link to='/help' style="margin-right:40px">


              <svg-icon icon-class="help" style="color:#fff;font-size:30px;vertical-align:middle"/>

            </router-link>

             <router-link to='/messageList' style="margin-right:40px">
                <el-badge :value="new_count" class="item">

                  <i class="el-icon-bell" style="color:#fff;font-size:24px;vertical-align:middle" ></i>
                </el-badge>
             </router-link>
             <el-dropdown style="vertical-align:middle">
              <el-dropdown-menu slot="dropdown">
                 <router-link to='/workbench'>
                   <el-dropdown-item>
                        工作台
                    </el-dropdown-item>
                  </router-link>
                  <router-link to='/setting/basicDoc'>
                    <el-dropdown-item>
                          个人设置
                    </el-dropdown-item>
                  </router-link>
                <el-dropdown-item>
                  <div @click="logout">退出</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        <router-link :to="{ path: '/login'}" v-else>
          登录
        </router-link>
      </div>
     </div>
  </div>
</template>
<script>

import settings from '@/settings'

export default {
    name: 'PageHeader',
    data() {
      return {
        title:settings.title,
      }
    },
    methods: {
      logout(){
         this.$store.dispatch('user/logout')
      }
    },
}
</script>

<style lang="scss" scoped>
 .header {
    background-color: rgba(24, 27, 42, 1);
    height: 110px;
    color: #fff;
  }
</style>

