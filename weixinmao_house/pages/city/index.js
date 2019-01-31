// weixinmao_house/pages/city/index.js
var app = getApp();
var siteRoots = app.data.siteroot;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cityList:[],
    ids: null,
    id:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.cityList();
  },
  // 城域网请求数据
  cityList:function(e){
    var that = this
    wx.request({
      'url': siteRoots + '/wxapp/networkcity/list2',
      data: {},
      success: function (res) {
        console.log("start");
        console.log(res.data.list);
        if (res.data) {
          that.setData(
            {
              cityList: res.data.list,
              siteRoots: siteRoots
            }
          )
        }
        console.log("end");
      },
      complete: function () {
        wx.hideNavigationBarLoading(); //完成停止加载
        wx.stopPullDownRefresh();
      }
    });
  },
  // 详情页面
  toCityDetail: function (e) {
    var ids = e.currentTarget.dataset.id;
    console.log("000000");
    console.log(e);
    wx.navigateTo({
      url: "/weixinmao_house/pages/citydetail/index?ids=" + ids
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
    this.cityList();
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
    wx.showNavigationBarLoading();
    this.onLoad();
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