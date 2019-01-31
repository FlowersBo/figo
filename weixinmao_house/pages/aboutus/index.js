// weixinmao_house/pages/aboutus/index.js
var app = getApp();
var siteRoots = app.data.siteroot;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  //   des: '<p>北京华博云天科技有限公司成立于2015年，注册资金1000万元，定位于专注互联网数据中心运营及提供增值服务的公司，提供互联网数据中心（Internet Data Center，即IDC）基础架构服务以及基于IDC的增值服务，包括网络服务，云服务、大数据运营服务等。华博云天的核心团队成员来自于通信行业领域的上市公司与互联网巨头企业，拥有丰富的运营商资源，深厚的IDC技术储备、运营经验和市场资源，为大型互联网客户提供定制化数据中心的商业模式奠定了坚实的基础</p>'// 
  aboutDes:null,
  des:null,
  ids:null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('00');
    console.log(options.ids);
    this.setData(
      {
        ids: options.ids,
        siteRoots: siteRoots,
      }
    ); 
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