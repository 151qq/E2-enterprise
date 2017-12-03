/**
 * Created by zhangbin on 2017/7/6.
 */
let wc = window.location;
//const platform =wc.protocol+'//'+wc.host+'/';
const platform = "/e2-platform-api/";
export default {
    interfaces: {
        "authentication": platform + "authentication.json",     //登录
        "logout": platform + 'logout.json',
        "uploadArticleAreaImage": platform + "siteEdit/uploadArticleAreaImage.json",   //图片上传接口
        "mediaList": platform + "html5SiteInfo/mediaList.json",
        "getUserInfo": platform + "getUserInfo.json",
        "changePassword": platform + "changePassword.json",         //修改密码
        "resetPassword": platform + "resetPassword.json",  // 重置密码
        "imageUpload": platform + 'houses/image/upload.json',
        "imageDelete": platform + 'houses/image/delete.json',
        "sendSmsCode": platform + 'sendSmsCode.json',
        "validateHousesStart": platform + 'houses/validateHousesStart.json',
        "deleteHousesInfo": platform + 'houses/deleteHousesInfo.json',
        publishArticle: platform + 'siteEdit/publishArticle.json',

        /**
        * 上传头像 post                                
        */
        "headImage": platform + "headImage.json",

        /**
        * 保存草草 post
        * html5PageCode
        * id pageID                 
        */
        "draftArticle": platform + "siteEdit/draftArticle.json",
        /**
        * 我的任务列表 get
        * html5PageCode
        * id pageID                                  
        */
        "findArticleByFileCode": platform + "siteEdit/findArticleByFileCode.json",
        "findArticleByCatalogCode": platform + "siteEdit/findArticleByCatalogCode.json",
        /**
        * 我的任务列表 post
        * fileCode: html5PageCode
        * areaCode: rowData.code
        * id pageID
        * areaTxt
        * areaType
        * sequence: index                                
        */
        "saveArticleArea": platform + "siteEdit/saveArticleArea.json",
        /**
        * 取指定模板 get
        * fileCode: html5PageCode
        * id pageID
        * tplCode       
        */
        "getTemplateBytplCode": platform + "siteTpl/getTemplateBytplCode.json",
        /**
        * 模板列表 get
        * unitcode: html5PageCode
        */
        "templateList": platform + "siteTpl/templateList.json",
        /**
        * 删除文章 post
        */
        "deleteDraftFile": platform + 'html5SiteInfo/deleteDraftFile.json',
        /**
        * 删除块 post
        */
        "deleteArticleArea": platform + 'siteEdit/deleteArticleArea.json',
        /**
        * 我的任务列表 get
        * pageSize 每页多少条
        * currentPage 当前页数
         * '/static/api/common/notice.json'
        */
        notice: platform +'task/list.json',
        /**
        * 我的任务列表 get
        * tmpCode 模版号
        */
        getTemplate: '/static/api/common/getTemplate.json',



        /**
        * 任务详情 get
        * id 任务标识
        */
        noticeDetail: '/static/api/common/noticeDetail.json',
        /**
        * 获取二维码 get
        * path
        */
        getEwm: '/static/api/common/getEwm.json',
        /**
        * 发送邮件 post
        * email 邮件地址
        * id 报告序列标识
        */
        sendMail: '/static/api/report/sendMail.json',
        /**
        * 获取相关标题的楼盘或报告ID get
        * type 楼盘或报告标识
        * key 搜索关键字
        */
        getInfoId: '/static/api/report/getInfoId.json',
        /**
        * 楼盘列表 get
         * '/static/api/property/houseTree.json'
        */
        houseTree: platform +'houses/houseTree.json',
        saveHousesTrade: platform + 'houses/saveHousesTrade.json',
        deleteHousesTrade: platform + 'houses/deleteHousesTrade.json',

        /**
         * 楼盘基本信息 post
         */
        houseInfo: platform +'houses/info.json',
        /**
        * 楼盘列表 get
        * id 楼盘序列标识
        */
        bigImgs: '/static/api/property/bigImgs.json',
        /**
        * 投资顾问 get
        * id 序列标识
        */
        getInvestors: platform +'getUserInfoByRoleCode.json',
        /**
        * 物业基本信息 get
        * id 楼盘序列标识
         * '/static/api/property/base.json',
        */
        base: platform +'houses/findHousesBase.json',
        /**
        * 物业交易历史 get
        * id 楼盘序列标识
         * '/static/api/property/changes.json'
        */
        changes: platform +'houses/showHouseTradeDetailByHousesId.json',
        manageHouseTradeDetail: platform + 'houses/manageHouseTradeDetail.json',
        deleteTradeHistory: platform + 'houses/removeHouseTradeDetail.json',
        getTradeHistoryById: platform + 'houses/showHouseTradeDetail.json',

        deleteRentHistory: platform + 'houses/deleteRentHistory.json',
        evalues: platform +'houses/findValuationHistory.json',

        deleteEvalueHistory: platform + 'houses/deleteValuationHistory.json',
        deleteRateHistory: platform + 'houseVacancy/del.json',
        rates: platform +'houseVacancy/list.json',
        addRates: platform + 'houseVacancy/add.json',
        updateRates: platform + 'houseVacancy/update.json',
        /**
        * 物业租金历史 get
        * id 楼盘序列标识
         * '/static/api/property/rent.json'
        */
        rent: platform +'houses/findHousesRent.json',
        /**
        * 物业评述 get
        * id 楼盘序列标识
        */
        articleHouse: '/static/api/property/article.json',
        /**
        * 物业公共区域图片 get
        * id 楼盘序列标识
        */
        houseImages: platform +'houses/image/list.json',
        /**
        * 物业外观图片 get
        * id 楼盘序列标识
         * '/static/api/property/appearance.json'
        */
        appearance: platform +'houses/image/appearance.json',
        /**
        * 物业周围环境图片 get
        * id 楼盘序列标识
        */
        surround: platform +'houses/image/surround.json',
        /**
        * 我的报告列表 get
         * '/static/api/report/reportTree.json'
        */
        reportTree: platform +'report/reportTree.json',
        /**
        * 我的选中报告列表 get
        * ids 文章报告id eg: 1,2,3
        */
        findRecommendArticleByCode: platform + 'siteEdit/findRecommendArticleByCode.json',
        /**
        * 删除文章或报告 post
        * id
        */
        deletehouse: '/static/api/property/deletehouse.json',
        /**
        * 保存楼盘 post
        * id
        * formdata
        */
        savehouse: '/static/api/property/savehouse.json',
        /**
        * 删除文章或报告 post
        * id
        */
        deletereport: '/static/api/report/deletereport.json',
        /**
        * 保存报告 post
        * id
        * formdata
        */
        savereport: '/static/api/report/savereport.json',
        /**
        * 报告详情 get
        * type 列表类型
        * id 序列标识
        */
        reportDetail: '/static/api/report/reportDetail.json',
        /**
        * 关联报告 get
        * id 楼盘序列标识
        */
        articles: '/static/api/report/articles.json',
        /**
        * 过滤地图数据 get
        * vr 要过滤的数据
        */
        searchMap: '/static/api/report/searchMap.json',
        /**
        * 获取商圈list get
        * city 要过滤的数据
         * '/static/api/property/malls.json'
        */
        malls: platform +'houses/housesTrade.json',
        /**
        * 地图过滤条件 get
         * '/static/api/property/typeMap.json'
        */
        typeMap: platform+'houses/dictionary.json',
        /**
        * 楼盘对标列表 get
        * type 列表类型
        * id 楼盘序列标识
        */
        benchList: platform + 'houses/findHousesByCityCode.json',

        setArticles: platform + 'siteEdit/setRecommendArticle.json',

        sendSubscriberArticle: platform + 'html5SiteInfo/sendSubscriberArticle.json',
        enterpriseList: platform + 'enterprise/list.json',
        publishArticle: platform + 'siteEdit/publishArticle.json',
        validateHousesName: platform + 'houses/validateHousesName.json',

        getCitys: '/static/api/common/city.json',

        investTree: platform + 'enterprise/enterpriseTree.json',
        saveInvestBase: platform + 'enterprise/manageEnterpriseInfo.json',
        getInvestBase: platform + 'enterprise/showEnterpriseInfo.json',
        removeBase: platform + 'enterprise/removeEnterpriseInfo.json',
        investTypes: platform + 'enterprise/disOfEnterpriseInfo.json',
        findEntByEntType: platform + 'enterprise/findEntByEntType.json',
        findDictionaryByType: platform + 'houses/findDictionaryByType.json',

        orTree: platform + 'financeProductInfo/productTree.json',
        saveOrUpdateFinance: platform + 'financeProductInfo/saveOrUpdate.json',
        getOrUpdate: platform + 'financeProductInfo/findByProductInfo.json',
        deleteFinanceProductInfo: platform + 'financeProductInfo/deleteFinanceProductInfo.json',
        orDic: platform + 'financeProductInfo/dic.json',
        financeProductHouseSave: platform + 'financeProductHouse/save.json',
        deleteFinanceProductHouser: platform + 'financeProductHouse/deleteFinanceProductHouser.json',

        searchMap: platform + 'houses/searchHousesFileter.json',
        saveOrUpdate: platform + 'fundDetail/saveOrUpdate.json',
        findByProductInfo: platform + 'fundDetail/findByProductInfo.json',
        deleteFundDetail: platform + 'fundDetail/deleteFundDetail.json',
        deleteFundCashflow: platform + 'fundCashflow/deleteFinanceProductInfo.json',

        findListByProductCode: platform + 'financeProductHouse/findListByProductCode.json',
        saveFundCashflow: platform + 'fundCashflow/saveOrUpdate.json',

        checkHtdAndHdAndFpi: platform + 'enterprise/checkHtdAndHdAndFpi.json',

        getRolesAllType: platform + 'role/findRoleUserByRoleCode.json',
        deleteRoleById: platform + 'role/deleteRoleUser.json',
        addRoleByType: platform + 'role/setRoleUserByRoleCode.json'
    }
}
