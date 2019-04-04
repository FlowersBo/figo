// 引入SDK核心类
var QQMapWX = require('../../resource/js/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var config = require('../../resource/js/config.js');

var markersData = [];
var app = getApp();
var siteRoots = app.data.siteroot;
Page({
  data: {
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular:true,
    showmsg:true,
    newsIndex:null,
    focusPic: null,
    ids:null,
    idcList:[],
  },
 

  prevImg: function () {
    var swiper = this.data.swiper;
    var current = swiper.current;
    console.log(current)
    swiper.current = current > 0 ? current - 1 : swiper.imgUrls.length - 1;
    this.setData({
      swiper: swiper,
    })

  },

  nextImg: function () {
    var swiper = this.data.swiper;
    var current = swiper.current;
    swiper.current = current < (swiper.imgUrls.length - 1) ? current + 1 : 0;
    this.setData({
      swiper: swiper,
    })

  },
  // 禁止手动滑动轮播
  // stopTouchMove: function () {
  //   return false;
  // },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数    
    var that = this; 
    that.setData({
      siteRoots: siteRoots,
    }); 
    // 轮播图  图片个数参照后台上传为主
      this.indexFoc();
    // idc车友圈推荐 10条数据 推荐属性
      this.idcList();
  },

  //跳转售后服务
  toShopping: function () {
    wx.navigateTo({
      url: '/weixinmao_house/pages/shopping/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },


  // 跳转到idc车友圈详情
  toSailDetail: function (e) {
    var ids = e.currentTarget.dataset.id;
    console.log(e.currentTarget)
    console.log(ids)
    wx.navigateTo({
      url: "/weixinmao_house/pages/car/index?ids=" + ids,
    })
  },
  //跳转到车友圈
  toAboutUs: function (e) {
    var that = this;
    wx.navigateTo({
      url: "/weixinmao_house/pages/carFans/index",
    })
  },

  //跳转到我的订单
  toHotSale: function (e) {
    // 验证用户是否登陆
      var that = this;
      console.log('11111111');
      console.log(app.data);
      if (app.data.userinfo == null) {
        wx.showToast({
          title: "为了您更好的体验,请先点击我的下方登录同意授权",
          icon: 'none',
          duration: 2000
        })
        wx.navigateTo({
          url: '/weixinmao_house/pages/wxlogin/index',
        })
    } else if (app.data.userinfo.data.mobile !== '' &&app.data.userinfo.data.mobile !== null) {//验证用户是否短信验证
        wx.navigateTo({
          url: "/weixinmao_house/pages/myOrder/index"
        })
    
    }
      else if (app.data.userphone != '' && app.data.userphone != null) {//验证用户是否短信验证
        wx.navigateTo({
          url: "/weixinmao_house/pages/myOrder/index"
        })
      }
    else {
        wx.showToast({
          title: "请绑定您的手机号",
          icon: 'none',
          duration: 2000
        })
        wx.navigateTo({
          url: '/weixinmao_house/pages/phoneVerify/index',
           // wx.navigateBack();
        })
    }   
  },

  //跳转到我要立桩
  toSaleList: function (e) {
    // 验证用户是否登陆
    var that = this;
    console.log(app.data);
    if (app.data.userinfo == null) {
      wx.showToast({
        title: "为了您更好的体验,请先点击我的下方登录同意授权",
        icon: 'none',
        duration: 2000
      })
      wx.navigateTo({
        url: '/weixinmao_house/pages/wxlogin/index',
      })
    }
    else {
      console.log('我的，获取全局登录信息', app.data);
      wx.navigateBack();
    }
    wx.navigateTo({
      url: "/weixinmao_house/pages/information/index"
    })
  },
 
  //跳转到流程
  serviceProcess: function(e){
    wx.navigateTo({
      url: "/weixinmao_house/pages/service/index"
    })
  },

  // 首页轮播跳转
  toNewsDetail:function(e){
    var ids = e.currentTarget.dataset.id;
    console.log("000000");
    console.log(ids);
    console.log(e);
    console.log("111111");
    wx.navigateTo({
      url: "/weixinmao_house/pages/newsdetail/index?ids=" + ids
    })
  },
  // goMap: function (e) {
  //   wx.openLocation({
  //     latitude: parseFloat(wx.getStorageSync('companyinfo').lat),
  //     longitude: parseFloat(wx.getStorageSync('companyinfo').lng),
  //     scale: 18,
  //     name: wx.getStorageSync('companyinfo').name,
  //     address: wx.getStorageSync('companyinfo').address
  //   })
  // },
  // 首页轮播图
  indexFoc:function(e){
    var that = this;
    wx.request({
      'url': siteRoots + '/wxapp/homepic/list2',
      success: function (res) {
        if (res.data) {
          that.setData({
            focusPic: res.data.list,
            // pic: res.data.list.pic,
          })
          console.log('轮播图',res.data.list);
          // console.log(res.data.list[0].ids);   
        }
      },
      fail: function (res) {
        console.log('网络错误');
        that.setData({
          showmsg: '网络错误'

        })
      }
    });
  },
 

  //点击放大
  // previewImg: function (e) {
  //   console.log(e.currentTarget.dataset.index);
  //   var index = e.currentTarget.dataset.index;
  //   wx.previewImage({
  //     current: imgArr[index],     //当前图片地址
  //     urls: servicePic,   //所有要预览的图片的地址集合 数组形式
  //     success: function (res) { },
  //     fail: function (res) { },
  //     complete: function (res) { },
  //   })
  // },
  // 市场行情 2条数据
  // indexNews:function(e){
  //   var that = this;
  //   wx.request({
  //     'url': siteRoots + '/wxapp/market/list2',
  //     data: { 'pageNumber': 1, 'pageSize': 2, 'orderColunm': 'updateTime', 'orderMode': 'desc'},
  //     success: function (res) {
  //       if (res.data) {
  //         that.setData({
  //           newsIndex: res.data.list
  //         })
  //       }
  //     },
  //     fail: function (res) {
  //       console.log('网络错误');
  //     }
  //   });
  // },
  // 车友圈精选 3条数据 推荐属性
  idcList:function(e){
    var that = this;
    wx.request({
      'url': siteRoots + '/wxapp/discount/list2',
      data: { pageNumber: 1, pageSize: 3, recomend: true, _query_type: "friendcircle", 'orderColunm': 'updateTime', 'orderMode': 'desc'},
      success: function (res) {
        console.log("车友圈开始");
        console.log(res.data);
        if (res.data) {
          var idcLength = res.data.list.length;
          console.log(res.data.list)
          that.setData(
            {
              idcList: res.data.list,
              domIidcLength: idcLength
            }
          )
        }
        console.log("结束");
      },
      complete: function () {
        wx.hideNavigationBarLoading(); //完成停止加载
        wx.stopPullDownRefresh();
      }
    });
  },
  onReady: function () {
    // 页面渲染完成
    const self = this;
  },
  bindInput: function (e) {
    var that = this;
    this.setData({
      inputValue: e.detail.value
    });
    that.onShow();
  },
  onShow: function () {
    // 轮播图  图片个数参照后台上传为主
    this.indexFoc();
    // this.indexNews();
    // idc车友圈推荐 10条数据 推荐属性
    this.idcList();
    
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.onLoad();
    wx.stopPullDownRefresh();
  },
 
  doCall: function () {
    var tel = this.data.textData.shop_tel;
    wx.makePhoneCall({
      phoneNumber: tel
    })
  },
  onShareAppMessage() {
    return {
      title: wx.getStorageSync('companyinfo').name,
      path: '/weixinmao_house/pages/index/index'
    }
  }
})