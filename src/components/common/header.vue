<template>
  <section class="header-web">
    <router-link class="logo-box" :to="{name: 'house'}"><img src="../../assets/images/logo.png"></router-link>

    <div class="nav-box">
      <router-link :to="{ name: 'invest'}">企业信息</router-link>
    </div>

    <div class="member-box">
      <a class="img-box" @click="editImgUrl">
        <img v-if="userInfo.iconUrl" :src="userInfo.iconUrl">
        <img v-else src="../../assets/images/default-avatar.png">
      </a>
      <el-dropdown>
        <span class="el-dropdown-link">
          您好
          <span>{{userInfo.userCnName}}</span>
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div @click="editPassword">
              <img src="../../assets/images/change-password.png">
              修改密码
            </div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div @click="logout">
              <img src="../../assets/images/logout.png">
              退出登录
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- <div class="line-box"></div> -->

    <!-- <div class="save-box" @click="saveAll"></div> -->

    <!-- <div class="mess-box" v-popover:popover1>
      <i class="el-icon-message"></i>
      <span class="circle"></span>
      <el-popover
          ref="popover1"
          placement="bottom"
          width="600"
          trigger="click">
        <div class="con-box">
          <p class="title">任务</p>
          <div class="mess-list">
            <section v-for="item in noticeList">
              <div class="top">
                <img :src="item.taskIcon">
                <p>
                  <span class="people">{{item.taskTitle}}</span>
                  <span>{{item.taskDescribe}}</span>
                </p>
              </div>
              <div class="mid">
                <p>{{item.des}}</p>
              </div>
              <div class="bottom">
                <el-button class="edit" type="primary" icon="edit" size="small" @click="goUrl(item.id)">处理</el-button>
              </div>
            </section>
          </div>
          <el-pagination
            small
            layout="prev, pager, next"
            :page-size="page.pageSize"
            :total="page.total"
            @current-change="changePage">
          </el-pagination>
        </div>
      </el-popover>
    </div> -->

    <!-- <div class="add-box" v-popover:popover2>
      <i class="el-icon-add"></i>
      <span class="circle"></span>
      <el-popover
          ref="popover2"
          placement="bottom"
          width="150"
          trigger="hover">
        <div class="add-mess">
          <router-link target="_blank" class="a-box" :to="{name: 'house', params: { type: 'add' }}">
            新增物业
          </router-link>
          <router-link target="_blank" class="a-box a-bg" :to="{name: 'report', params: { type: 'add' }}">
            新增报告
          </router-link>
        </div>
      </el-popover>
    </div> -->

    <upload-file :path="userInfo.iconUrl" :dialog-form-visible="dialogFormVisible" @imgChange="changeImg"></upload-file>
    <password :dialog-form-visible="dialogFormVisible"></password>
  </section>
</template>
<script>
import util from '../../assets/common/util'
import uploadFile from './upload-file.vue'
import password from './password.vue'

export default {
  data () {
    return {
      origin: window._SettingOrigin,
      userInfo: {
        name: '',
        iconUrl: ''
      },
      noticeList: [],
      dialogFormVisible: {
        visibleF: false,
        visibleP: false
      },
      page: {
        total: 0,
        pageSize: 2,
        currentPage: 1
      },
      keyValue: ''
    }
  },
  created () {
    this.getUserInfo()
    // this.getNotice()
  },
  beforeRouteUpdate (to, from, next) {
    this.keyValue = ''
    next()
  },
  methods: {
    // getSearch () {
    //   var formData = {
    //     type: this.$route.name,
    //     key: this.keyValue
    //   }

    //   util.request({
    //     method: 'get',
    //     interface: 'getInfoId',
    //     data: formData
    //   }).then(res => {
    //     var path = {
    //       name: this.$route.name + 'Add',
    //       params: {
    //         id: res.result.datas.id
    //       }
    //     }
    //     this.keyValue = ''
    //     this.$router.push(path)
    //   })
    // },
    getUserInfo () {
      util.request({
        method: 'get',
        interface: 'getUserInfo',
        data: {}
      }).then(res => {
        this.userInfo = res.result.result
        window.UserInfo = res.result.result
      })
    },
    logout () {
      util.request({
        method: 'post',
        interface: 'logout',
        data: {}
      }).then(res => {
        if (res.result.success == '1') {
          window.location.href = 'login.html'
        }
      })
    },
    // getNotice () {
    //   var formData = {
    //     pageSize: this.page.pageSize,
    //     currentPage: this.page.currentPage
    //   }

    //   util.request({
    //     method: 'get',
    //     interface: 'notice',
    //     data: formData
    //   }).then(res => {
    //       console.log(res)
    //     this.noticeList = res.result.result
    //     this.page.total = Number(res.result.pageNumber)
    //   })
    // },
    // changePage (value) {
    //   console.log(value)
    //   this.page.currentPage = value
    //   this.getNotice()
    // },
    // goUrl (id) {
    //   this.$router.push({name: 'notice', params: {id: id}})
    // },
    changeImg (path) {
      this.userInfo.iconUrl = path
    },
    editImgUrl () {
      this.dialogFormVisible.visibleF = true
    },
    editPassword () {
      this.dialogFormVisible.visibleP = true
    },
    saveAll () {
      this.$emit('saveall')
    }
  },
  components: {
    uploadFile,
    password
  }
}
</script>
<style lang="scss">
  .el-dropdown-menu__item {
    font-size: 14px;

    img {
      float: left;
      width: 16px;
      height: 16px;
      margin: 10px 10px 0 2px;
    }

    div {
      line-height: 36px;
      overflow: hidden;
    }
  }

  .el-dropdown-menu {
    min-width: 120px;
  }

  .add-mess {
    .a-box {
      display: block;
      width: 104px;
      padding-left: 40px;
      background: url(../../assets/images/wy-icon.png) left center no-repeat;
      font-size: 16px;
      line-height: 22px;
      color: #475669;
      margin: 20px auto;

      &:hover {
        color: #20A0FF;
      }
    }

    .a-bg {
      background: url(../../assets/images/bg-icon.png) left center no-repeat;
    }
  }
  .header-web {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #000000;
    color: #fff;
    padding: 0 20px;
    z-index: 99999;
    box-sizing: border-box;

    .logo-box {
      float: left;
      margin-top: 10px;
      margin-right: 26px;

      img {
        display: block;
        height: 30px;
        width: auto;
      }
    }

    .nav-box {
      float: left;

      a {
        display: inline-block;
        font-size: 13px;
        color: #A4A4A4;
        line-height: 50px;
        margin-right: 30px;

        &:hover {
          color: #ffffff;
        }
      }

      .router-link-active {
        color: #ffffff;
      }
    }

    .member-box {
      float: right;
      margin-left: 20px;

      .el-dropdown-link {
        font-size: 14px;
        line-height: 50px;
        color: #A4A4A4;
        cursor: pointer;
      }

      .img-box {
        float: left;
        width: 24px;
        height: 24px;
        margin: 13px 20px 0 0;
        border-radius: 50%;
        overflow: hidden;
        line-height: 0;
        background: url(../../assets/images/head-icon.png) left top no-repeat;
        background-size: 100% auto;
        cursor: pointer;

        img {
          width: 24px;
          height: 24px;
        }
      }
    }

    .mess-box {
      position: relative;
      float: right;
      width: 16px;
      height: 50px;
      line-height: 50px;
      cursor: pointer;

      i {
        color: #999999;
      }
      
      .circle {
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        overflow: hidden;
        right: -4px;
        top: 14px;
        background: url(../../assets/images/mess-now.png) center no-repeat;
      }
    }

    .line-box {
      float: right;
      width: 1px;
      height: 20px;
      margin: 15px 0;
      background: #555555;
    }

    .add-box {
      position: relative;
      float: right;
      width: 14px;
      height: 50px;
      line-height: 50px;
      cursor: pointer;

      i {
        display: block;
        width: 14px;
        height: 50px;
        background: url(../../assets/images/add-icon.png) center no-repeat;
        background-size: 14px 14px;
      }
    }

    .save-box {
      float: right;
      width: 16px;
      height: 50px;
      margin-right: 20px;
      cursor: pointer;
      background: url(../../assets/images/save-icon.png) center no-repeat;
    }
  }
  
  .el-popover {
    padding: 0;
  }  

  .con-box {

    .title {
      font-size: 14px;
      color: #000000;
      line-height: 30px;
      padding: 0 15px;
      border-bottom: 1px solid #DCDCDC;
    }
  }
  .mess-list {
    max-height: 380px;
    overflow: auto;

    section {
      border-bottom: 1px solid #DCDCDC;

      &:last-child {
        border: none;
      }
    }

    .top {
      padding: 15px 15px 0;

      img {
        float: left;
        margin-right: 13px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      p {
        width: 220px;

        span {
          display: block;
          font-size: 12px;
          color: #99A9BF;
          line-height: 24px;
        }

        .people {
          font-size: 16px;
          color: #475669;
          line-height: 26px;
        }
      }
    }

    .mid {
      padding: 10px 15px 0;

      p {
        font-size: 14px;
        color: #5E6D82;
        line-height: 20px;
        height: 40px;
        overflow: hidden;
      }

      a {
        display: block;
        font-size: 14px;
        color: #0053FF;
        line-height: 20px;
      }
    }

    .bottom {
      padding: 8px 15px 20px;
      overflow: hidden;

      .edit {
        float: right;

        i {
          color: #ffffff;
        }
      }
    }
  }
</style>

