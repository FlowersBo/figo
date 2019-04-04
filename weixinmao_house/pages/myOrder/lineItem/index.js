// weixinmao_house/pages/myOrder/lineItem/index.js
var app = getApp();
var siteRoots = app.data.siteroot;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    siteRoots:'',
    lineItemStatus:'',//状态
    lineorderStatusInfo:'',//订单状态描述
    lineItemList: null,//总数据
    lineItemStatusname:'',//状态
    lineItemListCustom: '',//用户
    lineItemListPile: '', //充电桩型号
    lineItemListCarmodel: '',//车辆信息
    pics: [],//页面照片
    uploadPics: [],//阿里云返回评价照片
    // uploadPicss : [],//阿里云返回追评照片
    surveyFileList:'',//图片
    orderInfo:'',//创单时间
    survey:'',//状态时间
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    isShow: true,
    pics1:[],
    count1: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    isShow1: true,
    addTo:true,
    showView: true,
    consultPhone:'40012364521',//咨询电话
    // count: 9,
    imageList: [],
    imageList1: [],
    texts: "至少5个字",
    text: "至少5个字",
    min: 5,//最少字数
    max: 520, //最多字数 
    currentInput: '',//评论显示内容
    // currentInputs: '',//追评显示内容
    stars: [0, 1, 2, 3, 4],
    normalSrc: '/weixinmao_house/resource/images/typeface/star_off.png',
    selectedSrc: '/weixinmao_house/resource/images/typeface/star_on.png',
    halfSrc: '/weixinmao_house/resource/images/typeface/star_half.png',
    key: 0,//安装速度评分
    key1: 0,//服务态度评分
    key2: 0,//施工质量评分
    key3: 0,//收费合理评分
    scs1: '',//安装速度追评
    scs2: '',//服务态度追评
    scs3: '',//施工质量追评
    scs4: '',//收费合理追评
    tempFilePaths: '',
    tempFilePathss: '',
    idcIds: null,
    icon: '留下评论，帮助更多人',//input中的提示字
  },
 
  // addTosubmit:function(){
  //   var that=this
  //   that.setData({
  //     addTo: (!that.data.addTo),
  //     isShow1: (!that.data.isShow1)
  //   })
  // },
  //跳转追评
  toEvaluate:function(){
    var idcIds = this.data.idcIds;
    console.log(idcIds)
    wx.navigateTo({
      url: './evaluate/index?id=' + idcIds,
    })
  },
   //提交评价
  formSubmit: function (e) {
    var that = this;
    that.setData({
      showView: (!that.data.showView),
    })
    console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq')
    console.log(this.data.key, this.data.key1, this.data.key2, this.data.key3)
    console.log(this.data.currentInput)
    console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq')
    console.log(that.data.uploadPics)
    wx.request({
      data: {
        orderIds: that.data.idcIds,
        speed: that.data.key,
        service: that.data.key1,
        quality: that.data.key2,
        price: that.data.key3,
        remark: that.data.currentInput,
        imageUrl: that.data.uploadPics
      },
      'url': siteRoots + "/figo/buildconfirm/addScoreFromWX/",
      success: function (res) {
       console.log(res)
      },
    });
  },

  //提交追加评价
  // formSubmit1: function (e) {
  //   var that = this;
  //   that.setData({
  //     addTo: (!that.data.addTo),
  //     isShow1: (!that.data.isShow1)  
  //   })
  //   console.log('sssssssssssssssssss')
  //   console.log(this.data.currentInputs)
  //   console.log('sssssssssssssssssss')
  //   wx.request({
  //     data: {
  //       remark2: that.data.currentInputs
  //     },
  //     'url': siteRoots + "/figo/orderrecord/viewData/",
  //     success: function (res) {
  //       console.log(res)
  //     },
  //   });
  // },
  // 追加评价星星逻辑
  starClasses: function (key) {
    var score = key
    console.log(score)
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
      scs1: scs
    });
  },
  starClasses1: function (key1) {
    var score =key1
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
      scs2: scs
    });
  },
  starClasses2: function (key2) {
    var score = key2
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
      scs3: scs
    });
  },
  starClasses3: function (key3) {
    var score = key3
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
      scs4: scs
    });
  },


  //场勘/施工评星
  starClasses4: function (key4) {
    var score = key4
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
      scs5: scs
    });
  },
  starClasses5: function (key5) {
    console.log(key5)
    var score = key5
    var scoreInteger = Math.floor(score)
    var scs = []
    console.log(score)
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
      scs6: scs
    });
  },

  //计算单价
  calculateMoney: function (orderMaterialsList) {
    var that=this;
    var sums=[];
    for (var i = 0; i < orderMaterialsList.length; i++){
      // orderMaterialsList[i].unitpricecurrent.splice(1,1,orderMaterialsList[i].count * orderMaterialsList[i].unitpricecurrent)
      orderMaterialsList[i].calculateMoney = parseFloat(orderMaterialsList[i].count * orderMaterialsList[i].unitpricecurrent)
      sums.push(orderMaterialsList[i])
    }
    that.setData({
      orderMaterialsList: sums
    })
   
    console.log(sums)
    that.totalPrice(sums)
  },



//订单总金额
  totalPrice: function (sums) {
    var sum = 0; 
    for (var i = 0; i < sums.length;i++){
      var b = parseFloat(sums[i].calculateMoney);
      sum+=b;
    }
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
    // 生命周期函数--监听页面加载
    isShow: (options.isShow == "true" ? true : false)
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
    // that.totalPrice();
    that.userItem(options.id);
    that.app = getApp();
  },

 

  // 上传图片
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
        // console.log('tempFilePaths=================', tempFilePaths)
        // // var pics = that.data.pics;
        // var uploadPics = that.data.uploadPics;
        for (var i = 0; i < tempFilePaths.length; i++) {
        //   if (uploadPics.length >= 4) {
        //     that.setData({
        //       uploadPics: uploadPics
        //     });
        //     return false;
        //   } else {
        //     uploadPics.push(tempFilePaths[i]);
        //   }
          wx.uploadFile({
            url: siteRoots + "/figo/upload",
            filePath: tempFilePaths[i],
            name: 'file',
            success: function(res) {
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
        // that.setData({
        //   pics: pics
        // });
      }
    });
  },

  // 评论删除图片
  removeImage: function(e) {
    var uploadPics = this.data.uploadPics;
    console.log("uploadPics", uploadPics)
    console.log(e)
    // var pics = this.data.pics;
    var key = e.currentTarget.dataset.key;
    console.log("评论key", key)
    // uploadPics.splice(key, 1);
    wx.request({
      url: siteRoots + "/figo/upload/delete",
      data:{
        key:key
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })

    var index = e.currentTarget.dataset.index;
    uploadPics.splice(index, 1);
    this.setData({
      uploadPics: uploadPics
    });
  },

  // 评价图片预览
  previewImage: function (e) {
    var that = this;
    var current = e.target.dataset.src
    console.log(current)
    var uploadPics = that.data.uploadPics
    console.log(uploadPics)
    var url = [];
    for (var i = 0; i < uploadPics.length; i++) {
      url.push(uploadPics[i].url)
    }
    console.log(url)
    wx.previewImage({
      current: current,
      urls: url
    })
  },






  // 追评图片上传
  // chooseImage1: function (e) {
  //   var that = this;
  //   var pics1 = this.data.pics1;
  //   if (pics1.length >= 9) {
  //     this.setData({
  //       lenMore1: 1
  //     });
  //     setTimeout(function () {
  //       that.setData({
  //         lenMore1: 0
  //       });
  //     }, 2500);
  //     return false;
  //   }
  //   wx.chooseImage({
  //     // count: 1, // 默认9
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //     success: function (res) {
  //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //       var tempFilePathss = res.tempFilePaths;
  //       var pics1 = that.data.pics1;
  //       for (var i = 0; i < tempFilePathss.length; i++) {
  //         if (pics1.length >= 9) {
  //           that.setData({
  //             pics1: pics1
  //           });
  //           return false;
  //         } else {
  //           pics1.push(tempFilePathss[i]);
  //         }
  //         wx.uploadFile({
  //           url: siteRoots + "/figo/upload",
  //           filePath: tempFilePathss[i],
  //           name: 'file',
  //           success(res) {
  //             that.data.uploadPicss.push(detail);
  //           }
  //         })
  //       }
  //       that.setData({
  //         pics1: pics1
  //       });
  //     }
  //   });
  // },
  
  // 追评删除图片
  // removeImage1: function (e) {
  //   var pics1 = this.data.pics1;
  //   var index = e.currentTarget.dataset.index;
  //   pics1.splice(index, 1);
  //   this.setData({
  //     pics1: pics1
  //   });
  // },
 
  
  // 追评图片预览
  // previewImage1: function (e) {
  //   var current1 = e.target.dataset.src
  //   wx.previewImage({
  //     current: current1,
  //     urls: this.data.pics1
  //   })
  // },

  //拿数据
  userItem: function (idcIds) {
    var that = this;
    var userinfo = app.data.userinfo.data
    var mobile = userinfo.mobile
    console.log(userinfo)
    var _query_wxUserIds = userinfo.ids
    var figo_token_id = userinfo.token
    wx.request({
      data: {
        figo_token_id: figo_token_id,
        orderIds: idcIds,
        pageNumber: 1, pageSize: 10, recomend: true
      },
      'url': siteRoots + "/figo/orderrecord/viewData",
      success: function (res) {
       console.log('全部的数据++++++++++++==========',res)
        var detail = res.data.data;
        var code = res.data.code;
        console.log('figo/orderrecord/viewData=========code', code)
        console.log('figo/orderrecord/viewData=========detail', detail)
        if (res.data && detail && code == 0) {
          that.setData({
            lineItemList: detail,
            lineorderStatusInfo: detail.orderStatusInfo,
            lineItemListCustom: detail.custom,//用户
            lineItemListPile: detail.pile,//安装
            lineItemListCarmodel: detail.carmodel,//车辆信息
            lineItemStatusname: detail.statusName,//拿状态翻译
            lineItemStatus: detail.orderInfo.status,//拿状态
            lineItemStatbuildUser: detail.buildWorker,//施工监理
            lineItemStatdesignUser: detail.surveyDesignUser,//场勘员
            orderMaterialsList: detail.orderMaterialsList,//材料清单
            surveyFileList: detail.surveyFileList,//图片
            orderInfo: detail.orderInfo,//创单时间
            survey: detail.survey//状态时间
          })  
          that.calculateMoney(detail.orderMaterialsList)  //材料钱    

          if (detail.buildWorker!=null) {
            var key4 = detail.buildWorker.status
            that.starClasses5(key4);
          }
          if (detail.surveyDesignUser!=null){
            var key5 = detail.surveyDesignUser.status
            that.starClasses4(key5);
          }
        } 
      },
    });
  },
  //拿当前页面数据
  // lineItem: function(list){
  //   var that=this;
  //   var idcIds = that.data.idcIds;
  //   var ids=[];
  //   for(var i=0; i<list.length; i++){
  //     // ids.push(list[i].ids);
  //     if (idcIds === list[i].ids){
  //       that.setData({
  //         lineItemList:list[i],
  //         lineItemStatusname:list[i].statusname,//拿状态
  //      })
  //     }
  //     console.log(that.data.lineItemStatusname)
  //   }
  //   console.log(that.data.lineItemList)
  // },


  // 点击照片放大
  addPic: function () {
    var _this = this;
    var imgss = [];
    wx.chooseImage({
      count: 9, // 默认9
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
    console.log(that.data.surveyFileList);
    var surveyFileList = that.data.surveyFileList;
    var surveyFileListArry=[];
    for (var i = 0; i < surveyFileList.length;i++){
      surveyFileListArry.push(surveyFileList[i].url);
    }
    wx.previewImage({
      current: e.currentTarget.dataset.src.url,     //当前图片地址
      urls: surveyFileListArry,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //评论
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
        console.log(detail)
      }
    })
  },

  //追评
  // inputs: function (e) {
  //   // 获取输入框的内容
  //   var value = e.detail.value;
  //   // 获取输入框内容的长度
  //   var len = parseInt(value.length);
  //   //最少字数限制
  //   if (len <= this.data.min)
  //     this.setData({
  //       text: "加油，马上五个字了！"
  //     })
  //   else if (len > this.data.min)
  //     this.setData({
  //       text: " "
  //     })

  //   //最多字数限制
  //   if (len > this.data.max) return;
  //   // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
  //   this.setData({
  //     currentInputs: value,
  //     currentWordNumbers: len, //当前字数  
  //   });
  //   console.log(this.data.currentInputs)
  //   try {
  //     wx.setStorageSync('currentInputs', value)
  //   } catch (e) { }
  //   wx.getStorage({
  //     key: 'currentInputs',
  //     success(res) {
  //       console.log(detail)
  //     }
  //   })
  // },


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
    this.starClasses(key)
  },
  //点击左边,整颗星
  selectRight: function (e) {
    var key = e.currentTarget.dataset.key
    console.log("key得" + key + "分")
    this.setData({
      key: key
    })
    this.starClasses(key)
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
    this.starClasses1(key1)
  },
  //点击左边,整颗星
  selectRight1: function (e) {
    var key1 = e.currentTarget.dataset.key
    console.log("key1得" + key1 + "分")
    this.setData({
      key1: key1
    })
    this.starClasses1(key1)
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
    this.starClasses2(key2)
  },
  //点击左边,整颗星
  selectRight2: function (e) {
    var key2 = e.currentTarget.dataset.key
    console.log("key2得" + key2 + "分")
    this.setData({
      key2: key2
    })
    this.starClasses2(key2)
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
    this.starClasses3(key3)
  },
  //点击左边,整颗星
  selectRight3: function (e) {
    var key3 = e.currentTarget.dataset.key
    console.log("key3得" + key3 + "分")
    this.setData({
      key3: key3
    })
    this.starClasses3(key3)
  },

 

  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
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