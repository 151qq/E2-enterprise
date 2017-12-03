<template>
  <div class="input-filter">
    <el-input 
      class="input-filter-box"
      placeholder="楼盘查询"
      v-model="keyValue"
      @change="getMess"
      >
    </el-input>
    <div class="mess-box" v-show="isShow">
      <template v-if="messDate.length">
        <a  v-for="item in messDate" class="nav-r"
            @click="setHousesId(item)">{{ item.housesDesc }}</a>
      </template>

      <span v-else class="null-house">
        暂无相关楼盘！
      </span>
    </div>
  </div>
</template>
<script>
import $ from 'Jquery'
import util from '../../assets/common/util.js'

export default {
  props: ['rowData'],
  data () {
    return {
      isShow: false,
      keyValue: '',
      messDate: [],
      count: 0
    }
  },
  created () {
    var _self = this
    $('body').click(function () {
      _self.isShow = false
    })

    this.keyValue = this.rowData.houseCname
  },
  watch: {
    rowData () {
      this.keyValue = this.rowData.houseCname
    }
  },
  methods: {
    // 获取搜索数据
    getDatas () {
      // 记录被调用序号
      var count = this.count

      let formData = {
        key: this.keyValue
      }

      util.request({
        method: 'post',
        interface: 'searchMap',
        data: formData
      }).then(res => {
        if (res.result.success == '1') {
          if (count !== this.count) {
            return false
          }
          this.messDate = res.result.result
        } else {
          this.$message.error(res.result.mess)
        }
      })
    },
    setHousesId (house) {
      this.rowData.houseId = house.housesId
      this.rowData.houseCname = house.housesDesc
      this.keyValue = house.housesDesc
    },
    getMess () {
      this.rowData.houseId = ''
      this.rowData.houseCname = ''

      if (this.keyValue === '') {
        this.isShow = false
        return false
      }
      // getMess
      this.isShow = true
      this.count++
      this.getDatas()
    }
  }
}
</script>
<style lang="scss">
  .input-filter {
    position: relative;

    .input-filter-box {
      width: 100%;
      height: 30px;

      .el-input__inner {
        height: 30px;
      }
    }

    .mess-box {
      position: absolute;
      left: 0;
      top: 30px;
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

      .null-house {
        display: block;
        font-size: 14px;
        color: #999999;
        line-height: 60px;
        text-align: center;
      }
    }

    .el-input {
      display: inline-block;
    }

    .search-btn {
      position: relative;
      float: right;
      margin-left: -10px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      height: 50px;
      font-size: 16px;
      padding: 0 23px;
    }
  }
</style>