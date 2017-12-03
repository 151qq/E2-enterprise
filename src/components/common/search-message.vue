<template>
  <div class="search-out" @click.stop="showModel">
    <el-input 
      placeholder="请输入需查询的楼盘名称"
      v-model="keyValue"
      @change="getMess"
      >
    </el-input>
    <div class="mess-box" v-show="messDate.length !== 0 && isShow">
      <a v-for="item in messDate" class="nav-r" @click.stop="selectHouse(item)">{{ item.title }}</a>
    </div>
  </div>
</template>
<script>
import $ from 'Jquery'
import util from '../../assets/common/util'

export default {
  data () {
    return {
      isShow: false,
      keyValue: '',
      messDate: [
        {
          title: '一'
        },
        {
          title: '一'
        },
        {
          title: '一'
        },
        {
          title: '一'
        }
      ],
      count: 0
    }
  },
  created () {
    var _self = this
    $('body').click(function () {
      _self.messDate = []
      _self.isShow = false
    })
  },
  methods: {
    getMess () {
      // this.count++
      // var countNum = this.count
      
      // util.request({
      //     method: 'post',
      //     interface: 'houseInfo',
      //     data: formData
      // }).then(res => {
      //     if (countNum < this.count) {

      //     }
      // })
      this.showModel()
    },
    showModel () {
      this.isShow = true
    },
    hideMess (e) {
      this.isShow = false
    },
    selectHouse (item) {
      this.keyValue = item.title
      this.isShow = false
      this.$emit('selectHouse', item)
    },
    resetKey () {
      this.keyValue = ''
    }
  }
}
</script>
<style lang="scss">
  .search-out {
    position: relative;
    width: 100%;
    display: inline-block;

    .mess-box {
      width: 100%;
      box-sizing: border-box;
      padding: 15px 0;
      border: 1px solid #C0CCDA;
      text-align: left;
      background: #ffffff;
      z-index: 10;
      
      .nav-r {
        display: block;
        padding: 0 15px;
        font-size: 14px;
        line-height: 30px;
        color: #333333;
        cursor: pointer;

        &:hover {
          background: #C0CCDA;
        }
      }
    }

    .el-input {
      width: 100%;
    }
  }
</style>