webpackJsonp([10],{

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(388)
}
var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(327),
  /* template */
  __webpack_require__(438),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_common_util__ = __webpack_require__(50);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            changes: [],
            total: 0,
            pageSize: 10,
            pageNumber: 1,
            dialogFormVisible: false,
            curentData: {
                id: '',
                housesId: '',
                houseTradeDate: '',
                houseRradePrice: '',
                houseTradeACode: '',
                houseTradeBCode: '',
                houseTradeDesc: '',
                houseTradeType: '',
                houseTradeConsultingOrg: [],
                houseTradeEvaluationOrg: []
            },
            pickerPre: {
                disabledDate: function disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            investList: [],
            agentAList: [],
            agentBList: [],
            houseTradeTypeList: [],
            hisUser: ''
        };
    },
    mounted: function mounted() {
        this.getChanges();
        this.getInvests();
        this.getAgentA();
        this.getAgentB();
        this.getHouseTradeTypeList();
        document.title = '交易历史明细';
    },

    computed: {
        isOperate: function isOperate() {
            return this.hisUser && this.$route.query.user && this.hisUser == this.$route.query.user;
        }
    },
    methods: {
        getChanges: function getChanges() {
            var _this = this;

            __WEBPACK_IMPORTED_MODULE_0__assets_common_util__["a" /* default */].request({
                method: 'get',
                interface: 'changes',
                data: {
                    housesId: this.$route.query.id,
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber
                }
            }).then(function (res) {
                res.result.result.changes.forEach(function (item) {
                    item.houseTradeDate = item.houseTradeDate.split(' ')[0];
                });

                _this.hisUser = res.result.request;
                _this.changes = res.result.result.changes;
                _this.total = _this.total ? Number(_this.total) : 0;
            });
        },
        getInvests: function getInvests() {
            var _this2 = this;

            __WEBPACK_IMPORTED_MODULE_0__assets_common_util__["a" /* default */].request({
                method: 'get',
                interface: 'findEntByEntType',
                data: {
                    enterpriseTypes: 'finance_org_type_1'
                }
            }).then(function (res) {
                _this2.investList = res.result.result;
            });
        },
        getAgentA: function getAgentA() {
            var _this3 = this;

            __WEBPACK_IMPORTED_MODULE_0__assets_common_util__["a" /* default */].request({
                method: 'get',
                interface: 'findEntByEntType',
                data: {
                    enterpriseTypes: 'propertys_agent_type_3'
                }
            }).then(function (res) {
                _this3.agentAList = res.result.result;
            });
        },
        getAgentB: function getAgentB() {
            var _this4 = this;

            __WEBPACK_IMPORTED_MODULE_0__assets_common_util__["a" /* default */].request({
                method: 'get',
                interface: 'findEntByEntType',
                data: {
                    enterpriseTypes: 'propertys_agent_type_1'
                }
            }).then(function (res) {
                _this4.agentBList = res.result.result;
            });
        },
        getHouseTradeTypeList: function getHouseTradeTypeList() {
            var _this5 = this;

            __WEBPACK_IMPORTED_MODULE_0__assets_common_util__["a" /* default */].request({
                method: 'get',
                interface: 'findDictionaryByType',
                data: {
                    typeCode: 'propertys_trade_type'
                }
            }).then(function (res) {
                _this5.houseTradeTypeList = res.result.result;
            });
        },
        pageChange: function pageChange(page) {
            this.pageNumber++;
            this.getChanges();
        },
        deleteRow: function deleteRow(row) {
            var _this6 = this;

            this.$alert('您考虑好了吗？确定要删除记录!', '删除', {
                confirmButtonText: '确定',
                callback: function callback(action) {
                    __WEBPACK_IMPORTED_MODULE_0__assets_common_util__["a" /* default */].request({
                        method: 'post',
                        interface: 'deleteTradeHistory',
                        data: {
                            id: row.id
                        }
                    }).then(function (res) {
                        if (res.result.success == '1') {
                            _this6.getChanges();
                            _this6.$message({
                                type: 'info',
                                message: '删除成功'
                            });
                        } else {
                            _this6.$message.error(res.result.message);
                        }
                    });
                }
            });
        },
        showModel: function showModel(row) {
            var _this7 = this;

            __WEBPACK_IMPORTED_MODULE_0__assets_common_util__["a" /* default */].request({
                method: 'get',
                interface: 'getTradeHistoryById',
                data: {
                    id: row.id
                }
            }).then(function (res) {
                if (res.result.success == "1") {
                    var result = res.result.result;
                    result.houseTradeDate = result.houseTradeDate.split(' ')[0];

                    if (result.houseTradeConsultingOrg) {
                        result.houseTradeConsultingOrg = result.houseTradeConsultingOrg.split(',');
                    } else {
                        result.houseTradeConsultingOrg = [];
                    }

                    if (result.houseTradeEvaluationOrg) {
                        result.houseTradeEvaluationOrg = result.houseTradeEvaluationOrg.split(',');
                    } else {
                        result.houseTradeEvaluationOrg = [];
                    }

                    _this7.curentData = result;
                    _this7.dialogFormVisible = true;
                } else {
                    _this7.$message.error(res.result.message);
                }
            });
        },
        formDataDate: function formDataDate(str) {
            var dateStr = new Date(str);
            var year = dateStr.getFullYear();
            var monthStr = dateStr.getMonth() + 1;
            var dayStr = dateStr.getDate();
            var month = monthStr < 10 ? '0' + monthStr : monthStr;
            var day = dayStr < 10 ? '0' + dayStr : dayStr;
            return year + '-' + month + '-' + day;
        },
        confirmEdit: function confirmEdit() {
            var _this8 = this;

            if (this.curentData.houseTradeDate == '') {
                this.$message({
                    message: '请务填写交易日期！',
                    type: 'warning'
                });
                return false;
            }

            this.curentData.houseTradeDate = this.formDataDate(this.curentData.houseTradeDate);

            if (this.curentData.houseRradePrice == '') {
                this.$message({
                    message: '请务填写交易价格！',
                    type: 'warning'
                });
                return false;
            }

            if (this.curentData.houseTradeACode == '' && this.curentData.houseTradeBCode == '') {
                this.$message({
                    message: '请务填写交易方！',
                    type: 'warning'
                });
                return false;
            }

            this.curentData.houseTradeEvaluationOrg = this.curentData.houseTradeEvaluationOrg.join(',');

            this.curentData.houseTradeConsultingOrg = this.curentData.houseTradeConsultingOrg.join(',');

            __WEBPACK_IMPORTED_MODULE_0__assets_common_util__["a" /* default */].request({
                method: 'post',
                interface: 'manageHouseTradeDetail',
                data: this.curentData
            }).then(function (res) {
                if (res.result.success == "1") {
                    _this8.getChanges();
                    _this8.dialogFormVisible = false;
                    _this8.$message({
                        message: '恭喜，修改成功',
                        type: 'success'
                    });
                } else {
                    _this8.$message.error(res.result.message);
                }
            });
        }
    }
});

/***/ }),

/***/ 360:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(205)(false);
// imports


// module
exports.push([module.i, ".mid-box{width:1000px;margin:30px auto}.mid-box .demo-table-expand{font-size:0}.mid-box .demo-table-expand label{float:left;width:90px;color:#99a9bf}.mid-box .demo-table-expand .el-form-item__content{width:340px;float:left}.mid-box .demo-table-expand .el-form-item{margin-right:0;margin-bottom:0;width:100%}.mid-box .el-dialog--small{top:60px!important;width:600px}.mid-box .el-dialog--small .input-box{width:480px}.mid-box .page-box{margin-top:15px}", ""]);

// exports


/***/ }),

/***/ 388:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(360);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(248)("686ca599", content, true);

/***/ }),

/***/ 438:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "mid-box"
  }, [_c('el-table', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.changes
    }
  }, [_c('el-table-column', {
    attrs: {
      "type": "expand"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(props) {
        return [_c('el-form', {
          staticClass: "demo-table-expand",
          attrs: {
            "label-position": "left",
            "inline": ""
          }
        }, [_c('el-form-item', {
          attrs: {
            "label": "评估机构："
          }
        }, [_c('span', [_vm._v(_vm._s(props.row.houseTradeEvaluationOrg))])]), _vm._v(" "), _c('el-form-item', {
          attrs: {
            "label": "咨询机构："
          }
        }, [_c('span', [_vm._v(_vm._s(props.row.houseTradeConsultingOrg))])]), _vm._v(" "), _c('el-form-item', {
          attrs: {
            "label": "交易类型："
          }
        }, [_c('span', [_vm._v(_vm._s(props.row.houseTradeType))])]), _vm._v(" "), _c('el-form-item', {
          attrs: {
            "label": "交易备注："
          }
        }, [_c('span', [_vm._v(_vm._s(props.row.houseTradeDesc))])])], 1)]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "houseTradeDate",
      "label": "交易日期"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "houseRradePrice",
      "label": "价格(万)"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "houseTradeACode",
      "width": "240",
      "label": "交易甲方"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "houseTradeBCode",
      "width": "240",
      "label": "交易乙方"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "recordCreater",
      "label": "填报人"
    }
  }), _vm._v(" "), (_vm.isOperate) ? _c('el-table-column', {
    attrs: {
      "label": "操作",
      "width": "100"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-button', {
          attrs: {
            "type": "text",
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.deleteRow(scope.row)
            }
          }
        }, [_vm._v("删除")]), _vm._v(" "), _c('el-button', {
          attrs: {
            "type": "text",
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.showModel(scope.row)
            }
          }
        }, [_vm._v("编辑")])]
      }
    }])
  }) : _vm._e()], 1), _vm._v(" "), (_vm.total) ? _c('el-pagination', {
    staticClass: "page-box",
    attrs: {
      "layout": "prev, pager, next",
      "page-sizes": _vm.pageSize,
      "total": _vm.total
    },
    on: {
      "current-change": _vm.pageChange
    }
  }) : _vm._e(), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "编辑",
      "visible": _vm.dialogFormVisible
    },
    on: {
      "update:visible": function($event) {
        _vm.dialogFormVisible = $event
      }
    }
  }, [_c('el-form', {
    attrs: {
      "label-position": 'left',
      "label-width": "80px",
      "model": _vm.curentData
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "交易日期"
    }
  }, [_c('el-date-picker', {
    staticClass: "input-box",
    attrs: {
      "type": "date",
      "placeholder": "选择日期",
      "picker-options": _vm.pickerPre
    },
    model: {
      value: (_vm.curentData.houseTradeDate),
      callback: function($$v) {
        _vm.curentData.houseTradeDate = $$v
      },
      expression: "curentData.houseTradeDate"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "价格(万)"
    }
  }, [_c('el-input', {
    staticClass: "input-box",
    attrs: {
      "type": "number",
      "size": "small",
      "min": 0,
      "step": 0.01
    },
    model: {
      value: (_vm.curentData.houseRradePrice),
      callback: function($$v) {
        _vm.curentData.houseRradePrice = $$v
      },
      expression: "curentData.houseRradePrice"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "交易甲方"
    }
  }, [_c('el-select', {
    staticClass: "input-box",
    attrs: {
      "name": "changeA",
      "placeholder": "请选择"
    },
    model: {
      value: (_vm.curentData.houseTradeACode),
      callback: function($$v) {
        _vm.curentData.houseTradeACode = $$v
      },
      expression: "curentData.houseTradeACode"
    }
  }, [_c('el-option', {
    attrs: {
      "label": '无',
      "value": ''
    }
  }), _vm._v(" "), _vm._l((_vm.investList), function(item, index) {
    return (item.enterpriseCode != _vm.curentData.houseTradeBCode) ? _c('el-option', {
      key: index,
      attrs: {
        "label": item.enterpriseCname,
        "value": item.enterpriseCode
      }
    }) : _vm._e()
  })], 2)], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "交易乙方"
    }
  }, [_c('el-select', {
    staticClass: "input-box",
    attrs: {
      "name": "changeB",
      "placeholder": "请选择"
    },
    model: {
      value: (_vm.curentData.houseTradeBCode),
      callback: function($$v) {
        _vm.curentData.houseTradeBCode = $$v
      },
      expression: "curentData.houseTradeBCode"
    }
  }, [_c('el-option', {
    attrs: {
      "label": '无',
      "value": ''
    }
  }), _vm._v(" "), _vm._l((_vm.investList), function(item, index) {
    return (item.enterpriseCode != _vm.curentData.houseTradeACode) ? _c('el-option', {
      key: index,
      attrs: {
        "label": item.enterpriseCname,
        "value": item.enterpriseCode
      }
    }) : _vm._e()
  })], 2)], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "评估机构"
    }
  }, [_c('el-select', {
    staticClass: "input-box",
    attrs: {
      "name": "evalCodes",
      "multiple": "",
      "placeholder": "请选择"
    },
    model: {
      value: (_vm.curentData.houseTradeEvaluationOrg),
      callback: function($$v) {
        _vm.curentData.houseTradeEvaluationOrg = $$v
      },
      expression: "curentData.houseTradeEvaluationOrg"
    }
  }, _vm._l((_vm.agentAList), function(item, index) {
    return _c('el-option', {
      key: index,
      attrs: {
        "label": item.enterpriseCname,
        "value": item.enterpriseCode
      }
    })
  }))], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "咨询机构"
    }
  }, [_c('el-select', {
    staticClass: "input-box",
    attrs: {
      "name": "tenantFinanceTool",
      "multiple": "",
      "placeholder": "请选择"
    },
    model: {
      value: (_vm.curentData.houseTradeConsultingOrg),
      callback: function($$v) {
        _vm.curentData.houseTradeConsultingOrg = $$v
      },
      expression: "curentData.houseTradeConsultingOrg"
    }
  }, _vm._l((_vm.agentBList), function(item, index) {
    return _c('el-option', {
      key: index,
      attrs: {
        "label": item.enterpriseCname,
        "value": item.enterpriseCode
      }
    })
  }))], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "交易类型"
    }
  }, [_c('el-select', {
    staticClass: "input-box",
    attrs: {
      "name": "houseTradeType",
      "placeholder": "请选择"
    },
    model: {
      value: (_vm.curentData.houseTradeType),
      callback: function($$v) {
        _vm.curentData.houseTradeType = $$v
      },
      expression: "curentData.houseTradeType"
    }
  }, [_c('el-option', {
    attrs: {
      "label": '无',
      "value": ''
    }
  }), _vm._v(" "), _vm._l((_vm.houseTradeTypeList), function(item, index) {
    return _c('el-option', {
      key: index,
      attrs: {
        "label": item.dictKeyValue,
        "value": item.dictKeyCode
      }
    })
  })], 2)], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "交易备注"
    }
  }, [_c('el-input', {
    staticClass: "input-box",
    attrs: {
      "type": "textarea",
      "rows": 4,
      "maxlength": 1000,
      "placeholder": "请输入内容"
    },
    model: {
      value: (_vm.curentData.houseTradeDesc),
      callback: function($$v) {
        _vm.curentData.houseTradeDesc = $$v
      },
      expression: "curentData.houseTradeDesc"
    }
  })], 1)], 1), _vm._v(" "), (_vm.isOperate) ? _c('div', {
    staticClass: "dialog-footer",
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('el-button', {
    on: {
      "click": function($event) {
        _vm.dialogFormVisible = false
      }
    }
  }, [_vm._v("取 消")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.confirmEdit
    }
  }, [_vm._v("确 定")])], 1) : _vm._e()], 1)], 1)
},staticRenderFns: []}

/***/ })

});