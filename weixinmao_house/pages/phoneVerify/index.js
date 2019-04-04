// weixinmao_house/pages/phoneVerify/index.js
var app = getApp();
var siteRoots = app.data.siteroot;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',//姓名
    phone: '',//手机号
    code: '',//验证码
    // iscode: null,//用于存放验证码接口里获取到的code
    codename: '获取验证码'
  },
  //获取input输入框的值
  getNameValue: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  getPhoneValue: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getCodeValue: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  getCode: function () {
    var a = this.data.phone;
    var _this = this;
    var myreg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      console.log(_this.data)
      console.log(app.data.userinfo)
      var ids = app.data.userinfo.data.ids
      var figo_token_id = app.data.userinfo.data.token
      console.log(ids)
      wx.request({
        data: {
          mobile: _this.data.phone,
          figo_token_id: figo_token_id
        },
        'url': siteRoots + '/figo/verification/code/',
        success(res) {
          if(res.data){
            console.log('这是手机号验证码，时间5分钟', res.data.data.verificationCode)
            _this.setData({
              // mobile: res.data.mobile,
              figo_token_id: figo_token_id
            })
            var timestamp = Date.parse(new Date());
            var expiration = timestamp + 30000;//300秒（5分钟）
            wx.setStorageSync(
              "expiration", expiration
            )
            wx.setStorageSync("verification_data", res.data.data)
            var num = 61;
            var timer = setInterval(function () {
              num--;
              disabled: true
              if (num <= 0) {
                clearInterval(timer);
                _this.setData({
                  codename: '重新发送',
                  disabled: false
                })

              } else {
                _this.setData({
                  codename: num + " s"
                })
              }
            }, 1000)
          }
         
        }
      })

    }


  },
  //获取验证码
  getVerificationCode() {
    this.getCode();
    var _this = this
    _this.setData({
      disabled: true
    })
  },
  //提交表单信息
  save: function () {
    var myreg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    var _this=this
    if (this.data.name == "") {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.code == "") {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
          var expiration = wx.getStorageSync("expiration");//拿到过期时间
          var verification_data = wx.getStorageSync("verification_data");//拿到缓存数据
          console.log("过期时间" , expiration)
          console.log("缓存数据" , verification_data)
          console.log("缓存数据", )
          var timestamp = Date.parse(new Date());//拿到现在时间
          console.log(timestamp)
          //进行时间比较
          if (expiration < timestamp) {//过期清空缓存
            console.log("缓存已过期");
            wx.clearStorageSync();//清空缓存
            wx.showToast({
              title: '验证码已过期',
              icon: 'none',
              duration: 1000
            })
            
          } else if (_this.data.code != verification_data.verificationCode || _this.data.phone != verification_data.mobile) {
            wx.showToast({
              title: '验证码填写错误或手机号填写错误',
              icon: 'none',
              duration: 1000
            })
            return false;
          }else{
            console.log(_this.data.phone)
            console.log(_this.data.figo_token_id)
            app.data.userphone = _this.data.phone;//将用户电话存入全局
            console.log(app.data.userphone)
              wx.request({
                data: {
                  mobile: _this.data.phone,
                  figo_token_id: _this.data.figo_token_id
                },
                'url': siteRoots + '/figo/wxuser/bindMobile/',
                success(res) {
                  console.log("成功",res)
                  console.log(res)
                  // _this.setData({
                  //   mobile: res.data.mobile,
                  //   iscode: res.data.verificationCode,
                  // })
                }
          })
            wx.removeStorage({
              key: 'expiration',
              success: function (res) {
                console.log(res.data)
              },
            })
            wx.setStorageSync('name', this.data.name);
            wx.setStorageSync('phone', this.data.phone);
           
            wx.navigateBack({
              delta: 1
            })
            // wx.redirectTo({ 
            //   url: "weixinmao_house/pages/index/index",
            // })
          }
      //   }
      // })
     
     
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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