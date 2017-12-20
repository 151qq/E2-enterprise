<template>
    <div class="form-invest">
        <el-collapse v-model="activeNames" @change="collChange">
            <el-collapse-item class="formStyle" title="基本信息" name="1">
                <div class="form-box">
                    <div class="clear"></div>
                    <section class="baseInput bigB">
                        <span>机构名称</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                :disabled="true"
                                v-model="base.enterpriseCname">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>机构简称</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容,最多10个字"
                                :disabled="true"
                                v-model="base.enterpriseNameReg">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>信用评级</span>
                        <el-select class="input-box"
                                   v-model="base.enterpriseCreditLevel"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    :label="'无'"
                                    :value="''">
                            </el-option>
                            <el-option
                                    v-for="(item, index) in enterpriseCreditLevelList"
                                    :key="index"
                                    :label="item.dictKeyValue"
                                    :value="item.dictKeyCode">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput bigB">
                        <span>公司官网</span>
                        <el-input
                                class="input-box"
                                @change="checkWebSite"
                                placeholder="请输入内容"
                                v-model="base.enterpriseWebLink">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>机构法人</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.enterpriseLegalPerson">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>组织机构代码</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.enterpriseCode">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>成立时间</span>
                        <el-date-picker
                                class="input-box"
                                v-model="base.enterpriseOpenTime"
                                placeholder="选择日期"
                                :picker-options="pickerPre">
                        </el-date-picker>
                    </section>
                    <section class="baseInput rightF">
                        <span>企业类型</span>
                        <el-select class="input-box"
                                   v-model="base.enterpriseIndustry"
                                   :disabled="!types[typeKey] || !types[typeKey].length"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    :label="'无'"
                                    :value="''">
                            </el-option>
                            <el-option
                                    v-for="(item, index) in types[typeKey]"
                                    :key="index"
                                    :label="item.typeName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput bigB">
                        <span>注册地址</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.enterpriseRegPlace">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>办公地点</span>
                        <el-select v-model="base.enterpriseLogisticCity"
                                    class="input-box"
                                    @change="cityChange"
                                    filterable placeholder="请选择">
                            <el-option
                                    :label="'无'"
                                    :value="''">
                            </el-option>
                            <el-option
                              v-for="(item, index) in cityData"
                              :key="index"
                              :label="item"
                              :value="item">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput rightF">
                        <span>邮编</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                :disabled="true"
                                v-model="base.enterpriseLogisticZipcode">
                        </el-input>
                    </section>
                    <section class="baseInput bigB">
                        <span>详细地址</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.enterpriseLogisticAddr">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>上市机构</span>
                        <el-select class="input-box"
                                   v-model="base.enterpriseStockSite"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    :label="'无'"
                                    :value="''">
                            </el-option>
                            <el-option
                                    v-for="(item, index) in types.finance_market"
                                    :key="index"
                                    :label="item.typeName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput rightF">
                        <span>股票代码</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.enterpriseStockCode">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>总资产(万)</span>
                        <el-input class="input-box" type="number" size="small" 
                                    :min="0" :step="0.01" v-model="base.enterpriseTotalAsset"></el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>资产负债率(%)</span>
                        <el-input class="input-box" type="number" size="small" 
                                    :min="0" :step="0.01" v-model="base.enterpriseAssetLiabilityRatio"></el-input>
                    </section>
                    <template v-if="['propertys_investmen_type_3', 'propertys_investmen_type_4'].indexOf(base.enterpriseIndustry) > -1">
                        <section class="baseInput">
                            <span>资本充足率(%)</span>
                            <el-input class="input-box" type="number" size="small" 
                                        :min="0" :step="0.01" v-model="base.enterpriseCapitalAdequacyRatio"></el-input>
                        </section>
                        <section class="baseInput rightF">
                            <span>核心资本充足率(%)</span>
                            <el-input class="input-box" type="number" size="small" 
                                        :min="0" :step="0.01" v-model="base.enterpriseCoreCapitialAdequacyRatio"></el-input>
                        </section>
                        <section class="baseInput">
                            <span>存贷款比(%)</span>
                            <el-input class="input-box" type="number" size="small" 
                                        :min="0" :step="0.01" v-model="base.enterpriseDepositLoanRatio"></el-input>
                        </section>
                        <section class="baseInput rightF">
                            <span>不良贷款率(%)</span>
                            <el-input class="input-box" type="number" size="small" 
                                        :min="0" :step="0.01" v-model="base.enterpriseNplRatio"></el-input>
                        </section>
                        <section class="baseInput">
                            <span>拨备覆盖率(%)</span>
                            <el-input class="input-box" type="number" size="small" 
                                        :min="0" :step="0.01" v-model="base.enterpriseProvisionCoverage"></el-input>
                        </section>
                        <section class="baseInput rightF">
                            <span>资产收益率(%)</span>
                            <el-input class="input-box" type="number" size="small" 
                                        :min="0" :step="0.01" v-model="base.enterpriseAssetsReturn"></el-input>
                        </section>
                    </template>
                    <section class="baseInput bigB">
                        <span>公司图片</span>
                        <div class="input-box">
                            <upload :path="base.enterpriseLogoUrl"
                                    :is-operate="true"
                                    :no-del="true"
                                    :bg-path="true"
                                    :is-house-id="true"
                                    @changeImg="changeImg"></upload>
                        </div>
                    </section>

                    <section class="baseInput bigB">
                        <span>公司简介</span>
                        <div class="input-box">
                            <ueditor
                                v-if="isBase"
                                :editor-id="'investDesc' + base.id"
                                :editor-type="'text'"
                                :content="base.enterpriseDesc"
                                @setContent="setContent"></ueditor>
                        </div>
                    </section>
                    <div class="clear"></div>
                </div>
                <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="saveBase">保存</el-button>
                <div class="clear"></div>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="公共账号" name="2">
                <section class="upload-list-box">
                    <ewm-upload :path="base.enterpriseEntprisewechatQrcode"
                                :title-name="base.enterprisePubwechatAccount"
                                :place-holder="'请输入微信公众号'"
                                :id-name="'wxPulic'"
                                :is-operate="true"
                                @changeImg='wxPulicImg'
                                :width="'160px'"></ewm-upload>

                    <ewm-upload :path="base.enterpriseTwitterQrcode"
                                :title-name="base.enterpriseTwitterAccount"
                                :place-holder="'请输入twitter账号'"
                                :id-name="'twitterName'"
                                :is-operate="true"
                                @changeImg='twitterImg'
                                :width="'160px'"></ewm-upload>

                    <ewm-upload :path="base.enterpriseFacebookQrcode"
                                :title-name="base.enterpriseFacebookAccount"
                                :place-holder="'请输入facebook账号'"
                                :id-name="'facebookName'"
                                :is-operate="true"
                                @changeImg='facebookImg'
                                :width="'160px'"></ewm-upload>

                    <ewm-upload :path="base.enterpriseSinamicroblogQrcode"
                                :title-name="base.enterpriseSinamicorblogAccount"
                                :place-holder="'请输入微博账号'"
                                :id-name="'wbName'"
                                :is-operate="true"
                                @changeImg='wbImg'
                                :width="'160px'"></ewm-upload>
                </section>
                
                <div class="clear"></div>
                <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="saveBase">保存</el-button>
                <div class="clear"></div>
            </el-collapse-item>
            <template>
                <div class="line-bold"></div>
                <el-collapse-item class="formStyle" title="用户授权" name="3">
                    <span class="link-btn" @click="addRole">新增</span>
                    <el-table
                        :data="roleList"
                        border
                        style="width: 100%">
                        <el-table-column
                          prop="memberCname"
                          label="用户名">
                        </el-table-column>
                        <el-table-column
                          prop="memberMobile"
                          label="手机号">
                        </el-table-column>
                        <el-table-column
                          label="操作"
                          width="80">
                          <template scope="scope">
                            <i class="el-icon-delete2" @click="deleteRole(scope.row)"></i>
                          </template>
                        </el-table-column>
                    </el-table>
                </el-collapse-item>
            </template>
        </el-collapse>
        <el-dialog title="添加用户" :visible.sync="isAddRole">
            <el-form :label-position="'left'">
                <el-form-item label="用户名" :label-width="'80px'">
                  <el-input class="table-input-box" size="small"
                        v-model="addRoleData.memberCname"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="'80px'">
                  <el-input class="table-input-box" size="small"
                        v-model="addRoleData.memberMobile"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isAddRole = false">取 消</el-button>
                <el-button type="primary" @click="confirmAddRole">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import util from '../../../assets/common/util'
    import upload from '../../../components/common/upload'
    import ewmUpload from '../../../components/common/ewm-upload'
    import ueditor from '../../../components/common/ueditor'

    export default {
        data () {
            return {
                base: {
                    id: '',
                    enterpriseCname: '',
                    enterpriseNameReg: '',
                    enterpriseCode: '',
                    enterpriseOpenTime: '',
                    enterpriseType: '',
                    enterpriseLevel: '',
                    enterpriseRegPlace: '',
                    enterpriseLogisticCity: '',
                    enterpriseLogisticZipcode: '',
                    enterpriseLogisticAddr: '',
                    enterpriseStockSite: '',
                    enterpriseStockCode: '',
                    enterpriseWebLink: '',
                    enterpriseLogoUrl: '',
                    enterpriseDesc: '',
                    enterpriseIndustry: '',
                    enterpriseEntprisewechatQrcode: '',
                    enterpriseTwitterQrcode: '',
                    enterpriseFacebookQrcode: '',
                    enterpriseSinamicroblogQrcode: '',
                    enterprisePubwechatAccount: '',
                    enterpriseFacebookAccount: '',
                    enterpriseSinamicorblogAccount: '',
                    enterpriseCreditLevel: '',
                    enterpriseTotalAsset: '',
                    enterpriseAssetLiabilityRatio: '',
                    enterpriseCapitalAdequacyRatio: '',
                    enterpriseCoreCapitialAdequacyRatio: '',
                    enterpriseDepositLoanRatio: '',
                    enterpriseNplRatio: '',
                    enterpriseProvisionCoverage: '',
                    enterpriseAssetsReturn: '',
                    unitChain: ''
                },
                isBase: false,
                activeNames: ['1'],
                pickerPre: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now()
                    }
                },
                postList: [],
                cityData: [],
                citys: [],
                types: {
                    finance_org_type: [],
                    finance_market: []
                },
                typeData: {
                    finance_org_type_0: '',
                    finance_org_type_1: 'propertys_investmen_type',
                    finance_org_type_2: 'propertys_agent_type'
                },
                typeKey: '',
                enterpriseCreditLevelList: [],
                roleList: [],
                isAddRole: false,
                addRoleData: {}
            }
        },
        mounted () {
            var houseColl = localStorage.getItem("houseColl")
            if (houseColl) {
                this.activeNames = houseColl.split(',')
            }
            document.title = '企业信息'

            this.getAllData()
            this.getTypes()
            this.getCitys()
            this.getEnterpriseCreditLevel()
        },
        methods: {
            wxPulicImg (data) {
                this.base.enterpriseEntprisewechatQrcode = data.url
                this.base.enterprisePubwechatAccount = data.title
            },
            twitterImg (data) {
                this.base.enterpriseTwitterQrcode = data.url
                this.base.enterpriseTwitterAccount = data.title
            },
            facebookImg (data) {
                this.base.enterpriseFacebookQrcode = data.url
                this.base.enterpriseFacebookAccount = data.title
           },
            wbImg (data) {
                this.base.enterpriseSinamicroblogQrcode = data.url
                this.base.enterpriseSinamicorblogAccount = data.title
            },
            addRole (typeKey) {
                this.addRoleData = {
                    enterpriseCode: this.$route.query.code,
                    memberCname: '',
                    memberMobile: ''
                }

                this.isAddRole = true
            },
            confirmAddRole () {
                if (this.addRoleData.memberMobile.trim() == '' || !(/^1[3|4|5|8][0-9]\d{4,8}$/).test(this.addRoleData.memberMobile.trim())) {
                    this.$message.error('请输入11位注册手机号')
                    return
                }

                util.request({
                    method: 'post',
                    interface: 'registerMember',
                    data: this.addRoleData
                }).then(res => {
                    if (res.result.success == '1') {
                        this.getRoles()
                        this.isAddRole = false
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
            },
            getRoles () {
                util.request({
                    method: 'post',
                    interface: 'searchMemberPageResult',
                    data: {
                        enterpriseCode: this.$route.query.code
                    }
                }).then(res => {
                    if (res.result.success == '1') {
                        this.roleList = res.result.result
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
            },
            deleteRole (item) {
                util.request({
                    method: 'post',
                    interface: 'deleteMember',
                    data: {
                        id: item.id,
                        memberCode: item.memberCode,
                        memberStatus: '-1'
                    }
                }).then(res => {
                    if (res.result.success == '1') {
                        this.getRoles()
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
            },
            getAllData () {
                this.getBase()
                this.getRoles()
            },
            getBase () {
                util.request({
                    method: 'get',
                    interface: 'getInvestBase',
                    data: {
                        enterpriseCode: this.$route.query.code
                    }
                }).then(res => {
                    if (res.result.success == '0') {
                        this.$message.error(res.result.message)
                        return
                    }

                    this.base = res.result.result
                    this.typeKey = this.typeData[this.base.enterpriseType]

                    setTimeout(() => {
                        this.isBase = true
                    }, 0)
                })
            },
            getTypes () {
                util.request({
                    method: 'get',
                    interface: 'investTypes',
                    data: {}
                }).then(res => {
                    if (res.result.success == '1') {
                        this.types = res.result.result
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
            },
            getEnterpriseCreditLevel () {
                util.request({
                    method: 'get',
                    interface: 'findDictionaryByType',
                    data: {
                        typeCode: 'enterprise_credit_level'
                    }
                }).then(res => {
                    this.enterpriseCreditLevelList = res.result.result
                })
            },
            getCitys () {
                util.request({
                    method: 'get',
                    interface: 'getCitys',
                    data: {}
                }).then(res => {
                    if (res.result.success == '1') {
                        var citys = []
                        var posts = []

                        res.result.results.forEach((item) => {
                            citys = citys.concat(item.citys)
                            posts = posts.concat(item.posts)
                        })

                        this.cityData = citys
                        this.postList = posts
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
            },
            cityChange () {
                for (var i = 0, len = this.cityData.length; i < len; i++) {
                    if (this.cityData[i] == this.base.enterpriseLogisticCity) {
                        this.base.enterpriseLogisticZipcode = this.postList[i]
                        break
                    }
                }
            },
            checkWebSite () {
                var webSite = this.base.enterpriseWebLink
                this.base.enterpriseWebLink = webSite.replace(/[\u4e00-\u9fa5]/g,'')
            },
            setContent (data) {
                this.base.enterpriseDesc = data.content
            },
            collChange () {
                localStorage.setItem("houseColl", this.activeNames)
            },
            changeImg (data) {
                this.base.enterpriseLogoUrl = data.url
            },
            formDataDate (str) {
                var dateStr = new Date(str)
                var year = dateStr.getFullYear()
                var monthStr = dateStr.getMonth() + 1
                var dayStr = dateStr.getDate()
                var month = monthStr < 10 ? '0' + monthStr : monthStr
                var day = dayStr < 10 ? '0' + dayStr : dayStr
                return year + '-' + month + '-' + day
            },
            saveBase () {
                if (!this.base.enterpriseNameReg) {
                    this.$message({
                        message: '请填写机构简称！',
                        type: 'warning'
                    })
                    return false
                }

                if (this.base.enterpriseNameReg.length > 10) {
                    this.$message({
                        message: '机构简称最多10个字！',
                        type: 'warning'
                    })
                    return false
                }

                if (!this.base.enterpriseCode) {
                    this.$message({
                        message: '请选添加组织机构代码！',
                        type: 'warning'
                    })
                    return false
                }

                if (this.base.enterpriseType != 'finance_org_type_0' && !this.base.enterpriseIndustry) {
                    this.$message({
                        message: '请选添加企业类型！',
                        type: 'warning'
                    })
                    return false
                }

                if (this.base.enterprisePubwechatAccount.length > 16) {
                    this.$message({
                        message: '微信公众账号最多16个字符！',
                        type: 'warning'
                    })
                    return false
                }

                if (this.base.enterpriseTwitterAccount.length > 16) {
                    this.$message({
                        message: 'Twitter账号最多16个字！',
                        type: 'warning'
                    })
                    return false
                }

                if (this.base.enterpriseFacebookAccount.length > 16) {
                    this.$message({
                        message: 'Facebook账号最多16个字！',
                        type: 'warning'
                    })
                    return false
                }

                if (this.base.enterpriseSinamicorblogAccount.length > 16) {
                    this.$message({
                        message: '微博账号最多16个字！',
                        type: 'warning'
                    })
                    return false
                }

                if (this.base.enterpriseOpenTime) {
                    this.base.enterpriseOpenTime = this.formDataDate(this.base.enterpriseOpenTime)
                }
                
                util.request({
                    method: 'post',
                    interface: 'saveInvestBase',
                    data: this.base
                }).then(res => {
                    if (res.result.success == '1') {
                        this.$parent.$refs.listBox.loadList('reload')
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
            }
        },
        components: {
            upload,
            ewmUpload,
            ueditor
        }
    }
</script>
<style lang="scss">
.form-invest {
    margin-top: 30px;

    .upload-list-box {
        width: 110%;
    }

    .el-dialog--small {
        width: 400px;
    }

    .formStyle {
        position: relative;
        width: 640px;
        margin: 0 auto;

        .edui-default .edui-editor {
            border-color: #bfcbd9;
        }

        .edui-editor-iframeholder {
            min-height: 150px;
        }

        .link-btn {
            position: absolute;
            right: 0;
            top: 7px;
            width: 60px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            font-size: 12px;
            border-radius: 4px;
            color: #fff;
            background-color: #20a0ff;
        }

        .add-btn {
            position: absolute;
            right: 0;
            top: 7px;
            
        }

        .save-btn {
            float: right;
            margin-top: 10px;
        }

        .abInput {
            position: absolute;
            right: 0;
            top: 4px;
            height: 30px;
        }

        &:last-child {
            margin-bottom: 30px;
        }
    }

    .clear {
        clear: both;
    }

    .line-bold {
        height: 9px;
        border-top: 1px solid #99A9BF;
        background: #F9F9F9;
        margin: 30px 0;
    }

    .el-collapse, .el-collapse-item__header, .el-collapse-item__wrap {
        background: #ffffff;
        border: none;
    }

    .el-collapse-item__wrap {
        padding-top: 20px;
        overflow: visible;
    }

    .el-collapse-item__content {
        padding: 0;
    }

    .el-collapse-item__header {
        font-size: 20px;
        color: #000000;
        padding: 0;
    }

    #container {
        width: 640px;
        height: 180px;
        margin: 0 0 15px;
    }

    .switch-box {
        width: 300px;
    }

    .qx-box {
        margin-bottom: 10px;

        .label-box {
            float: left;
            width: 70px;
            font-size: 14px;
            color: #666666;
            line-height: 30px;
        }

        .input-box {
            float: left;
            width: 220px;
            margin-right: 10px;

            input {
                height: 30px;
            }
        }

        .btn-box {
            font-size: 16px;

            i {
                cursor: pointer;
            }
        }
    }

    .baseInput {
        float: left;
        margin-bottom: 20px;

        &>span {
            float: left;
            width: 120px;
            font-size: 14px;
            color: #999999;
            line-height: 30px;
        }

        .abstract-num {
          float: right;
          span {
            color: red;
          }
        }

        .input-box {
            float: left;
            width: 185px;

            input {
                height: 30px;
            }
        }

        .numBox {
            float: right;
            font-size: 12px;
            line-height: 20px;

            span {
                color: #20a0ff;
            }
        }
    }

    .bigB {
        .input-box {
            width: 520px;

            .el-select {
                width: 520px;
            }
        }

        .el-textarea {
          width: 520px;
        }
    }

    .rightF {
        float: right;
    }

    .over-box {
        width: 670px;
        padding: 15px 15px 0;
        box-sizing: border-box;
        overflow: hidden;
        margin-left: -15px;

        &:nth-of-type(2n) {
            background: #F9F9F9;
        }

        .delete-btn {
            float: right;
            margin-bottom: 20px;
            cursor: pointer;
        }

        .save-sub-btn {
            float: right;
            margin-bottom: 20px;
            margin-left: 12px;
        }
    }
}
</style>