var QQMapWX = require('../../resource/js/qqmap-wx-jssdk.js');
var app = getApp();
// 实例化API核心类
var demo = new QQMapWX({
  key: 'KFXBZ-HUBEI-KCQG4-5ZEH4-5K2PK-DOFKE'
  // sn:'yfsU4bMshzhwrDXbUcwr2TDKogqIcwQF'
});
Page({
  data: {
    latitude: '',
    longitude: '',
    latitudes: '',
    longitudes: ''
  },
  onLoad: function(e) {
    var that = this
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res) {

        demo.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function(res) {
            console.log(res);
            console.log(res.result.ad_info.adcode);
            console.log(res.result.ad_info.city);
          },
          fail: function(res) {
            console.log('fail');
            console.log(res);
          }
        });

      }
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
  onShow: function() {},

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