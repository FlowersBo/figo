// weixinmao_house/pages/myOrder/index.js
var app = getApp();
var siteRoots = app.data.siteroot;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderList: "",
    userinfo:{},
    // navbar: ['全部', '待场勘', '待施工','已完成','已取消'],
    currentTab: 0,
    // release:[
    //   {
    //     id:0,
    //     date:"2018年12月5日",
    //     midelDetail1:"Tesla Model X",
    //     midelDetail2:"第二代高功率壁挂式连接器",
    //     currentState:"已完成",
    //     detail:"室外电缆  等3项辅料及额外施工",
    //     price:"￥3000元"
    //   },
    //   {
    //     id: 1,
    //     date: "2018年12月4日",
    //     midelDetail1: "Tesla Model X",
    //     midelDetail2: "第二代高功率壁挂式连接器",
    //     currentState: "已取消"
    //   },
    //   {
    //     id: 2,
    //     date: "2018年12月3日",
    //     midelDetail1: "Tesla Model X",
    //     midelDetail2: "第二代高功率壁挂式连接器",
    //     currentState: "已完成",
    //     detail: "室外电缆  等3项辅料及额外施工",
    //     price: "￥5000元"
    //   },
    // ]
  },
  // 用户信息展示
  // userInfoShow: function (e) {
  //   var that = this;
  //   console.log('00000000000000');
  //   console.log(app.data);
  //   if (app.data.userinfo == null) {
  //     wx.showToast({
  //       title: "为了您更好的体验,请先点击我的下方登录同意授权",
  //       icon: 'none',
  //       duration: 2000
  //     })
  //     wx.navigateTo({
  //       url: '/weixinmao_house/pages/wxlogin/index',
  //     })
  //   }
  //   else {
  //     console.log('我的，获取全局登录信息', app.data);
  //     console.log('我的，获取全局登录信息', app.data.userinfo);
  //     console.log('我的，获取全局登录信息', app.data.userinfo.avatar);
  //     that.setData({
  //       avatarUrl: app.data.userinfo.avatar,
  //       nickName: app.data.userinfo.nickname
  //     });
  //   }
  // },
  //导航切换
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    console.log(e)
  },

  // 判断状态
  judgement:function(e){
    var that=this;
    var itemList = that.data.orderList;
    for(var i=0; i<itemList.length; i++){
      var item = itemList[i].status
      if(item=="survey"){
        item="场堪"
      } else if (item == "record"){
        item="录入"
      } else if (item =="install"){
        item = "安装"
      } else if (item == "fianl") {
        item = "完成"
      } else if (item == "cancel") {
        item = "取消"
      }
      console.log(111 + item)
    }
    that.setData({
      item:item
    })
   console.log(that.data.item)
  },
  //删除订单
  removeOrder:function(e){
    const that=this;
    console.log(e)
    wx.showModal({
      title:"删除后无法恢复",
      content:"您是否要删除该订单",
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var dataId = e.target.id;
          console.log("删除" + dataId);
          var release = that.data.orderList;
          var newRelease = [];
          for (var i in release) {
            var item = release[i];
            if (item.ids != dataId) {
              newRelease.push(item);
            }
          }
          console.log(release.length)
          that.setData({
            orderList: newRelease
           
          });
          console.log(newRelease)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

// 获取数据
  indexFoc: function (e) {
    var that = this;
    wx.request({
      'url': siteRoots + '/figo/order/list',
      // 'url': siteRoots + '/figo/orderRecord',
      success: function (res) {
        if (res.data) {
          that.setData({
            orderList: res.data.list,
          })
          console.log(res.data.list);   
        }
        that.judgement();
      },
      fail: function (res) {
        console.log('网络错误');
        // that.setData({
        //   showmsg: '网络错误'

        // })
      }
    });
  },

  // 订单详情跳转
  lineItem:function(e){
    var id = e.currentTarget.dataset.id;
    console.log(e.currentTarget)
    console.log(id)
    wx.navigateTo({
      url: "./lineItem/index?id=" + id
    })
  },
  evaluate: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: "../../pages/evaluate/index?id=" + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.data.userinfo)
    var that = this;
    that.setData({
      siteRoots: siteRoots,
    });
    this.indexFoc();
    this.app = getApp();
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
    this.app.slideupshow(this, 'slide_up1', -200, 1)

    setTimeout(function () {
      this.app.slideupshow(this, 'slide_up2', -550, 1)
    }.bind(this), 600);
    // this.userInfoShow();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //还原动画
    this.app.slideupshow(this, 'slide_up1', 200, 0)
    //延时展现容器2，做到瀑布流的效果
    setTimeout(function () {
      this.app.slideupshow(this, 'slide_up2', 200, 0)
    }.bind(this), 1);
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