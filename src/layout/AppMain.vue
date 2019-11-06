<template>
  <el-container style="margin:0px;height:100vh;">
    <el-header style>
      <el-row>
        <el-col :span="4">
          <div style="text-align:center;padding-right:30px;">
            <div style="float:right;padding-left:10px;padding-top:10px;font-size:16px;">
              <b>SolarFS</b>
            </div>
            <div style="float:right;padding-top:10px;">
              <img
                src="@/assets/imgs/solarfs_logo.jpeg"
                class="image"
                height="37px"
                width="37px;"
                style="margin:0px;"
              />
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple-light">
            <div class="mainItem" style="margin-left:15px;">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  {{this.$store.getters.currentUser.email}}
                  <i
                    class="el-icon-s-tools el-icon--right"
                  ></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="account">账户管理</el-dropdown-item>
                  <el-dropdown-item command="log">操作日志</el-dropdown-item>
                  <div v-if="'admin'== this.$store.getters.currentUser.role">
                    <el-dropdown-item command="console">管理后台</el-dropdown-item>
                  </div>
                  <el-dropdown-item command="quit">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <!--
            <div class="mainItem">BFS-宇宙</div>
            <div class="mainItem">BFS系统统计</div>
            <div class="mainItem">GitHub</div>
            <div class="mainItem">Blog</div>
            <div class="mainItem">API</div>
            <div class="mainItem">文档</div>
            <div class="mainItem">主页</div>
            -->
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer>
      <span>Copyright © 2019 startnet</span>
    </el-footer>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      user: "admin"
    };
  },
  methods: {
    handleCommand(command) {
      if ("account" == command) {
        this.$router.push("/center/account");
      } else if ("log" == command) {
        // this.$message("click on item " + command);
        this.$router.push("/center/log");
      } else if ("console" == command) {
        this.$router.push("/console");
      } else if ("quit" == command) {
        //清除本地缓存，跳转到登录页面
        let url = "/v1/user/logout";
        console.log("关闭 url=" + url);
        this.axios.get(url).then(
          response => {
            console.log(response);
            this.$message.success("操作成功，退出登录...");
            this.$router.push("/login");
          },
          err => {
            if (err.data) {
              switch (err.data.status) {
                case 401:
                  console.log("拦截器统一处理...");
                default:
                  console.log(err.data);
                  console.log(err.data.data.message);
                  this.$message.error(err.data.data.message);
              }
            }
          }
        );
      }
    }
  }
};
</script>
<style  scoped>
.el-header {
  color: #333;
  line-height: 40px;
  border-bottom: solid 1px #cccccc;
}
.el-footer {
  background-color: #0c0a0a;
  color: #888888;
  text-align: center;
  line-height: 50px;
}
.el-aside {
  color: #333;
}
.mainItem {
  float: right;
  margin-right: 10px;
}
/***/
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>