var QQMapWX = require('../../resource/js/qqmap-wx-jssdk.js');
var app = getApp();
var demo = new QQMapWX({
  key: 'KFXBZ-HUBEI-KCQG4-5ZEH4-5K2PK-DOFKE'
  // sn:'yfsU4bMshzhwrDXbUcwr2TDKogqIcwQF'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiIndex: [0, 0, 0],
    date: '2016-09-01',
    time: '12:01',
    region: ['北京市', '北京市', '全部'],
    customItem: '全部'
  },
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value,
    })
  },

  userSel: function(e) {
    var citySel = this.data.region;
    if (citySel != null && citySel.length >= 2) {
      if (citySel[1] == '全部' || citySel[1] == '县' || citySel[1] == '区') {
        app.data.citySel = citySel[0];
      } else {
        app.data.citySel = citySel[1];
      }
    }
    console.log('当前用户选择城市控件返回值', citySel);
    console.log('全局变量保存值', app.data.citySel);

    if (app.data.citySel == null) {
      app.data.citySel = '北京市';
    }
    wx.navigateTo({
      url: "/weixinmao_house/pages/salelist/index"
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  // addr: function() {
  //   demo.geocoder({
  //     address: '北京市海淀区',
  //     success: function(res) {
  //       console.log('success');
  //       console.log(res);
  //     },
  //     fail: function(res) {
  //       console.log('fail');
  //       console.log(res);
  //     },
  //   })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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