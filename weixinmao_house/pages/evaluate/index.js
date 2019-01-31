// weixinmao_house/pages/evaluate/index.js
//获取应用实例
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    count:3,
    imageList:[],
    texts: "至少5个字",
    min: 5,//最少字数
    max: 520, //最多字数 (根据自己需求改变) 
    currentInput: '',
    stars: [0, 1, 2, 3, 4],
    normalSrc: '/weixinmao_house/resource/images/typeface/star_off.png',
    selectedSrc: '/weixinmao_house/resource/images/typeface/star_on.png',
    halfSrc: '/weixinmao_house/resource/images/typeface/star_half.png',
    key: 0,//评分
  },
  inputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length); 
    //最少字数限制
    if (len <= this.data.min)
      this.setData({
        texts: "加油，马上五个字了！"
      })
    else if (len > this.data.min)
      this.setData({
        texts: " "
      })

    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentInput: value,
      currentWordNumber: len, //当前字数  
    });
    console.log(this.data.currentInput)
    try {
      wx.setStorageSync('currentInput', value)
    } catch (e) { }
    wx.getStorage({
      key: 'currentInput',
      success(res) {
        console.log(res.data)
      }
    })
  },

  //点击右边,半颗星
  selectLeft: function (e) {
    var key = e.currentTarget.dataset.key
    if (this.data.key == 0.5 && e.currentTarget.dataset.key == 0.5) {
      //只有一颗星的时候,再次点击,变为0颗
      key = 0;
    }
    console.log("得" + key + "分")
    this.setData({
      key: key
    })
  },
  //点击左边,整颗星
  selectRight: function (e) {
    var key = e.currentTarget.dataset.key
    console.log("得" + key + "分")
    this.setData({
      key: key
    })
  },

//上传图片
  chooseImage: function () {
    var that = this;
    console.log('aaaaaaaaaaaaaaaaaaaa')

    wx.chooseImage({
      count: 3,
      success: function (res) {
        console.log('ssssssssssssssssssssssssss')
        //缓存下 
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 2000,
          success: function (ress) {
            console.log('成功加载动画');
          }
        })

        console.log(res)
        that.setData({
          imageList: res.tempFilePaths,
        })
        //获取第一张图片地址 
        var filep = res.tempFilePaths[0]
        //向服务器端上传图片 
        // getApp().data.servsers,这是在app.js文件里定义的后端服务器地址 
        // wx.uploadFile({
        //   url: getApp().data.servsers + '/weixin/wx_upload.do',
        //   filePath: filep,
        //   name: 'file',
        //   formData: {
        //     'user': 'test'
        //   },
        //   success: function (res) {
        //     console.log(res)
        //     console.log(res.data)
        //     var sss = JSON.parse(res.data)
        //     var dizhi = sss.dizhi;
        //     //输出图片地址 
        //     console.log(dizhi);
        //     that.setData({
        //       "dizhi": dizhi
        //     })

        //     //do something  
        //   }, fail: function (err) {
        //     console.log(err)
        //   }
        // });
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({

      current: current,
      urls: this.data.imageList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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