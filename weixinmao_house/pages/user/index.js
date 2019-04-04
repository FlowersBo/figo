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
    phone:null,
    showmsg: true,
    nickName:null,
    province: null,
    city:null,
    customerManagerIphone: '13512345678',
    userinfo:{},
    avatarUrlDefault:'../../resource/images/user_img.png',
    addr: '选择位置'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // var phone = app.data.userinfo.mobile;
    // console.log(phone)
    // var that = this;
    // that.setData({
    //   phone: phone
    // })
    console.log(app.data.addr)
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
      console.log('我的，获取全局登录信息', app.data.userinfo.data.avatar);
      console.log('全局的手机号', app.data.userphone)
      if (app.data.userphone) {
        that.setData({
          phone: app.data.userphone
        })
      } 
      else if (app.data.userinfo.data.mobile){
        that.setData({
          phone: app.data.userinfo.data.mobile,
        })
      }
      that.setData({
        avatarUrl: app.data.userinfo.data.avatar,
        nickName: app.data.userinfo.data.nickname,
        province: app.data.userinfo.data.province,
        city: app.data.userinfo.data.city,
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },

  // 我的关注
  // userFavorite: function () {
  //   wx.navigateTo({
  //     url: '/weixinmao_house/pages/userfavorite/index',
  //   })
  // },
  //跳转到留言
  // toMessage: function(e) {
  //   wx.navigateTo({
  //     url: "/weixinmao_house/pages/message/index"
  //   })
  // },
  //跳转手机验证
  gotoPhone: function () {
    var that=this
    if (that.data.phone != '' && that.data.phone != null) {
      wx.showToast({
        title: "您已绑定手机号",
        icon: 'none',
        duration: 2000
      })
    } else if (app.data.userphone != '' && app.data.userphone != null){
      wx.showToast({
        title: "您已绑定手机号",
        icon: 'none',
        duration: 2000
      })
      }else{
      wx.navigateTo({
        url: "/weixinmao_house/pages/phoneVerify/index",
      })
    }
  },


//获取位置
  userAddr:function(){
    var that = this;
    console.log(that)
    app.getPermission(that);    //传入that值可以在app.js页面直接设置内容    
    console.log('当前位置',that.data.addr)
  },
  
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
  onPullDownRefresh: function () {
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 500)
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