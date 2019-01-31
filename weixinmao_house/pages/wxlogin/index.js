// weixinmao_house/pages/wxlogin/index.js
var app = getApp();
var siteRoots = app.data.siteroot;
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    user_info:''
  },
  onLoad: function () {
    
  },
  bindGetUserInfo: function (e) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log('显示userinfo信息：');
              console.log(res.userInfo);
              var userInfo = res.userInfo;
              // 数组信息
              console.log('数组信息1');
              console.log(userInfo);
              //调用接口
              wx.login({
                success: function (res) {
                  console.log(res);
                  //登录成功后使用code获得openid
                  if (res.code) {
                    var code = res.code;
                    console.log('微信请求code' + code);
                    wx.request({
                      // 登录接口需要联调
                      url: siteRoots+'/figo/wxuser/login',
                      data: {
                        code: code,
                        nickName: userInfo.nickName,
                        avatarUrl: userInfo.avatarUrl,
                        gender: userInfo.gender,
                        country: userInfo.country,
                        province: userInfo.province,
                        city: userInfo.city
                      },
                      success: function (res) {
                        //获得用户信息
                        console.log('调用后端接口返回userinfo和openid=', res.data);
                        // 用户信息存入缓存
                        console.log('用户信息存入app.data');
                        app.data.userinfo = res.data;
                        console.log('appdata=======',app.data.userinfo);
                        wx.navigateBack();
                      }
                    })
                  } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                  }
                }
              })
            }
          })
        }else{
          wx.showToast({
            title: "请先同意授权",
            icon: 'danger',
            duration: 2000
          });
        }
      }
    })
  },complete: function () {
    
  }
})