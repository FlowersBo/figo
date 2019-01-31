// index.js
var app = getApp();
var siteroots = app.data.siteroot;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    articleList:[],
    newsIndex:[],
    ids: null,
    id: null,
    hasNextPage:null,
    pageSize: 10,
    pageNumber: 1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    this.indexNews();
  },

  // 点击详情
  toArticleDetail: function(e) {
    var ids = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/weixinmao_house/pages/articledetail/index?ids=" + ids
    })
  },

  // 市场行情 2条数据
  indexNews: function (e) {
    var that = this;
    wx.request({
      'url': siteroots + '/wxapp/market/list2',
      data: { 'pageNumber': 1, 'pageSize': 20, 'orderColunm': 'updateTime', 'orderMode': 'desc' },
      success: function (res) {
        console.log(res);
        that.data.newsIndex = res.data.list;
        that.data.hasNextPage = res.data.hasNextPage;
        that.data.pageNumber = 1;
        console.log(that.data.hasNextPage);
        console.log('第一页数据展示：',that.data.newsIndex);
        if (res.data) {
          that.setData({
            newsIndex: res.data.list
          })
        }
      },
      fail: function (res) {
        console.log('网络错误');
      }
    });
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
    this.indexNews();
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function(e) {
    var that = this; 
    wx.showLoading({
      title: '玩命加载中',
    })     
    if (that.data.hasNextPage) {
      that.data.pageNumber = that.data.pageNumber + 1;
      console.log('当前页码', that.data.pageNumber);
      wx.request({
        url: siteroots + '/wxapp/market/list2/?pageNumber=' + that.data.pageNumber,
        method: "GET",
        data: { 'orderColunm': 'updateTime', 'orderMode': 'desc'},
        // 请求头部
        header: {
          'content-type': 'application/text'
        },
        success: function (res) {
          // 回调函数
          var articleList = that.data.newsIndex;
          var nowList = res.data.list;
          that.data.hasNextPage = res.data.hasNextPage;
          console.log('是否有下一页判断', that.data.hasNextPage)
          console.log(nowList);
          for (var i = 0; i < nowList.length; i++) {
            articleList.push(nowList[i]);
          };
          console.log('所有请求数据展示===',articleList);
          // 设置数据
          that.setData({
            newsIndex: articleList
          });
          // that.data.pageNumber++;
          // 隐藏加载框
          wx.hideLoading();
        }
      })    
    }else{
      wx.showToast({
        title: '暂无更多数据',
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '华博云-' + wx.getStorageSync('companyinfo').name,
      path: '/weixinmao_house/pages/article/index'
    }
  }
})