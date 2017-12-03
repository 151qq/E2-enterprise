<template>
    <el-dialog title="素材库" :visible.sync="selectData.isShow">
      <div class="picBox">
        <div class="piclist">
            <div class="iBox" v-for="(item, index) in lists" :class="curIndex === index ? 'active' : ''">
                <img :src="item.link" @click="selPic(item.link, index)">
            </div>
        </div>
        <div class="more" @click="tplNextPage">加载更多</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="selectData.isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmH">确 定</el-button>
      </div>
    </el-dialog>
</template>
<script>
import util from '../../assets/common/util';

export default{
    props: ['selectData'],
    data(){
        return {
          lists: [],
          pageNumber: 1,
          pageSize: 10,
          curIndex: '',
          curPath: '',
          seData: {}
        }
    },
    mounted (){
      this.getList()
    },
    methods: {
        selPic(link, index){
          this.curIndex = index
          this.curPath =  link
        },
        confirmH () {
          this.seData = {
              url: this.curPath
          },
          this.$emit('suSelect', this.seData)
          this.selectData.isShow = false
        },
        tplNextPage(){
            this.pageNumber++
            this.getList()
        },
        getList () {
          util.request({
              method: 'get',
              interface: 'mediaList',
              data: {
                  pageSize: this.pageSize,
                  pageNumber: this.pageNumber
              }
          }).then((res) => {
              this.lists = this.pageNumber > 1 ? this.lists.concat(res.result.result) : res.result.result
          })
        }
    }
}
</script>
<style lang="scss">
.picBox {
  max-height: 360px;
  overflow: scroll;
}

.piclist {
  height: auto;
  overflow: hidden;
  text-align: center;

  .iBox {
    width: 169px;
    height: 169px;
    overflow: hidden;
    margin-top: 10px;
    display: inline-block;
    vertical-align: top;
    box-sizing: border-box;
    padding: 10px;

    &.active {
      background: #f0f0f0;
      border-radius: 5px;
    }

    img {
      width: 100%;
      height: 100%;
      vertical-align: top;
      &:hover, &:active {
        border: 2px solid #3c3c3c;
        cursor: pointer;
      }
    }
  }

}

.more {
  height: 30px;
  overflow: hidden;
  font: 14px;
  line-height: 30px;
  background: #eeeeee;
  color: #3c3c3c;
  text-align: center;
  cursor: pointer;
  margin-top: 20px;
}
</style>
