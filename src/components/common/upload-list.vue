<template>
  <div class="imgs-box">
    <section class="img-box" v-for="(item, index) in imgLists">
      <img class="img-big" :src="item.link" @click="showImg">
      <div v-if="isBtn">
        <img class="del-btn" @click="deleteImg(index)" src="../../assets/images/del-icon.png">
        <!-- <p>
          <img src="../../assets/images/pen-icon.png">
          <input type="file" name="file" class="pen-input" @change="postImg($event, index)">
        </p> -->
      </div>
    </section>
    <section v-if="isBtn" class="img-btn">
      <img class="img-big" src="../../assets/images/add-img.jpg">
      <input type="file" name="file" class="img-input" @change="postImg($event)">
    </section>
  </div>
</template>
<script>
import $ from 'Jquery'
import interfaces from '../../assets/common/interfaces'
import util from '../../assets/common/util'

export default {
    props: ['imgLists', 'type', 'isBtn'],
    data() {
      return {
        imgList: []
      }
    },
    mounted () {
    },
    methods: {
      postImg (e) {
        var opotion = {
          url: 'imageUpload',
          event: e,
          data: {
            fileCode: localStorage.getItem("id"),
            catalogCode: this.type
          }
        }

        util.uploadFile(opotion).then(res => {
          let imgUrl = res.result.result.headImg
          var imgObject = {
            link: imgUrl
          }
          this.imgLists.push(imgObject)
          this.$emit('imgChange', this.type)
        })
      },
      deleteImg (index) {
        util.request({
            method: 'post',
            interface: 'imageDelete',
            data: {
                fileCode: localStorage.getItem("id"),
                url: this.imgLists[index].link
            }
        }).then(res => {
            if (res.result.success == '1') {
              this.imgLists.splice(index, 1)
            } else {
              this.$message.error(res.result.message)
            }
        })
      },
      showImg (e) {
        setTimeout(() => {
          let index = $('body .img-box .img-big').index($(e.target))
          this.$emit('showimg', index)
        }, 0)
      }
    }
}
</script>

<style lang="scss">
  .imgs-box {
    width: 660px;
    margin-left: -10px;
    overflow: hidden;

    .img-box {
      float: left;
      width: 220px;
      height: 182px;
      box-sizing: border-box;
      padding: 7px 10px 11px;
      border-radius: 5px;
      background: #ffffff;

      .img-big {
        display: block;
        width: 200px;
        height: 140px;
      }

      div {
        display: none;
        margin-top: 8px;
        overflow: hidden;
          
        .del-btn {
          float: right;
          width: 16px;
          height: 16px;
          cursor: pointer;

          &:hover {
            opacity: 0.8;
          }
        }

        p {
          float: right;
          width: 16px;
          height: 16px;
          margin: 0;
          margin-right: 13px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          
          img {
            display: block;
            width: 16px;
            height: 16px;

            &:hover {
              opacity: 0.8;
            }
          }

          input {
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0.01;
            width: 16px;
            height: 16px; 
          }
        }
      }

      &:hover {
        background: #EFF2F7;

        div {
          display: block;
        }
      }
    }

    .img-btn {
      float: left;
      position: relative;
      width: 220px;
      height: 182px;
      box-sizing: border-box;
      padding: 7px 10px 11px;
      border-radius: 5px;
      background: #ffffff;
      overflow: hidden;

      .img-big {
        display: block;
        width: 200px;
        height: 140px;

        &:hover {
          opacity: 0.8;
        }
      }

      input {
        position: absolute;
        left: 10px;
        top: 7px;
        opacity: 0.01;
        width: 200px;
        height: 140px;
        cursor: pointer;
      }
    }
  }
</style>