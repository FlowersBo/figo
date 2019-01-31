// weixinmao_hssy/pages/user/index.js
var R_htmlToWxml = require('../../resource/js/htmlToWxml.js'); //引入公共方法
var imageUtil = require('../../resource/js/images.js');
var app = getApp();
var siteRoots = app.data.siteroot;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showmsg: true,
    nickName:null,
    avatarUrl:null,
    userinfo:{},
    avatarUrlDefault:'../../resource/images/user_img.png',
    customerManagerIphone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '我的',
    })
    // this.customerManager();
    
  },
// 用户信息展示
  userInfoShow: function (e) { 
    var that = this;
    console.log('00000000000000');
    console.log(app.data);
    if (app.data.userinfo == null){
      wx.showToast({
        title: "为了您更好的体验,请先点击我的下方登录同意授权",
        icon: 'none',
        duration: 2000
      })
      wx.navigateTo({
        url: '/weixinmao_house/pages/wxlogin/index',
      })
    }
    else{
      console.log('我的，获取全局登录信息', app.data);
      console.log('我的，获取全局登录信息', app.data.userinfo);
      console.log('我的，获取全局登录信息', app.data.userinfo.avatar);
      that.setData({
        avatarUrl: app.data.userinfo.avatar,
        nickName: app.data.userinfo.nickname
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },
  toMessage: function(e) {
    wx.navigateTo({
      url: "/weixinmao_house/pages/message/index"
    })
  },

// 客户经理信息
// customerManager: function (e) {
//   var that = this;
//   wx.request({
//     url: siteRoots+'/wxapp/customermanager/list2',
//     success: function (res) {
//       that.setData({
//         customerManagerIphone: res.data.list[0].phone,
//       })
//       console.log(res.data.list[0].phone);
//       var customerManagerIphone = res.data.list[0].phone
//     },
//     fail: function (res) {
//     }
//   })
// },
// 拨打电话
calling: function () {
  wx.makePhoneCall({
    phoneNumber: this.data.customerManagerIphone, //此号码并非真实电话号码，仅用于测试  
    success: function () {
      console.log("拨打电话成功！")
    },
    fail: function () {
      console.log("拨打电话失败！")
    }
  })
},

// 我的关注
userFavorite: function () {
  wx.navigateTo({
    url: '/weixinmao_house/pages/userfavorite/index',
  })
},


// 检查用户登录

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.userInfoShow();
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
    wx.stopPullDownRefresh();
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

  },
})