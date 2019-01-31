// weixinmao_house/pages/myOrder/lineItem/index.js
var app = getApp();
var siteRoots = app.data.siteroot;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    informationName: "王五", //员工姓名
    informationPhonwe: "16666666666",//员工电话
    informationNumber: "CK9579",//员工工号
    informationTime: "123",//员工场堪总次数
    consultPhone:40012364521,//咨询电话
    orderStatus:"您的订单已预约场堪，与您预定的预约场堪时间为：2019年3月1日12时，请您务必保持电话畅通！",//订单状态内容
    count: 3,
    imageList: [],
    texts: "至少5个字",
    min: 5,//最少字数
    max: 520, //最多字数 (根据自己需求改变) 
    currentInput: '',
    stars: [0, 1, 2, 3, 4],
    normalSrc: '/weixinmao_house/resource/images/typeface/star_off.png',
    selectedSrc: '/weixinmao_house/resource/images/typeface/star_on.png',
    halfSrc: '/weixinmao_house/resource/images/typeface/star_half.png',
    key: 0,//安装进度评分
    key1: 0,//服务进度评分
    key2: 0,//施工质量评分
    key3: 0,//收费合理评分
    tempFilePaths: '',
    imgs:[
        '../../../resource/images/typeface/t1.jpg',
        '../../../resource/images/typeface/t2.jpg',
        '../../../resource/images/typeface/t3.jpg',
        '../../../resource/images/typeface/t4.jpg',
        '../../../resource/images/typeface/t4.jpg',
        '../../../resource/images/typeface/t4.jpg',
        '../../../resource/images/typeface/t4.jpg',
        '../../../resource/images/typeface/t4.jpg',
        '../../../resource/images/typeface/t4.jpg',
    ],
    imgss: [
      'http://www.wxapp-union.com/data/attachment/portal/201809/01/093248w9essxvr699pfe9f.png',
    ],
    lineItemList:null,
    idcIds:null,
    lisData:[
        { "index": "1", "A": "电缆", "B": "19米", "C": 78.0 },
        { "index": "2", "A": "卡扣", "B": "30个", "C": 60.0 },
        { "index": "3", "A": "服务（挖沟）", "B": "30米", "C": 1200.01 }
      ],
      score:2.6,
      
  },
  // 后台星星逻辑
  starClasses:function(e) {
    var score = this.data.score
    var scoreInteger = Math.floor(score)
    var scs = []
    // console.log(score)
    // 向scs添加on
    for (let i = 0; i < scoreInteger; i++) {
      scs.push('on')
    }
    // 向scs添加half
    if (score * 10 - scoreInteger * 10 >= 5) {
      scs.push('half')
    }
    // 向scs添加off
    while (scs.length < 5) {
      scs.push('off')
    }
    // console.log(scs)
    this.setData({
      scs: scs
    });
  },

//订单总金额
  totalPrice:function(e) {
    var a = this.data.lisData;
    var sum = 0; 
    for(var i=0; i<a.length;i++){
      var b = parseFloat(a[i].C);
      sum+=b;
    }
    // if (typeof a[i] == "object") {
    //   for (var key in a[i]) {
    //     console.log(value)
    //   }
    // }  
    // console.log(sum);
    this.setData({
      sum: sum
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var that = this;
    var idcIds=null;
    console.log(options);
    idcIds=options.id;
    console.log('接收ids',idcIds);
    //初始数据
    that.setData(
      {
        siteRoots: siteRoots,
        idcIds:idcIds,
      }
    );
    that.totalPrice();
    that.userItem(options.id);
    this.app = getApp();
  },


  userItem: function (idcIds) {
    var that = this;
    wx.request({
      'url': siteRoots + "/figo/order/list/"+ idcIds,
      success: function (res) {
        if (res.data) {
          // that.setData({
          //   lineItemList: res.data.list,
          // })
          var list = res.data.list;
         that.lineItem(list)
        }
      },
    });
  },
  //拿当前页面数据
  lineItem: function(list){
    var that=this;
    var idcIds = that.data.idcIds;
    var ids=[];
    for(var i=0; i<list.length; i++){
      // ids.push(list[i].ids);
      if (idcIds === list[i].ids){
        that.setData({
         lineItemList:list[i]
       })
      }
    }
    console.log(that.data.lineItemList)
  },


  // 点击照片放大
  addPic: function () {
    var _this = this;
    var imgss = [];
    wx.chooseImage({
      count: 4, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length; i++) {
          imgBox.push(tempFilePaths[i]);
        }
        _this.setData({
          imgBox: _this.data.imgss.concat(imgss)
        })
      }
    })
  },
  previewImg: function (e) {
    var that=this;
    console.log(e.currentTarget.dataset.src);
    console.log(that.data.imgss);
    // var index = e.currentTarget.dataset.index;
    // var imgArr = this.data.imgs;
    // var imgArrs = this.data.imgss;
    wx.previewImage({
      current: e.currentTarget.dataset.src,     //当前图片地址
      urls: that.data.imgss,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
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

  // 点星星
  //安装进度
  //点击右边,半颗星
  selectLeft: function (e) {
    var key = e.currentTarget.dataset.key
    if (this.data.key == 0.5 && e.currentTarget.dataset.key == 0.5) {
      //只有一颗星的时候,再次点击,变为0颗
      key = 0;
    }
    console.log("key得" + key + "分")
    this.setData({
      key: key
    })
  },
  //点击左边,整颗星
  selectRight: function (e) {
    var key = e.currentTarget.dataset.key
    console.log("key得" + key + "分")
    this.setData({
      key: key
    })
  },
  //服务进度
  //点击右边,半颗星
  selectLeft1: function (e) {
    var key1 = e.currentTarget.dataset.key
    if (this.data.key1 == 0.5 && e.currentTarget.dataset.key == 0.5) {
      //只有一颗星的时候,再次点击,变为0颗
      key1 = 0;
    }
    console.log("key1得" + key1 + "分")
    this.setData({
      key1: key1
    })
  },
  //点击左边,整颗星
  selectRight1: function (e) {
    var key1 = e.currentTarget.dataset.key
    console.log("key1得" + key1 + "分")
    this.setData({
      key1: key1
    })
  },
  //施工质量
  //点击右边,半颗星
  selectLeft2: function (e) {
    var key2 = e.currentTarget.dataset.key
    if (this.data.key2 == 0.5 && e.currentTarget.dataset.key == 0.5) {
      //只有一颗星的时候,再次点击,变为0颗
      key2 = 0;
    }
    console.log("key2得" + key2 + "分")
    this.setData({
      key2: key2
    })
  },
  //点击左边,整颗星
  selectRight2: function (e) {
    var key2 = e.currentTarget.dataset.key
    console.log("key2得" + key2 + "分")
    this.setData({
      key2: key2
    })
  },
  //收费合理
  //点击右边,半颗星
  selectLeft3: function (e) {
    var key3 = e.currentTarget.dataset.key
    if (this.data.key3 == 0.5 && e.currentTarget.dataset.key == 0.5) {
      //只有一颗星的时候,再次点击,变为0颗
      key = 0;
    }
    console.log("key3得" + key3 + "分")
    this.setData({
      key3: key3
    })
  },
  //点击左边,整颗星
  selectRight3: function (e) {
    var key3 = e.currentTarget.dataset.key
    console.log("key3得" + key3 + "分")
    this.setData({
      key3: key3
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

  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.starClasses();
    this.app.slideupshow(this, 'slide_up1', -200, 1)

    setTimeout(function () {
      this.app.sliderightshow(this, 'slide_up2', 0, 1)
    }.bind(this), 500);
    setTimeout(function () {
      this.app.sliderightshow(this, 'slide_up3', 0, 1)
    }.bind(this), 600);
    setTimeout(function () {
      this.app.sliderightshow(this, 'slide_up4', 0, 1)
    }.bind(this), 700);
    setTimeout(function () {
      this.app.sliderightshow(this, 'slide_up5', 0, 1)
    }.bind(this), 800);
    setTimeout(function () {
      this.app.sliderightshow(this, 'slide_up6', 0, 1)
    }.bind(this), 900);
    setTimeout(function () {
      this.app.sliderightshow(this, 'slide_up7', 0, 1)
    }.bind(this), 1000);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //还原动画
    this.app.slideupshow(this, 'slide_up1', 200, 0)
    //瀑布流的效果
    setTimeout(function () {
      this.app.sliderightshow(this, 'slide_up2', -375, 0)
    }.bind(this), 500);
    setTimeout(function() {
      this.app.sliderightshow(this, 'slide_up3', -375, 0)
      }.bind(this), 500);
    setTimeout(function () {
      this.app.sliderightshow(this, 'slide_up4', -375, 0)
    }.bind(this), 500);
    setTimeout(function () {
      this.app.sliderightshow(this, 'slide_up5', -375, 0)
    }.bind(this), 500);
    setTimeout(function () {
      this.app.sliderightshow(this, 'slide_up6', -375, 0)
    }.bind(this), 500);
    setTimeout(function () {
      this.app.sliderightshow(this, 'slide_up7', -375, 0)
    }.bind(this), 500);
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