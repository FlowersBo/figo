// weixinmao_house/pages/hotsale/index.js
var app = getApp();
var siteRoots = app.data.siteroot;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotSailList:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      'url': siteRoots+'/wxapp/discount/list2',
      success: function (res) {
        console.log("开始加载数据");
        console.log(res.data.list);
        if (res.data) {
          that.setData(
            {
              hotSailList: res.data.list,
              siteRoots: siteRoots
            }
          )
        }
        console.log("结束加载数据");
      },
      complete: function () {
        wx.hideNavigationBarLoading(); //完成停止加载
        wx.stopPullDownRefresh();
      }
    });
  },
  goHotDdetail: function (e) {
    var ids = e.currentTarget.dataset.id;
    console.log("000000");
    console.log(ids);
    wx.navigateTo({
      url: "/weixinmao_house/pages/hotdetail/index?ids=" + ids
    })
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
    wx.stopPullDownRefresh();
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