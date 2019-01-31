// weixinmao_house/pages/ceshi/index.js
// var AreaData = require("../utils/citys.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isfang:false,
    animationData: null,
    date: '--请选择--',
    region: ['省', '市', '区'],
    brand: '',
    model: '',
    oldnew: '',
    selectArray: [{
      "id": "1",
      "text": "teslaX"
    }, {
      "id": "2",
      "text": "teslaL"
    }],
    selectArray1: [{
      "id": "1",
      "text": "买车赠送的充电桩"
    }, {
      "id": "2",
      "text": "自己购买的充电桩"
    }],
    selectArray2: [{
      "id": "1",
      "text": "2018年11月1日"
    }, {
      "id": "2",
      "text": "2018年12月1日"
    }],
    selectArray3: [{
      "id": "1",
      "text": "是"
    }, {
      "id": "2",
      "text": "否"
    }],
    buyer_name: '',                                                 //姓名
    buyer_phone: '',                                                //联系电话
    // detail_address: '',                                             //联系地址
    addressName: '',                                                //详细地址
    // provId: '',                                                     //省ID
    // cityId: '',                                                     //市ID
    // areaId: '',                                                     //区ID
    // showPickerView: false,                                          //控制省市区三级联动显隐
    // value: [0, 0, 0],
    // tempValue: [0, 0, 0],
    // provArr: AreaData.result,                                       //省数组
    // cityArr: AreaData.result[0].city,                               //市数组
    // areaArr: AreaData.result[0].city[0].area,                       //区数组
    // type: '',
    // saveAddressData: { "address": "", "addressdDetail":"","buyerPhone":"","city":"","name":"","province":"","region":""}
  },

  // 用户信息展示
  userInfoShow: function (e) {
    var that = this;
    console.log('00000000000000');
    console.log(app.data);
    if (app.data.userinfo == null) {
      wx.showToast({
        title: "为了您更好的体验,请先点击我的下方登录同意授权",
        icon: 'none',
        duration: 2000
      })
      wx.navigateTo({
        url: '/weixinmao_house/pages/wxlogin/index',
      })
    }
    else {
      console.log('我的，获取全局登录信息', app.data);
      console.log('我的，获取全局登录信息', app.data.userinfo);
      console.log('我的，获取全局登录信息', app.data.userinfo.avatar);
      that.setData({
        avatarUrl: app.data.userinfo.avatar,
        nickName: app.data.userinfo.nickname,
        figoToken: app.data.userinfo.token,
      });
      console.log(this.data.figoToken)
      console.log(this.data.avatarUrl)
    }
  },

  bindDateChange: function (e) {
    var isfang = !isfang;
    //创建动画
    var animation = wx.createAnimation({
      timingFunction: "ease",
    })
    var date=this.data.date;
    // if (isfang){
    //   animation.rotate(180).step();
    //   this.setData({
    //     animationData: animation.export(),
    //     isfang: isfang
    //   })
    // }else{
    //   animation.rotate(360).step();
    //   this.setData({
    //     animationData: animation.export()
    //   })
    // }
    // console.log(isfang)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  bindRegionChange: function (e) {
    
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
    console.log(this.data.region)
  },

  //车辆品牌
  getbrand: function (e) {
    var brand = e.detail
    this.setData({
      brand:brand
    })
    console.log(brand)
  },
  //型号
  getmodel: function (e) {
    var model = e.detail
    this.setData({
      model: model
    })
    console.log(model)
  },
  //是否新车
  getoldnew: function (e) {
    var oldnew = e.detail
    this.setData({
      oldnew: oldnew
    })
    console.log(oldnew)
  },
  // 遮罩层点透处理
  // noTouch: function () {
  //   return;
  // }, 


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.userInfoShow()
    // let that = this;
    // let saveAddressData = that.data.saveAddressData;
    // console.log(saveAddressData)
    // that.saveAddressData(saveAddressData);
  },

  // saveAddressData(addressData) {
  //   let ProvArr = AreaData.result;
  //   let valArr = [];
  //   // 遍历省数组
  //   for (let i = 0; i < ProvArr.length; i++) {
  //     // console.log(ProvArr[i].id); 
  //     // 找到省对应的id
  //     if (ProvArr[i].id == addressData.province) {
  //       //提取对应省名
  //       let provName = ProvArr[i].name;
  //       // 提取对应省名在数组中对应的id
  //       valArr.push(i);
  //       // 提取对应省名下的城市数组
  //       let cityArr = ProvArr[i].city;
  //       console.log('provName:', provName);
  //       console.log('valArr:', valArr);
  //       // 遍历对应省名下的城市数组
  //       for (let j = 0; j < ProvArr[i].city.length; j++) {
  //         //console.log("cityId", ProvArr[i].city[j].id);
  //         // 找到市对应的id
  //         if (ProvArr[i].city[j].id == addressData.city) {
  //           // 提取对应市名
  //           let cityName = ProvArr[i].city[j].name;
  //           // 提取对应市名在数组中对应的id
  //           valArr.push(j);
  //           // 提取对应市名下的区数组
  //           let areaArr = ProvArr[i].city[j].area;
  //           console.log('cityName:', cityName);
  //           console.log('valArr:', valArr);
  //           // 遍历对应市名下的区数组
  //           for (let k = 0; k < ProvArr[i].city[j].area.length; k++) {
  //             //console.log('areaId', ProvArr[i].city[j].area[k].id);
  //             // 找到区对应的id
  //             if (ProvArr[i].city[j].area[k].id == addressData.region) {
  //               // 提取对应区名
  //               let areaName = ProvArr[i].city[j].area[k].name;
  //               // 提取对应区名在数组中对应的id
  //               valArr.push(k);
  //               console.log('areaName:', areaName);
  //               console.log('valArr:', valArr);
  //               let addressName = provName + cityName + areaName;
  //               this.setData({
  //                 buyer_name: addressData.name,
  //                 buyer_phone: addressData.buyerPhone,
  //                 detail_address: addressData.address,
  //                 addressName: addressName,
  //                 value: valArr,
  //                 cityArr: cityArr,
  //                 areaArr: areaArr,
  //                 provId: addressData.province,
  //                 cityId: addressData.city,
  //                 areaId: addressData.region,
                
  //               })
  //             }
  //           }
  //         }
  //       }

  //     }
  //   }
  // },

  //姓名
  bindNameInput(event) {
    console.log('nameInput:', event);
    this.setData({ buyer_name: event.detail.value });
  },

  //联系电话
  bindPhoneNumInput(event) {
    console.log('phoneNum:', event);
    this.setData({ buyer_phone: event.detail.value });
    this.setData({
      oldnew:''
    })
  },

  //详细地址
  bindDetailAddress(event) {
    console.log('detail_address:', event);
    this.setData({ detail_address: event.detail.value });
   
  },

  // //三级联动触发方法
  // bindChange: function (e) {
  //   let val = e.detail.value
  //   if (val[0] != this.data.tempValue[0]) {
  //     val = [val[0], 0, 0]
  //   }
  //   if (val[1] != this.data.tempValue[1]) {
  //     val = [val[0], val[1], 0]
  //   }
  //   console.log('bindChange:', val);
  //   this.setData({
  //     tempValue: val,
  //     value: val,
  //     cityArr: AreaData.result[val[0]].city,
  //     areaArr: AreaData.result[val[0]].city[val[1]].area,
  //   })
  // },

  // //打开省市区三级联动
  // openPickerView() {
  //   this.setData({ showPickerView: true });
  // },
  // //关闭省市区三级联动
  // closePickerView() {
  //   this.setData({ showPickerView: false });
  // },

  //省市区三级联动确定
  // confirmPickerView() {
  //   let val = this.data.value;
  //   let provName = AreaData.result[val[0]].name;
  //   let cityName = AreaData.result[val[0]].city[val[1]].name;
  //   let areaName = AreaData.result[val[0]].city[val[1]].area[val[2]].name;
  //   let addressName ="\xa0\xa0\xa0" + provName+ "、" + cityName+ "、" + areaName;
  //   console.log(addressName)
  //   let provId = AreaData.result[val[0]].id;
  //   let cityId = AreaData.result[val[0]].city[val[1]].id;
  //   let areaId = AreaData.result[val[0]].city[val[1]].area[val[2]].id;
  //   this.setData({
  //     addressName: addressName,
  //     provId: provId,
  //     cityId: cityId,
  //     areaId: areaId,
  //     showPickerView: false,
  //   })
  // },

  getPhoneNumber: function (e) {
   
  },
  //重置按钮
  bindCancelButton() {
    wx.navigateBack();
  },

  //提交按钮
  bindSaveButton(e) {
    console.log(e)
    var reg = new RegExp('^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8}$');
    let that = this;
    if (!that.data.buyer_name) {
      wx.showModal({
        title: '提示',
        content: '请填写姓名',
      })
    } else if (!this.data.buyer_phone) {
      wx.showModal({
        title: '提示',
        content: '请填写联系电话',
      })
    } else if (!(reg.test(this.data.buyer_phone))) {
      wx.showToast({
        title: '手机号码有误',
        duration: 2000,
        icon: 'none'
      });
      return false;
    } else if (that.data.region[0] == '全部' && that.data.region[1] == '全部' && that.data.region[2] == '全部') {
      wx.showModal({
        title: '提示',
        content: '请填写联系地址',
      })
    }else if (!that.data.detail_address) {
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
      // console.log(e)
      // console.log(e.detail.errMsg)
      // console.log(e.detail.iv)
      // console.log(e.detail.encryptedData)
      // if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      //   wx.showModal({
      //     title: '提示',
      //     showCancel: false,
      //     content: '未授权',
      //     success: function (res) { }
      //   })
      // } else {
      //   wx.showModal({
      //     title: '提示',
      //     showCancel: false,
      //     content: '同意授权',
      //     success: function (res) { }
      //   })
      // }
      wx.navigateTo({
        url: "/weixinmao_house/pages/myOrder/index"
      })
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