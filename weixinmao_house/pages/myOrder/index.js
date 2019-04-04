// weixinmao_house/pages/myOrder/index.js
var app = getApp();
var siteRoots = app.data.siteroot;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderList: "",
    userinfo:{},
    currentTab: 0,
    status:'',
  },
  
  //导航切换
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    console.log(e)
  },

  judgement:function(e){
    var that=this;
    var orderList = that.data.orderList;
    for (var i = 0; i < orderList.length; i++){
      var items = orderList[i].status
      console.log()
      if (items == "record" || items == "allocation" || items == "design"){
        orderList[i].status="待场堪"
      } else if (items == "surveyprepare"){
        orderList[i].status="预约场勘"
      } else if (items == "surveyfinish" || items == "surveycomfirm"){
        orderList[i].status = "已场勘"
      } else if (items == "buildprepare") {
        orderList[i].status = "预约施工"
      } else if (items == "buildfinish") {
        orderList[i].status = "已施工"
      } else if (items == "buildconfirm") {
        orderList[i].status = "已评价"
      }
     
    }
    // record	已录入
    // allocation	已派单
    // design	已指定场勘员
    // surveyprepare	已预约场勘
    // surveyfinish	已场勘
    // surveycomfirm	已审核场勘
    // buildprepare	已预约施工
    // build	已施工
    // buildconfirm	已确认施工
    // fileupload	资料已上传
    // cancel	订单取消

    that.setData({
      orderList: orderList
    })
    console.log(that.data.orderList)
  },
  //删除订单
  // removeOrder:function(e){
  //   const that=this;
  //   console.log(e)
  //   wx.showModal({
  //     title:"删除后无法恢复",
  //     content:"您是否要删除该订单",
  //     success: function (res) {
  //       if (res.confirm) {
  //         console.log('用户点击确定')
  //         var dataId = e.target.id;
  //         console.log("删除" + dataId);
  //         var release = that.data.orderList;
  //         var newRelease = [];
  //         for (var i in release) {
  //           var item = release[i];
  //           if (item.ids != dataId) {
  //             newRelease.push(item);
  //           }
  //         }
  //         console.log(release.length)
  //         that.setData({
  //           orderList: newRelease
  //         });
  //         console.log(newRelease)
  //       } else if (res.cancel) {
  //         console.log('用户点击取消')
  //       }
  //     }
  //   })
  // },

// 获取数据
  indexFoc: function (e) {
    var that = this;
    var userinfo = app.data.userinfo.data
    var mobile = userinfo.mobile
    console.log('userinfo',userinfo)
    var _query_wxUserIds= userinfo.ids
    var figo_token_id = userinfo.token
    wx.request({
      data: {
        _query_wxUserIds:_query_wxUserIds,
        figo_token_id: figo_token_id,
        _query_mobile: mobile,        
        pageNumber: 1, pageSize: 10, recomend: true
      },
      // 'url': siteRoots + '/figo/order/list',
      // 'url': siteRoots + '/figo/orderRecord',
      'url': siteRoots + '/figo/orderrecord/list',
      success: function (res) {
        console.log("订单数据",res)
        if (res.data) {
          that.setData({
            orderList: res.data.list,
          })
          console.log(res.data.list);   
        }
        that.judgement();
      },
      fail: function (res) {
        console.log('网络错误');
        // that.setData({
        //   showmsg: '网络错误'

        // })
      }
    });
  },

  // 订单详情跳转
  lineItem:function(e){
    var id = e.currentTarget.dataset.id;
    console.log(e.currentTarget)
    console.log(id)
    wx.navigateTo({
      url: "./lineItem/index?id=" + id
    })
  },

  //评价跳转
  // evaluate: function (e) {
  //   var id = e.currentTarget.dataset.id;
  //   console.log(id)
  //   wx.navigateTo({
  //     url: "../../pages/evaluate/index?id=" + id
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      siteRoots: siteRoots,
    });
    this.indexFoc();
    this.app = getApp();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})