// idc详情 index.js
// 引入SDK核心类
var R_htmlToWxml = require('../../resource/js/htmlToWxml.js');//引入公共方法
var imageUtil = require('../../resource/js/images.js');
var WxParse = require('../../resource/wxParse/wxParse.js');
var app = getApp();
var siteRoots = app.data.siteroot;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    images: {},
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true,
    title: '',
    address: '',
    lat: 0,
    lng: 0,
    ids: 0,
    title: '',
    idcPicList: null,
    idcids: null,
    siteRoots: '',
    isChecked: false,
    content: '',
    isFavor:false
  },
  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(siteRoots);
    //初始数据
    that.setData(
      {
        siteRoots: siteRoots,
        idcIds: options.ids
      }
    );
    console.log('当前的idciIds是：' + options.ids);
    this.IdcPicView(options.ids);
    console.log('abcabc'); 
    this.viewContent(options.ids);
    this.IsFavorite(options.ids);
    // app.useCheck();
    this.customerManager();
  },



  // wxparse 文章详情*****
  viewContent: function (idcIds) {
    console.log('文章详情');
    var that = this;
    wx.request({
      'url': siteRoots + '/wxapp/idc/list2',
      data: { _query_ids: idcIds },
      success: function (res) {
        if (res.data && res.data.list && res.data.list[0] ) {
          var data = res.data.list[0];
          console.log('机房数据：=======',data);
          // console.log('abcabc'.replace('a','x'));
          WxParse.wxParse('article', 'html', data.content ? data.content:'暂无数据', that, 5);
          that.setData({
            title: data.title,
            createtime: data.createtime,
            level: data.level,
            area: data.area,
            num:data.num,
            airConditioner: data.airconditioner,
            electrical: data.electrical,
            ups: data.ups,
            generator: data.generator,
            network: data.network
          })
        }
      },

      complete: function () {
        wx.hideNavigationBarLoading(); //完成停止加载
        wx.stopPullDownRefresh();
      }
    });
  },
  // 是否收藏
  IsFavorite: function (idcIds) {
    var that = this;
    var idciIds = idcIds;
    var userIdcs = app.data.userinfo.ids;
    console.log('userIdcs是',userIdcs);
    wx.request({
      'url': siteRoots + '/wxapp/useridc/isFavor',
      data: {
        idcIds: idciIds,
        userIds: userIdcs,
      },
      success: function (res) {
        that.setData(
          {
            isFavor: res.data,
          }
        );
        var UserIsFavor = res.data;
        console.log(UserIsFavor);
        if (UserIsFavor){
          console.log('用户已经收藏' + UserIsFavor)
          that.setData(
            {
              isChecked: true
            }
          );
        }else{
          console.log('用户没有收藏' + UserIsFavor);
          that.setData(
            {
              isChecked: false
            }
          );
        }
      },
    })
  },



  // 收藏操作
  favorite: function (e) {
    var that = this;
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
      var idcIds = e.currentTarget.dataset.idcids;
      var userIdcs = app.data.userinfo.ids;
      wx.request({
        'url': siteRoots + '/wxapp/useridc/favorite',
        data: {
          idcIds: idcIds,
          userIds: userIdcs,
        },
        success: function (res) {
          that.IsFavorite(idcIds);
          console.log('收藏成功');
          // wx.showToast({
          //   title: '收藏成功',
          // })
        },
        complete: function () {
        }
      })
    }
  },




  // 地图导航
  goMap: function (e) {
    var that = this;
    wx.openLocation({
      latitude: parseFloat(39.984154),
      longitude: parseFloat(116.307490),
      scale: 18,
      name: '海淀区中国技术交易大厦',
      address: '北京市海淀区彩和坊路海淀西大街74号'
    })
  },
  // idc焦点图请求
  IdcPicView: function (idcIds) {
    var that = this;
    wx.request({
      'url': siteRoots + '/wxapp/idcpic/list2/' + idcIds,
      success: function (res) {
        console.log("开始idc焦点图");
        console.log(res.data.list);
        console.log(res.data);
        console.log(res);
        if (res.data) {
          that.setData({
            idcPicList: res.data.list,
            // idcids: res.data.list.idcids
          })
        }
        // console.log(this.data.list.idcids);
        console.log("结束idc焦点图");
      },
      complete: function () {
        that.setData({
          loadMore: '数据加载完成'
        })
      }
    });
  },

  // 客户经理信息
  customerManager: function (e) {
    var that = this;
    wx.request({
      url: siteRoots + '/wxapp/customermanager/list2',
      success: function (res) {
        that.setData({
          customerManagerIphone: res.data.list[0].phone,
        })
        console.log(res.data.list[0].phone);
        var customerManagerIphone = res.data.list[0].phone
      },
      fail: function (res) {
      }
    })
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
    wx.stopPullDownRefresh();
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
      title: this.data.title,
      path: '/weixinmao_house/pages/saledetail/index?ids=' + this.data.ids
    }
  }
})