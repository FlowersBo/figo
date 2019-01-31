// index.js
// 引入SDK核心类
var R_htmlToWxml = require('../../resource/js/htmlToWxml.js');//引入公共方法
var imageUtil = require('../../resource/js/images.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: {},
    autoplay: true,
    interval: 3000,
    duration: 1000,
    title: '',
    address: '',
    lat: 0,
    lng: 0,
    showmsg: true,
    aid:0,
    pid:0
  }
  , imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {

    wx.setNavigationBarTitle({
      title: wx.getStorageSync('companyinfo').name,
    })

    var that = this;


    if (this.data.aid > 0) {
      var id = this.data.aid;
    } else {
      var id = e.id;
      this.data.aid = e.id;
    }




    //初始化导航数据
    app.util.request({
      'url': 'entry/wxapp/getactivedetail',
      data: { id: id },
      success: function (res) {
        if (!res.data.message.errno) {
          var houseDetail = R_htmlToWxml.html2json(res.data.data.list.content);
          var activDetail = R_htmlToWxml.html2json(res.data.data.activeinfo.content);
          that.data.title = res.data.data.list.housename;
          that.data.pid = res.data.data.list.id;
          that.data.address = res.data.data.list.houseaddress;
          that.data.lat = res.data.data.list.lat;
          that.data.lng = res.data.data.list.lng;
          wx.setNavigationBarTitle({
            title: that.data.title + '-' + wx.getStorageSync('companyinfo').name,
          })

          that.setData({
            data: res.data.data.list,
            housepic: res.data.data.housepic,
            houseplan: res.data.data.houseplan,
            piclist: res.data.data.piclist,
            activeinfo: res.data.data.activeinfo,
            content: houseDetail,
            activDetail: activDetail,
            showmsg: that.data.showmsg,
            totalnum:res.data.data.totalnum
          })
        }
      }
    });


  },
  doBaoming:function(e){
    var that = this;
    this.setData({
      scrollTop: 0,
      showmsg: false
    })

  }
  ,
  closemsg:function(e)
  {

    this.setData({
      showmsg: true
    })

  }
  ,
  saveuserinfo: function (e) {
    var that = this;
    var name = e.detail.value.name;
    var tel = e.detail.value.tel;
    var aid =  that.data.aid;
    var pid = that.data.pid;
    if(aid == 0)
      {
      wx.showModal({
        title: '提示',
        content: '活动ID不存在',
        showCancel: false
      })
      return;
      }
    
    if (pid == 0) {
      wx.showModal({
        title: '提示',
        content: '房产ID不存在',
        showCancel: false
      })
      return;
    }

    if (name == "") {
      wx.showModal({
        title: '提示',
        content: '请填写您的姓名',
        showCancel: false
      })
      return;
    }
    if (tel == "") {
      wx.showModal({
        title: '提示',
        content: '请填写您的手机号',
        showCancel: false
      })
      return;
    }


    app.util.request({
      'url': 'entry/wxapp/savebaoming',
      data: { name: name, tel: tel,aid:aid, pid:pid },
      success: function (res) {


        if (res.data.errno != 0) {
          // 登录错误 
          wx.hideLoading();
          wx.showModal({
            title: '失败',
            content: res.data.msg,
            showCancel: false
          })
          return;
        } else {

          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            showmsg: true,
            totalnum: res.data.data.totalnum
          })
        }



      }
    });

  }
  
  ,
  goMap: function (e) {
    var that = this;
    wx.openLocation({
      latitude: parseFloat(that.data.lat),
      longitude: parseFloat(that.data.lng),
      scale: 18,
      name: that.data.title,
      address: that.data.address
    })
  },
  doCall: function (e) {
    console.log(e.currentTarget);
    var tel = e.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: tel, //此号码并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
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
    wx.showNavigationBarLoading();
    this.onLoad();
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

  },
  onShareAppMessage() {
    return {
      title: this.data.title + '-' + wx.getStorageSync('companyinfo').name,
      path: '/weixinmao_house/pages/activedetail/index?id=' + this.data.aid
    }
  }
})