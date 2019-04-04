// weixinmao_house/pages/hotsale/index.js
var app = getApp();
var siteRoots = app.data.siteroot;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotSailList: null,
    hasNextPage: null,
    pageNumber: 1,
    idcLists: []
  },
  idcList: function (e) {
    var that = this;
    wx.request({
      'url': siteRoots + '/wxapp/discount/list2',
      data: { pageNumber: 1, pageSize: 10, recomend: true, _query_type: 'news', 'orderColunm': 'updateTime', 'orderMode': 'desc'},
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
  // 跳转到idc车友圈详情
  toSailDetail: function (e) {
    var ids = e.currentTarget.dataset.id;
    console.log(e.currentTarget)
    console.log(ids)
    wx.navigateTo({
      url: "/weixinmao_house/pages/car/index?ids=" + ids,
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
    
    this.idcList();
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
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 500)
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