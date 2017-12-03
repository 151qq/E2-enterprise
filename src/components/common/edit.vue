<template>
    <section class="edit-box">
        <section class='bodyMain'>
            <div name="content" class="list-group">
                <div class="list-group-item"
                        v-for="(item, index) in articleList"
                        :data-id="index"> 
                    
                    <template v-if="!isLook">
                        <div class="show-box" v-if="item.type === 'upload'">
                            <upload
                                :path="item.imgUrl"
                                :num="index" 
                                :idx="item.id"
                                :id-name="'edit-img' + index"
                                :no-save="true"
                                @delImg="delImg"
                                @changeImg="changeImg"
                                @saveImg="saveData('upload', index)"></upload>
                        </div>

                        <div class="show-box" v-if="item.type === 'text'">
                            <ueditor :editor-id="'editorText' + index"
                                        :editor-type="'text'"
                                        :index="index"
                                        :content="item.content"
                                        @setContent="setContent"></ueditor>
                        </div>

                        <div class="show-box btn-show" v-if="item.type === 'table'">
                            <ueditor :editor-id="'editorTable' + index"
                                        :editor-type="'table'"
                                        :index="index"
                                        :content="item.content"
                                        @setContent="setContent"></ueditor>
                        </div>

                        <div class="show-box" v-if="item.type === 'map'">
                            <div v-html="item.content"></div>
                        </div>

                        <div class="show-box overflow-box" v-if="item.type === 'title'">
                            <input v-if="item.style"
                                    type="text"
                                    v-model="item.title"
                                    @blur="titleBlur(item, index)"
                                    :style="item.style"
                                    placeholder="编辑中的内标题样式">
                            <img v-if="!item.style"
                                    class="img-default"
                                    @click.prevent="setStyle(index, item.style)"
                                    src="../../assets/images/title-default.jpg">
                        </div>
                    </template>

                    <div v-if="isLook" v-html="item.content"></div>

                    <section v-if="!isLook" class="btn-show">
                        <div class="btn-hover">
                            <el-button class="delete-btn" type="danger"
                                    :plain="true" size="small"
                                    :icon="btnShowIndex === index ? 'caret-left' : 'caret-right'"
                                    @click="showHiddenBtn(index)">操作</el-button>

                            <template v-if="btnShowIndex === index">
                                <el-button class="delete-btn" type="danger"
                                    :plain="true" size="small"icon="delete"
                                    @click="deleteArticleArea(item.id, index)">删除</el-button>
                                <el-button class="delete-btn" type="danger"
                                        v-if="item.type == 'title'"
                                        :plain="true" size="small" icon="setting"
                                        @click="setStyle(index, item.style)">配置</el-button>
                                <el-button class="delete-btn" type="danger"
                                        v-if="item.type == 'map'"
                                        :plain="true" size="small" icon="setting"
                                        @click="changeMap(index)">更改</el-button>
                                <el-button class="delete-btn" type="danger"
                                        :plain="true" size="small" icon="caret-bottom"
                                        @click="downMove(index)">下移</el-button>
                                <el-button class="delete-btn" type="danger"
                                        :plain="true" size="small" icon="caret-top"
                                        @click="upMove(index)">上移</el-button>
                                <div class="sort-box">
                                    编号：{{index}} &nbsp;&nbsp;
                                    移动至
                                    <el-input
                                        class="sortInput"
                                        size="small"
                                        min="0"
                                        placeholder="编号"
                                        v-model="sortNum">
                                        <el-button slot="append" @click="moveArea(index)">go</el-button>
                                    </el-input>
                                </div>
                            </template>
                        </div>
                    </section>
                </div>
            </div>
        </section>
        <div class="edit-btn">
            <div @click="addTem('look')">
                <img class="gray-box" src="../../assets/images/add-look-icon.png">
                <img class="now-box" src="../../assets/images/look-icon.png">
            </div>
            <div @click="addTem('upload')">
                <img class="gray-box" src="../../assets/images/add-img-icon.png">
                <img class="now-box" src="../../assets/images/img-now.png">
            </div>
            <div @click="addTem('text')">
                <img class="gray-box" src="../../assets/images/add-text-icon.png">
                <img class="now-box" src="../../assets/images/text-now.png">
            </div>
            <div @click="addTem('table')">
                <img class="gray-box" src="../../assets/images/add-table-icon.png">
                <img class="now-box" src="../../assets/images/table-now.png">
            </div>
            <div @click="addTem('map')">
                <img class="gray-box" src="../../assets/images/add-map-icon.png">
                <img class="now-box" src="../../assets/images/map-now.png">
            </div>
            <div class="title-box" @click="addTem('title')">
                <img class="gray-box" src="../../assets/images/add-title-icon.png">
                <img class="now-box" src="../../assets/images/title-now.png">
            </div>
            <div class="save-box" @click="saveAll">
                <img class="gray-box" src="../../assets/images/save-all-data.png">
                <img class="now-box" src="../../assets/images/save-now.png">
            </div>
        </div>
        <el-dialog class="style-b" title="选择内标题样式" :visible.sync="isStyle">
            <div class="style-box"
                    v-for="(item, index) in titleLists"
                    @click="selectStyle(index)"
                    :class="index === curIndex ? 'active' : ''">
                <img :src="item.imgUrl">
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeSelect">取 消</el-button>
                <el-button type="primary" @click="confirmSelect">确 定</el-button>
            </div>
        </el-dialog>

        <!-- <el-dialog title="选择内标题样式" :visible.sync="isLook">
            <div class=""
                    v-for="(item, index) in articleList"
                    v-html="item.content">
            </div>
        </el-dialog> -->

        <search-map :is-add="isMapBox" :map-data="mapData" ref="searchMap" @setMap="setMap"></search-map>
    </section>
</template>
<script>
import draggable from 'vuedraggable'
import util from '../../assets/common/util'
import upload from '../../components/common/upload'
import ueditor from '../../components/common/ueditor'
import $ from 'Jquery'
import sortable from 'sortablejs'
import searchMap from '../../components/common/searchMap'

export default {
    props: ['isSave'],
    data () {
        return {
            articleList: [],
            disabled: false,
            backgroundImg: '#f0f0f0;',
            templateAdd: [],
            imgStyle: 'display: block; max-width: 100%; margin: 10px 0;',
            isStyle: false,
            curTemIndex: '',
            curIndex: '',
            curStyle: '',
            titleIndex: '',
            titleLists: [
                {
                    imgUrl: "/static/images/title-default.jpg",
                    style: "display: block; width: 100%; padding: 3px 10px; border: none; font-size: 16px; color: #000000; line-height: 30px;"
                },
                {
                    imgUrl: "/static/images/title-default.jpg",
                    style: "display: block; width: 100%; padding: 3px 10px; border: none; text-align: center; font-size: 16px; color: #000000; line-height: 30px;"
                },
                {
                    imgUrl: "/static/images/title-default.jpg",
                    style: "display: block; width: 100%; padding: 3px 10px; border: none; text-align: right; font-size: 16px; color: #000000; line-height: 30px;"
                }
            ],
            templateList: [],
            selectTemplate: {},
            articleId: '',
            html5PageCode: '',
            isMapBox: {
                value: false
            },
            mapData: {
                address: '',
                point: '',
                content: ''
            },
            sortNum: '',
            btnShowIndex: '',
            isLook: false,
            areaCodes: {
                text: '001',
                table: '002',
                map: '003',
                title: '004',
                upload: '005'
            }
        }
    },
    methods:{
        editInte (data) {
            var templateStr = ''
            var arrData = []
            data.article.forEach((item) => {
                if (item.sequence >= 20) {
                    switch (item.areaType) {
                        case 'upload':
                            var data = {
                                type: 'upload',
                                imgUrl: $(item.areaTxt).attr('src'),
                                content: item.areaTxt,
                                fileCode: item.fileCode,
                                id: item.id
                            }
                            console.log($(item.areaTxt), '$')
                            arrData.push(data)
                            break
                        case 'text':
                            var data = {
                                type: 'text',
                                content: item.areaTxt,
                                fileCode: item.fileCode,
                                id: item.id
                            }
                            arrData.push(data)
                            break
                        case 'table':
                            var data = {
                                type: 'table',
                                content: item.areaTxt,
                                fileCode: item.fileCode,
                                id: item.id
                            }
                            arrData.push(data)
                            break
                        case 'map':
                            var data = {
                                type: 'map',
                                content: item.areaTxt,
                                fileCode: item.fileCode,
                                id: item.id,
                            }
                            data = Object.assign(data, this.getMapData(item.areaTxt))

                            arrData.push(data)
                            break
                        case 'title':
                            var data = {
                                type: 'title',
                                title: $(item.areaTxt).text(),
                                style: $(item.areaTxt).attr('style'),
                                content: item.areaTxt,
                                fileCode: item.fileCode,
                                id: item.id
                            }
                            arrData.push(data)
                            break
                    }
                }
            })
            this.articleList = arrData
            this.backgroundImg = data.bgImg ? 'url(' + data.bgImg + ') center top no-repeat' : '#f0f0f0'
            setTimeout(() => {
                $('.bodyMain').css('background', this.backgroundImg)
            }, 0)
        },
        getMapData (el) {
            var url = $(el).attr('src')
            var queryArr = url.split('&')
            var len = queryArr.length
            return {
                address: queryArr[len - 1].split('=')[1],
                point: queryArr[len - 2].split('=')[1]
            }
        },
        showHiddenBtn (index) {
            if (this.btnShowIndex === index) {
                this.sortNum = ''
                this.btnShowIndex = ''
                return false
            }
            this.btnShowIndex = index
        },
        upMove (index) {
            this.moveTo(index, index - 1)
        },
        downMove (index) {
            this.moveTo(index, index + 1)
        },
        moveArea (index) {
            if (this.sortNum === '') {
                return
            }
            this.moveTo(index, Math.floor(this.sortNum))
        },
        moveTo (oldIndex, newIndex) {
            var toIndex = ''
            if (newIndex < 0) {
                toIndex = 0
            } else if (newIndex > this.articleList.length - 1) {
                toIndex = this.articleList.length - 1
            } else {
                toIndex = newIndex
            }

            var obj = this.articleList[oldIndex]
            
            if (oldIndex > toIndex) {
                // 上移 先移除，后添加
                this.articleList.splice(oldIndex, 1)
                this.articleList.splice(toIndex, 0, obj)
            } else if (oldIndex < toIndex) {
                // 下移 先添加，后移除
                this.articleList.splice(toIndex, 0, obj)
                this.articleList.splice(oldIndex, 1)
            }

            this.btnShowIndex = toIndex
            this.sortNum = ''

            if (oldIndex === toIndex) {
                return
            }

            var data = this.articleList.concat([])
            this.articleList = []
            setTimeout(() => {
                this.articleList = data.concat([])
            }, 0)
        },
        saveArticle (data) {
            var formData = {
                type: this.$route.name,
                areaTxt: '',
                html5TemplateCode: this.$route.name == 'house' ? 'tpl_001' : 'tpl_002'
            }

            if (data) {
                if (data.title) {
                    formData.html5PageTitle = data.title
                }
                if (data.investor) {
                    formData.editorCode = data.investor
                }
                if (data.abstract) {
                    formData.html5Summary = data.abstract
                }
                if (data.pageImg) {
                    formData.html5PageindexImg = data.pageImg
                }
                if (data.html5PageCode) {
                    formData.html5PageCode = data.html5PageCode
                }
                formData.id = data.id
                formData.html5CatalogCode = data.html5CatalogCode
            }
            
            util.request({
                method: 'post',
                interface: 'draftArticle',
                data: formData
            }).then(res => {
                var resData = res.result.result

                if (resData.backgroundImg && !this.articleId) {
                    this.backgroundImg = 'url(' + resData.backgroundImg + ') center top no-repeat'
                    $('.bodyMain').css('background', this.backgroundImg)
                }

                this.html5TemplateCode = resData.html5TemplateCode
                this.html5PageCode = resData.html5PageCode
                this.articleId = resData.id

                if (!data.isHouse) {
                    this.$parent.$parent.$parent.$parent.$refs.listBox.reloadList(this.html5PageCode)
                }
            })
        },
        saveData (type, index) {
            util.request({
                method: 'post',
                interface: 'saveArticleArea',
                data: {
                    areaType: type,
                    areaCode: this.areaCodes[type],
                    html5TemplateCode: this.html5TemplateCode,
                    areaTxt: this.articleList[index].content,
                    fileCode: this.html5PageCode ? this.html5PageCode : localStorage.getItem("id"),
                    id: this.articleList[index].id ? this.articleList[index].id : '',
                    sequence: index + 20
                }
            }).then(res => {
                this.articleList[index].id = res.result.result
            })
        },
        saveAll () {
            this.articleList.forEach((item, index) => {
                this.saveData(item.type, index)
            })

            if (this.$route.name == 'house') {
                setTimeout(() => {
                    this.submitArticle()
                }, 3000)
            }
        },
        submitArticle () {
            util.request({
              method: 'post',
              interface: 'publishArticle',
              data: {
                html5PageCode: localStorage.getItem('htmlHouseCode')
              }
            }).then(res => {
            })
        },
        // setSortable () {
        //     var _this = this

        //     var articleArea = document.getElementById('articleArea')
        //     this.sortable = sortable.create(articleArea, {
        //         handle: ".list-group-item",
        //         animation: 100,
        //         group: {name: "articleArea", pull: false, put: false},
        //         filter: '.filter',
        //         sort: true,
        //         disabled: true,
        //         onUpdate ({oldIndex, newIndex}) {
        //             let preData = _this.articleList[newIndex]
        //             _this.articleList[newIndex] = _this.articleList[oldIndex]
        //             _this.articleList[oldIndex] = preData
        //         }
        //     })
        // },
        addTem (type) {
            switch (type) {
                case 'upload':
                    var data = {
                        type: 'upload',
                        imgUrl: '',
                        content: ''
                    }
                    this.articleList.push(data)
                    break
                case 'text':
                    var data = {
                        type: 'text',
                        content: ''
                    }
                    this.articleList.push(data)
                    break
                case 'table':
                    var data = {
                        type: 'table',
                        content: ''
                    }
                    this.articleList.push(data)
                    break
                case 'map':
                    this.mapData = {
                        type: 'map',
                        address: '',
                        point: '',
                        content: ''
                    }
                    this.isMapBox.value = true
                    setTimeout(() => {
                        this.$refs.searchMap.initMap()
                    }, 0)
                    break
                case 'title':
                    var data = {
                        type: 'title',
                        title: '',
                        content: '',
                        style: this.titleLists[0].style
                    }
                    this.articleList.push(data)
                    this.selectStyle(0)
                    break
                case 'look':
                    this.isLook = !this.isLook
                    break
            }
        },
        setMap (data) {
            if (data.index === '') {
                var obj = {
                    type: 'map',
                    point: data.point,
                    content: data.content,
                    address: data.address
                }
                this.articleList.push(obj)
            } else {
                var obj = this.articleList[data.index]
                obj.point = data.point
                obj.content = data.content
                obj.address = data.address
            }

            this.isMapBox.value = false
        },
        changeMap (index) {
            this.mapData = Object.assign({}, this.articleList[index])
            this.isMapBox.value = true
            setTimeout(() => {
                this.$refs.searchMap.initMap(index)
            }, 0)
        },
        delImg (data) {
            this.deleteArticleArea(this.articleList[data.index].id, data.index)
        },
        changeImg (data) {
            var imgData = {
                id: data.id,
                type: 'upload',
                imgUrl: data.url,
                content: '<img src="' + data.url + '" style="' + this.imgStyle +'">'
            }
            this.articleList.splice(data.index, 1, imgData)
        },
        setContent (data) {
            this.articleList[data.index].content = data.content
        },
        setStyle (index, style) {
            this.isStyle = true
            this.titleIndex = index
            // 初始选中style
            if (style) {
                for (var i = 0, length = this.titleLists.length; i < length; i++) {
                    if (this.titleLists[i].style === style) {
                        this.curIndex = i
                        this.curStyle = style
                        break
                    }
                }
            } else {
                this.curIndex = ''
                this.curStyle = ''
            }
        },
        selectStyle (index) {
            this.curIndex = index
            this.curStyle = this.titleLists[index].style
        },
        confirmSelect () {
            this.articleList[this.titleIndex].style = this.curStyle
            this.isStyle = false
        },
        closeSelect () {
            this.isStyle = false
        },
        deleteArticleArea (id, index) {
            if (id) {
                util.request({
                    method: 'post',
                    interface: 'deleteArticleArea',
                    data: {
                        id: id
                    }
                }).then(res => {
                    this.articleList.splice(index, 1)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                })
            } else {
                this.articleList.splice(index, 1)
            }
        },
        resetTitle (index) {
            var data = {
                type: 'title',
                title: '',
                content: '',
                style: ''
            }
            this.articleList.splice(index, 1, data)
        },
        titleBlur (item, index) {
            this.articleList[index].content = '<div style="' + item.style + '">' + item.title + '</div>'
            this.articleList[index].style = item.style            
        }
    },
    components: {
        draggable,
        upload,
        ueditor,
        searchMap
    }
}
</script>
<style lang="scss">
.edit-box {
    position: relative;
    min-height: 500px;

    .bodyMain {
        padding: 30px 20px 20px;
        background-size: 100% auto;
    }

    .select-template {
        background: #f0f0f0;
        font-size: 30px;
        font-weight: bold;
        text-align: center;
        line-height: 350px;
        color: #999999;
        cursor: pointer;
    }

    .list-group {
        min-height: 500px;
    }

    .show-box {
        cursor: pointer;
        margin-bottom: 10px;

        .img-default {
            display: block;
            width: 640px;
            margin: auto;
        }
    }

    .overflow-box {
        overflow: hidden;
    }

    .btn-show {
        margin-bottom: 10px;

        .btn-hover {
            display: block;
            margin-top: 10px;
            overflow: hidden;

            .sort-box {
                float: left;

                .sortInput {
                    width: 80px;
                    height: 28px;

                    .el-input__inner {
                        height: 28px;
                    }

                    .el-input-group__append {
                        padding: 0;
                    }
                }
            }
        }

        .btns {
            background: #EFF2F7;
            display: block;
            padding: 12px;
            overflow: hidden;

            .del-btn {
              float: right;
              width: 16px;
              height: 16px;
              cursor: pointer;
              margin-left: 9px;

              &:hover {
                opacity: 0.8;
              }
            }
        }


        .delete-btn {
            float: right;
            margin-left: 10px;
        }
    }

    .edit-btn {
        position: absolute;
        width: 100px;
        right: -110px;
        bottom: 0;

        div {
            width: 48px;
            height: 48px;
            overflow: hidden;
            margin-top: 10px;
            border-radius: 5px;
            cursor: pointer;

            img {
                display: block;
                width: 100%;
                box-sizing: border-box;
                border: 1px solid #ffffff;
            }

            .now-box {
                display: none;
            }

            &:hover {
                .gray-box {
                    display: none;
                }

                .now-box {
                    display: block;
                }
            }
        }

        .title-box {
            width: 54px;
            height: 54px;
            margin-left: -3px;
        }

        .save-box {
            width: 42px;
            height: 42px;
            margin-left: 3px;
        }
    }
}

.style-b {
    min-height: 360px;
}

.style-box {
    margin-bottom: 15px;
    padding: 3px;

    img {
        display: block;
        width: 100%;
    }

    &.active {
        border: 1px solid #FF4949;
        border-radius: 3px;
    }
}
</style>