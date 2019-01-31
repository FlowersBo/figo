// wxsmall_001/pages/message/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '信息综合查询',
    })
   
    this.setData({
      loadmore: true

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
    this.setData({
      loadmore: true

    })
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

  },
  bindSave: function (e) {
    var that = this;
    var keyword = e.detail.value.keyword;

    if (keyword == "") {
      wx.showModal({
        title: '提示',
        content: '请输入小区、地名、物业等相关信息',
        showCancel: false
      })
      return
    }


    app.util.request({
      'url': 'entry/wxapp/search',
      data: { keyword: keyword },
      success: function (res) {


        if (res.data.errno != 0) {
          // 登录错误 
          wx.hideLoading();
          wx.showModal({
            title: '失败',
            content: res.data.data.msg,
            showCancel: false
          })
          return;
        } else {
          if(res.data.data.length == 0)
            {
            console.log('fffffffff');
            that.setData({
              list: res.data.data,
              loadmore: false

            })
            }else{
          that.setData({
            list: res.data.data,
            loadmore: true

          })
        }
         
        }



      }
    });


  },
  toNewsDetail: function (e) {
  console.log(e);
    var id = e.currentTarget.dataset.id;

    var housetype = e.currentTarget.dataset.type;
    if (housetype == 'lethousedetail')
    {

      wx.navigateTo({
        url: "/weixinmao_house/pages/" + housetype + "/index?id=" + id
      })

    }else{
      wx.navigateTo({
      url: "/weixinmao_house/pages/"+housetype+"/index?id=" + id
    })
    }

  },
  onShareAppMessage() {
    return {
      title: '信息综合查询-' + wx.getStorageSync('companyinfo').name,
      path: '/weixinmao_house/pages/search/index'
    }
  }
})