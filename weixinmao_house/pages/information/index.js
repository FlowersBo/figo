// var AreaData = require("../utils/citys.js");
var app = getApp();
var siteRoots = app.data.siteroot;
Page({
  data: {
    isShow:true,
    figo_token_id:'',
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    index: 0, //选择的下拉列 表下标,
    isfang: false,
    newcar:'',//是否为新车
    animationData: null,
    date: '--请选择--',           //购车时间
    dates: '--请选择--',          //是否新车
    region: ['省', '市', '区'],   //联系地址
    regions: '',                 //联系地址
    brand: '',
    model: '',
    oldnew: '',
    buyer_name: '',                                                 //姓名
    buyer_phone: '',                                                //联系电话
    addressName: '',                                                //详细地址
    buyer_brand: '',                                                 //品牌
    buyer_model: '',                                                 //型号
  },

  //是否新车
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show,
      selectData: ['是', '否'],
    });
  },
  // 点击下拉列表
  optionTap(e) {
    console.log(e)
    console.log(e.currentTarget.dataset.name)
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let newcar = e.currentTarget.dataset.name; //获取点击后是否为新车
    this.setData({
      index: Index,
      newcar: newcar,
      show: !this.data.show,
    });
  },

  //购车时间
  bindDateChange: function (e) {
    var isfang = !isfang;
    //创建动画
    var animation = wx.createAnimation({
      timingFunction: "ease",
    })
    var date = this.data.date;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  //联系地址
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var a = e.detail.value[0]
    var b = e.detail.value[1]
    var c = e.detail.value[2]
    var regions=a+'/'+b+'/'+c
    this.setData({
      region: e.detail.value,
      regions: regions
    })
    console.log(this.data.regions)
  },

  //车辆品牌
  buyer_brand(event) {
    console.log('buyer_brand:', event);
    this.setData({ buyer_brand: event.detail.value });
  },

  //型号
  buyer_model(event) {
    console.log('buyer_model:', event);
    this.setData({ buyer_model: event.detail.value });
  },

  //姓名
  bindNameInput(event) {
    console.log('nameInput:', event);
    this.setData({ buyer_name: event.detail.value });
  },

  //联系电话
  bindPhoneNumInput(event) {
    console.log('phoneNum:', event);
    this.setData({
       buyer_phone: event.detail.value 
      });
  },



  // 个人信息
  indexFoc: function (e) {
    var that = this;
    var userinfo = app.data.userinfo.data
    var figo_token_id = userinfo.token
    console.log('userinfo.token', userinfo.token)
    that.setData({
      figo_token_id: figo_token_id
    })
  },

  //获取填写数据
  message: function () {
    var that = this;
    wx.request({
      data: {
        figo_token_id: that.data.figo_token_id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      url: siteRoots + "/figo/orderrecord/viewFromWX",
      success: function (res) {
        console.log('拿到填写数据', res)
        var message=res.data.data;
        if(res.data){
          console.log('444444444', message.addrArea)
          if (message.addrArea == null || message.addrArea ==''){
            that.setData({
              region: ['省', '市', '区'], 
            })
          }else{
            that.setData({
              region: message.addrArea,
              isShow:false
            })
          }
          if (message.isNewCar == null || message.isNewCar == '--请选择--') {
            that.setData({
              selectData: '',
            })
          } else {
            that.setData({
              selectData: message.isNewCar,
            })
          }
          that.setData({
            buyer_name: message.name,                                                 //姓名
            buyer_phone: message.mobile,                                                //联系电话
            addressName: message.addrArea,                                                //联系地址
            date: message.buyTime,                                                       //购车时间   
            detail_address: message.addrDetail,                                              //详细地址
            buyer_brand: message.carbrand,                                                 //品牌
            buyer_model: message.carModel,                                                  //型号  
            isNewCar: message.isNewCar,                                                     //是否新车     
            addrArea: message.addrArea,                                              
            orderIds: message.orderIds,                                                   
            customIds: message.customIds
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.indexFoc()
    this.message()
  },
  

  //详细地址
  bindDetailAddress(event) {
    console.log('detail_address:', event);
    this.setData({
       detail_address: event.detail.value 
       });
  },

  
  //重置按钮
  bindCancelButton() {
    this.setData({
      buyer_name: '',                                                 //姓名
      buyer_phone: '',                                                //联系电话
      addressName: '',                                                //详细地址
      selectData: '',
      date:'--请选择--',
      region: ['省', '市', '区'],
      detail_address:'',                                              //详细地址
      buyer_brand:'',                                                 //品牌
      buyer_model:'',                                                 //型号  
    })
  },

  //提交按钮
  bindSaveButton(e) {
    var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    let that = this;
    if (!that.data.buyer_brand) {
      wx.showModal({
        title: '提示',
        content: '请填写车辆品牌',
      })
    } else if (!that.data.buyer_model) {
      wx.showModal({
        title: '提示',
        content: '请填写车辆型号',
      })
    } 
    else if (that.data.date == '--请选择--') {
      wx.showModal({
        title: '提示',
        content: '请选择购车时间',
      })
    } else if (that.data.isNewCar == null && that.data.newcar == '' && that.data.newcar == '--请选择--') {
      wx.showModal({
        title: '提示',
        content: '请选择是否为新车',
      })
    }else if (!that.data.buyer_name) {
      wx.showModal({
        title: '提示',
        content: '请填写姓名',
      })
    }else if (!that.data.buyer_name) {
      wx.showModal({
        title: '提示',
        content: '请填写姓名',
      })
    }else if (!this.data.buyer_phone) {
      wx.showModal({
        title: '提示',
        content: '请填写联系电话',
      })
    }else if (!reg.test(that.data.buyer_phone)) {
      wx.showToast({
        title: '手机号码有误',
        duration: 2000,
        icon: 'none'
      });
      return false;
    } else if (that.data.region == '' && that.data.addressName == null && that.data.region[0] == '省' && that.data.region[1] == '市' && that.data.region[2] == '区') {
      wx.showModal({
        title: '提示',
        content: '请填写联系地址',
      })
    } else if (!that.data.detail_address) {
      wx.showModal({
        title: '提示',
        content: '请填写详细地址',
      })
    }else {
      if (that.data.type == 0) {
        console.log('请求保存接口');
      }

      if (that.data.type == 1) {
        console.log('请求地址更新接口');
      }
      var isNewCar = ''; //是否新车
      var addrArea = ''; //城市选择
      if (that.data.newcar != '') {
        isNewCar = that.data.newcar;
        
      }else{
        isNewCar = that.data.isNewCar;
      }
      
      if (that.data.regions != '' ){
        addrArea = that.data.regions;
      }else{
        var addrArea = that.data.addrArea;
        console.log('后台返回的城市选择', addrArea)
        var a = addrArea[0]
        var b = addrArea[1]
        var c = addrArea[2]
        var region = a + '/' + b + '/' + c;
        console.log('拼接好的region',region)
        addrArea = region;
      }

      console.log('1111111111111111111', that.data.isNewCar)
      console.log('12222222222222222222', that.data.newcar)
      console.log('333333333333333333333', that.data.addrArea)
      console.log('444444444444444444', that.data.regions)
      console.log(isNewCar)
      console.log(addrArea)
     
        wx.showModal({
          title: '提示',
          content: '确认提交吗',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.request({
                data: {
                  orderIds: that.data.orderIds,
                  customIds: that.data.customIds,
                  figo_token_id: that.data.figo_token_id,
                  pageNumber: 1, pageSize: 10, recomend: true,
                  buyTime: that.data.date,                                             //购车时间
                  isNewCar: isNewCar,                                                  //是否新车
                  addrArea: addrArea,                                                  //联系地址
                  name: that.data.buyer_name,                                          //姓名
                  mobile: that.data.buyer_phone,                                       //联系电话
                  addrDetail: that.data.detail_address,                                //详细地址
                  carbrand: that.data.buyer_brand,                                     //品牌
                  carModel: that.data.buyer_model,                                     //型号
                },
                'url': siteRoots + "/figo/orderrecord/addFromWX",
                success: function (res) {
                  console.log(111111111111111111111)
                  console.log(res.data)
                  console.log(222222222222222222222)
                },
              });
              wx.navigateBack();
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      // wx.navigateBack();
      // wx.navigateTo({
      //   url: "/weixinmao_house/pages/myOrder/index"
      // })
    }
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

  },
})