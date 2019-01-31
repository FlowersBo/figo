// weixinmao_house/pages/userfavorite/index.js

var app = getApp();
var siteRoots = app.data.siteroot;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    siteRoots:''
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '我的关注',
    }),
      that.setData({
        siteRoots: siteRoots,
      }); 
  },


// 获取用户关注列表
  list: function() {
    var that = this;
    var userIds = app.data.userinfo.ids;
    wx.request({
      'url': siteRoots + '/wxapp/useridc/list2',
      data: {
        _query_userIds: userIds,
        // _query_userIds:'06a14da4d1e043d9b6d9bfa36cb33414',
      },
      success: function(res) {
        console.log("开始");
        console.log(res.data);
        if (res.data) {
          that.setData({
            idcList: res.data.list,
          })
        }
        console.log("结束");
      }
    })
  },
// 跳转到详情页
  toSailDetail: function (e) {
    var ids = e.currentTarget.dataset.id;
    console.log('跳转到详情页', ids);
    wx.navigateTo({
      url: "/weixinmao_house/pages/saledetail/index?ids=" + ids,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.list();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})