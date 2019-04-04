var app = getApp();
var siteRoots = app.data.siteroot;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    min: 5,//最少字数
    max: 520, //最多字数 
    texts: "至少5个字",
    uploadPics: [],//阿里云返回追评照片
    pics1: [],
    count1: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    tempFilePaths: '',
    currentInput: '',//追评显示内容
    idcIds:'',
    icon: '对评论进行补充吧，更客观，更全面~',
  },


  //提交追加评价
  formSubmit1: function (e) {
    var that = this;
    console.log('sssssssssssssssssss')
    console.log(this.data.idcIds)
    console.log(this.data.currentInput)
    console.log(this.data.uploadPics)
    console.log('sssssssssssssssssss')
    wx.request({
      data: {
        orderIds: that.data.idcIds,
        remark: that.data.currentInput,
        imageUrl: that.data.uploadPics
      },
      'url': siteRoots + "/figo/orderrecord/viewData",
      success: function (res) {
        console.log(res)
      },
    });
    wx.navigateBack()    
    // wx.redirectTo({
    //   url: '../index',
    // })
  },

  input: function (e) {
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
        // console.log(detail)    
      }
    })
  },



  // 追评图片上传
  chooseImage: function (e) {
    var that = this;
    var uploadPics = that.data.uploadPics;
    if (uploadPics.length >= 4) {
      that.setData({
        lenMore: 1
      });
      setTimeout(function () {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({
      count: 4, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: siteRoots + "/figo/upload",
            filePath: tempFilePaths[i],
            name: 'file',
            success: function (res) {
              var imgs = JSON.parse(res.data);
              console.log('/figo/upload===========imgs', imgs)
              uploadPics.push(imgs[0]);
              that.setData({
                uploadPics: uploadPics
              });
              console.log('/figo/upload===========uploadPics', that.data.uploadPics)
            }
          })
        }
      }
    });
  },


  // 追评删除图片
  removeImage: function (e) {
    var uploadPics = this.data.uploadPics;
    console.log("uploadPics", uploadPics)
    console.log(e)
    // var pics = this.data.pics;
    var key = e.currentTarget.dataset.key;
    console.log("评论key", key)
    // uploadPics.splice(key, 1);
    wx.request({
      url: siteRoots + "/figo/upload/delete",
      data: {
        key: key
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res)
      },
      fail: function (res) { },
      complete: function (res) { },
    })

    var index = e.currentTarget.dataset.index;
    uploadPics.splice(index, 1);
    this.setData({
      uploadPics: uploadPics
    });
  },


  // 追评图片预览
  previewImage: function (e) {
    var that=this;
    console.log(e)
    var current = e.target.dataset.src
    console.log(current)
    var uploadPics=that.data.uploadPics
    console.log(uploadPics)
    var url=[];
    for (var i=0 ; i < uploadPics.length; i++ ){
      url.push(uploadPics[i].url)
    }
    console.log(url)
    wx.previewImage({
      current: current,
      urls: url
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var idcIds = null;
    console.log(options);
    idcIds = options.id;
    console.log('接收ids', idcIds);
   
    //初始数据
    that.setData(
      {
        idcIds: idcIds,
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