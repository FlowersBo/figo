// wxsmall_001/pages/message/index.js
var R_htmlToWxml = require('../../resource/js/htmlToWxml.js'); //引入公共方法
var imageUtil = require('../../resource/js/images.js');
var app = getApp();
var siteRoots = app.data.siteroot;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonStatus:true,
    disabled:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '我要留言',
    })
    
  },

  // 用户信息展示
  userInfoShow: function (e) {
    var that = this;
    console.log('00000000000000');
    console.log(app.data);
    if (app.data.userinfo == null) {
      wx.showToast({
        title: "为了您更好的体验,请先点击我的下方登录同意授权",
        icon: 'none',
        duration: 2000
      })
    }
    else {
      console.log('我的，获取全局登录信息', app.data);
      console.log('我的，获取全局登录信息', app.data.userinfo);
      console.log('我的，获取全局登录信息', app.data.userinfo.avatarurl);
      that.setData({
        avatarUrl: app.data.userinfo.avatarurl,
        nickName: app.data.userinfo.nickname
      });
    }
  },

  // 防用户重复提交留言
  setDisabled: function (e) {
    var that = this;
    that.setData({
      disabled: !that.data.disabled
    });
    console.log('按钮状态', that.data.disabled);
    setTimeout(function () {
      that.setData({
        disabled: false
      });
    }, 2000)
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
    wx.showNavigationBarLoading();
    this.onLoad();
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

  

  bindSave: function(e) {
    console.log(e.detail.formId);
    var that = this;
    var name = e.detail.value.name;
    var tel = e.detail.value.tel;
    var remarks = e.detail.value.remarks;
  
    if (name == "") {
      wx.showModal({
        title: '提示',
        content: '请填写联系人姓名',
        showCancel: false
      })
      return
    }
    if (tel == "") {
      wx.showModal({
        title: '提示',
        content: '请填写手机号码',
        showCancel: false
      })
      return
    }

    if (remarks == "") {
      wx.showModal({
        title: '提示',
        content: '请填写备注',
        showCancel: false
      })
      return
    }
    var userIds = app.data.userinfo.ids;

    // 提交留言 用户ids获取麻烦，暂用openid
    wx.request({
      'url': siteRoots + '/wxapp/usermessage/add2',
      data: {
        // _query_userIds: ids,
        // _query_name: name,
        // _query_tel: tel,
        // _query_remarks: remarks
        userIds: userIds,
        name: name,
        tel: tel,
        remarks: remarks
      },
      success: function (res) {
        if (!res.data) {
          // 登录错误 

          wx.hideLoading();
          wx.showModal({
            title: '失败',
            content: '留言失败，请重新留言',
            showCancel: false
          })
          return;
        } else {
          wx.showToast({
            title: '留言成功',
            icon: 'success',
            duration: 4000
          }),
            setTimeout(function () {
              wx.switchTab({
                url: '/weixinmao_house/pages/index/index',
              })
            }, 1000)
        }
      }
    })
  },
  onShareAppMessage() {
    return {
      title: '华博云-提交留言',
      path: '/weixinmao_house/pages/message/index'
    }
  }
})