var list = {
  "List": [
    {
      'A': [
        { name: 'TELSA' },
        { 'picture': '../../resource/images/typeface/telsa3.jpg', 'desc': 'Telsa ModelX' },
        { 'picture': '../../resource/images/typeface/telsa1.png', 'desc': 'Telsa Model3'},
        { 'picture': '../../resource/images/typeface/telsa2.jpg', 'desc': 'Telsa ModelY' },
      ],
      'B': [
        { name: '小鹏' },
        { 'picture': '../../resource/images/typeface/xp1.jpeg', 'desc': '小鹏' },
        { 'picture': '../../resource/images/typeface/xp2.jpeg', 'desc': '小鹏' },
      ],
      'C': [
        { name: '蔚来' },
        { 'picture': '../../resource/images/typeface/wl1.jpeg', 'desc': '蔚来' },
        { 'picture': '../../resource/images/typeface/wl2.jpeg', 'desc': '蔚来' },
        { 'picture': '../../resource/images/typeface/wl3.jpeg', 'desc': '蔚来' },
      ]
    }
  ],
};
var util = require('../utils/utils.js');
var TIME = util.formatDate(new Date());
Page({
  data: {
    // 左侧点击类样式
    curNav: 'A',
    time:'',
    contentText:"特斯拉MODEL X是特斯拉研发的一款SUV车型，采用“2+3+2”的七座布局设计，介于SUV和轿跑车之间的跨界车。2016年4月23日，特斯拉正式在中国国内发布Model X汽车。"
  },
  onReady: function () {
    this.setData({
      time:TIME
    })
    // 生命周期函数--监听页面初次渲染完成
    var listChild1 = list.List[0];
    var that = this;
    // 获取可视区高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          list: listChild1,
          winHeight: res.windowHeight,
        })
      }
    })
  },
  //点击左侧 tab ，右侧列表相应位置联动 置顶
  switchRightTab: function (e) {
    var id = e.target.id;
    console.log(typeof id)
    this.setData({
      // 动态把获取到的 id 传给 scrollTopId
      scrollTopId: id,
      // 左侧点击类样式
      curNav: id
    })
  },
  //跳转详情页
  scrollTop:function(){
    wx.navigateTo({
      url: 'shoppingDetails/index',
    })
  }
})  