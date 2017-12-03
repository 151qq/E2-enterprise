webpackJsonp([7],{

/***/ 223:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(370)
}
var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(334),
  /* template */
  __webpack_require__(420),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_common_util__ = __webpack_require__(50);

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
            rents: [],
            total: 0,
            pageSize: 10,
            pageNumber: 1,
            dialogFormVisible: false,
            curentData: {
                id: '',
                tenantStartDate: '',
                priceT: '',
                priceB: '',
                priceM: '',
                author: ''
            },
            hisUser: ''
        };
    },
    mounted: function mounted() {
        this.getRents();
        document.title = '租金历史明细';
    },

    computed: {
        isOperate: function isOperate() {
            return this.hisUser && this.$route.query.user && this.hisUser == this.$route.query.user;
        }
    },
    methods: {
        getRents: function getRents() {
            var _this = this;

            __WEBPACK_IMPORTED_MODULE_1__assets_common_util__["a" /* default */].request({
                method: 'get',
                interface: 'rent',
                data: {
                    id: this.$route.query.id,
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber
                }
            }).then(function (res) {
                res.result.result.rents.forEach(function (item) {
                    var dateData = item.tenantStartDate.split(' ')[0].split('-');
                    item.tenantStartDate = dateData[0] + '-' + dateData[1];
                });

                _this.hisUser = res.result.request;
                _this.rents = res.result.result.rents;
                _this.total = _this.total ? Number(_this.total) : 0;
            });
        },
        pageChange: function pageChange(page) {
            this.pageNumber++;
            this.getRents();
        },
        deleteRow: function deleteRow(row) {
            var _this2 = this;

            this.$alert('您考虑好了吗？确定要删除记录!', '删除', {
                confirmButtonText: '确定',
                callback: function callback(action) {
                    __WEBPACK_IMPORTED_MODULE_1__assets_common_util__["a" /* default */].request({
                        method: 'post',
                        interface: 'deleteRentHistory',
                        data: {
                            id: row.id
                        }
                    }).then(function (res) {
                        _this2.getRents();
                        _this2.$message({
                            type: 'info',
                            message: '删除成功'
                        });
                    });
                }
            });
        },
        showModel: function showModel(row) {
            this.dialogFormVisible = true;
            this.curentData = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, row);
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
            var _this3 = this;

            if (this.curentData.tenantStartDate == '') {
                this.$message({
                    message: '请务填写交易日期！',
                    type: 'warning'
                });
                return false;
            }
            if (this.curentData.priceT == '' && this.curentData.priceM == '' && this.curentData.priceB == '') {
                this.$message({
                    message: '请务填写租金！',
                    type: 'warning'
                });
                return false;
            }

            var formData = {
                id: this.$route.query.id,
                type: 'rents',
                data: {
                    id: this.curentData.id,
                    tenantStartDate: this.formDataDate(this.curentData.tenantStartDate),
                    priceT: this.curentData.priceT,
                    priceM: this.curentData.priceM,
                    priceB: this.curentData.priceB,
                    recordCreater: this.curentData.recordCreater
                }
            };

            __WEBPACK_IMPORTED_MODULE_1__assets_common_util__["a" /* default */].request({
                method: 'post',
                interface: 'houseInfo',
                data: formData
            }).then(function (res) {
                if (res.result.success) {
                    _this3.getRents();
                    _this3.dialogFormVisible = false;
                    _this3.$message({
                        message: '恭喜，修改成功',
                        type: 'success'
                    });
                }
            });
        }
    }
});

/***/ }),

/***/ 342:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(205)(false);
// imports


// module
exports.push([module.i, ".mid-box{width:1000px;margin:30px auto}.mid-box .el-dialog--small{width:460px}.mid-box .el-dialog--small .input-box{width:340px}.mid-box .page-box{margin-top:15px}", ""]);

// exports


/***/ }),

/***/ 370:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(342);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(248)("b46c24a4", content, true);

/***/ }),

/***/ 420:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "mid-box"
  }, [_c('el-table', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.rents,
      "border": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "prop": "tenantStartDate",
      "label": "租赁日期"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "priceT",
      "label": "高区租金(元 ㎡/天)"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "priceM",
      "label": "中区租金(元 ㎡/天)"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "priceB",
      "label": "低区租金(元 ㎡/天)"
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
      "type": "month",
      "placeholder": "选择月"
    },
    model: {
      value: (_vm.curentData.tenantStartDate),
      callback: function($$v) {
        _vm.curentData.tenantStartDate = $$v
      },
      expression: "curentData.tenantStartDate"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "高区租金"
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
      value: (_vm.curentData.priceT),
      callback: function($$v) {
        _vm.curentData.priceT = $$v
      },
      expression: "curentData.priceT"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "中区租金"
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
      value: (_vm.curentData.priceM),
      callback: function($$v) {
        _vm.curentData.priceM = $$v
      },
      expression: "curentData.priceM"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "低区租金"
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
      value: (_vm.curentData.priceB),
      callback: function($$v) {
        _vm.curentData.priceB = $$v
      },
      expression: "curentData.priceB"
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