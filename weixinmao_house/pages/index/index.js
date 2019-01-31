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
    idcList:null,
    idcLists: [
      {
        imgUrl:"../../resource/images/typeface/pic01.jpg",
        title:"小城清迈的慢生活，一个人的旅行不孤单（自行车）",
        updatetime:"2018-12-10"
      },
      {
        imgUrl: "../../resource/images/typeface/pic02.jpg",
        title: "你向往自由，我们就一起走|美西旅拍婚纱之旅",
        updatetime: "2018-12-9"
      },
      {
        imgUrl: "../../resource/images/typeface/pic03.jpg",
        title: "野生妹子 9天8夜 包车冬游西藏 且浪且怂 （西安 拉萨 林芝 新疆......",
        updatetime: "2018-12-8"
      },
    ]
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
  stopTouchMove: function () {
    return false;
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数    
    var that = this; 
    that.setData({
      siteRoots: siteRoots,
    }); 
    // 轮播图  图片个数参照后台上传为主
    this.indexFoc();
    // 市场行情 2条数据
    // this.indexNews();
    // idc机房推荐 10条数据 推荐属性
    this.idcList();
    this.servicePic();
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
  toAboutUs: function (e) {
    var that = this;
    wx.navigateTo({
      // url: "/weixinmao_house/pages/aboutus/index?ids=9c5bf5ba1dcc4beea6fa4275a3f06c45"
      // wx.request({
      url: "/weixinmao_house/pages/car/index",
      // 'url': siteRoots + '/wxapp/market/list2',
      // data: { pageNumber: 1, pageSize: 10, recomend: true },
      // success: function (res) {
      //   console.log("开始");
      //   console.log(res.data);
      //   if (res.data) {
      //     var idcLength = res.data.list.length;

      //   }
      //   console.log("结束");
    })
  },
  // 跳转国际带宽
  // toWorldIn: function (e) {
  //   var ids = e.currentTarget.dataset.id;
  //   wx.navigateTo({
  //     url: "/weixinmao_house/pages/worldin/index?ids=f79cb7e325144836998d5c1c72b69489"
  //   })
  // },
  toArticleList: function (e) {
    wx.navigateTo({
      url: "/weixinmao_house/pages/article/index"
    })
  },
  toCity: function (e) {
    wx.navigateTo({
      url: "/weixinmao_house/pages/city/index"
    })
  },
  //跳转到我的订单
  toHotSale: function (e) {
    wx.navigateTo({
      url: "/weixinmao_house/pages/myOrder/index"
    })
  },
  toSaleList: function (e) {
    wx.navigateTo({
      url: "/weixinmao_house/pages/information/index"
    })
  },
 
  toArticle: function (e) {
    wx.navigateTo({
      url: "/weixinmao_house/pages/salelist/index"
    })
  },
  serviceProcess: function(e){
    wx.navigateTo({
      url: "/weixinmao_house/pages/serviceProcess/index"
    })
  },
  // toArticleDetail: function (e) {
  //   var ids = e.currentTarget.dataset.id;
  //   wx.navigateTo({
  //     url: "/weixinmao_house/pages/articledetail/index?ids=" + ids
  //   })
  // },
  toActive:function(e)
  {
    wx.navigateTo({
      url: "/weixinmao_house/pages/active/index"
    })

  }
  ,
  toNetWorkProvince: function (e) {
    wx.navigateTo({
      url: "/weixinmao_house/pages/networkprovince/index?ids=ef634359be8540d6898a2782df8372b2"
    })
  },
  // 首轮播跳转
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

  toOldHouseDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/weixinmao_house/pages/oldhousedetail/index?id=" + id
    })
  },
  toLethouse: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/weixinmao_house/pages/lethouselist/index?id=" + id
    })

  },
  toMessage: function(e)
    {
    wx.navigateTo({
      url: "/weixinmao_house/pages/message/index"
    })

    },
    
  toSearch:function(e){

    wx.navigateTo({
      url: "/weixinmao_house/pages/search/index"
    })


  },
  PubOldhouse:function(e){
    var that = this;
    wx.navigateTo({
      url: "/weixinmao_house/pages/pub/index",
      success:function(){
        that.data.showmsg = true;
        that.setData({
          showmsg: that.data.showmsg

        })

      }
    })
  },
  PubLethouse: function (e) {
    var that = this;
    wx.navigateTo({
      url: "/weixinmao_house/pages/letpub/index",
      success: function () {
        that.data.showmsg = true;
        that.setData({
          showmsg: that.data.showmsg

        })

      }
    })
  },

  toSaleOldPub: function (e) {
    var that = this;

    wx.navigateTo({
      url: "/weixinmao_house/pages/saleoldpub/index",
      success: function () {
        that.data.showmsg = true;
        that.setData({
          showmsg: that.data.showmsg 

        })

      }
    })
  },


  toSalePub:function(e){
    var that = this;

    wx.navigateTo({
      url: "/weixinmao_house/pages/salepub/index",
      success: function () {
        that.data.showmsg = true;
        that.setData({
          showmsg: that.data.showmsg

        })

      }
    })
  },

  toSaleBuyPub: function (e) {
    var that = this;

    wx.navigateTo({
      url: "/weixinmao_house/pages/salebuypub/index",
      success: function () {
        that.data.showmsg = true;
        that.setData({
          showmsg: that.data.showmsg

        })

      }
    })
  },

  toSaleLetPub: function (e) {
    var that = this;

    wx.navigateTo({
      url: "/weixinmao_house/pages/saleletpub/index",
      success: function () {
        that.data.showmsg = true;
        that.setData({
          showmsg: that.data.showmsg

        })

      }
    })
  },
 
  goPub:function(e){
    this.data.showmsg = false;
    this.setData({
      showmsg: this.data.showmsg

    })
  
/*
    wx.navigateTo({
      url: "/weixinmao_house/pages/pub/index"
    })

  */

  },
  closemsg:function(e) {
    this.data.showmsg = true;
    this.setData({
      showmsg: this.data.showmsg

    })},
  goMap: function (e) {
    wx.openLocation({
      latitude: parseFloat(wx.getStorageSync('companyinfo').lat),
      longitude: parseFloat(wx.getStorageSync('companyinfo').lng),
      scale: 18,
      name: wx.getStorageSync('companyinfo').name,
      address: wx.getStorageSync('companyinfo').address
    })
  },
  // 首页一轮播图
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
          console.log(res.data.list);
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
  // 服务留下播图
  servicePic: function (e) {
    var that = this;
    wx.request({
      'url': siteRoots + '/wxapp/discount/list2',
      success: function (res) {
        if (res.data) {
          that.setData({
            servicePic: res.data.list,
            // pic: res.data.list.pic,
          })
          console.log('服务流程图2',res.data.list);
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
  // idc机房推荐 10条数据 推荐属性
  idcList:function(e){
    var that = this;
    wx.request({
      'url': siteRoots + '/wxapp/market/list2',
      data: { pageNumber: 1, pageSize: 10, recomend: true },
      success: function (res) {
        console.log("开始");
        console.log(res.data);
        if (res.data) {
          var idcLength = res.data.list.length;
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
    // 市场行情 2条数据
    // this.indexNews();
    // idc机房推荐 10条数据 推荐属性
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