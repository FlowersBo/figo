// list.js
var app = getApp();
Page({
  data: {
    city: wx.getStorageSync('companyinfo').city,
    isCars: true,	// 选择车源开关
    isSort: true,	// 选择排序开关
    isPrice: true,	// 选择价格开关
    isType: true,
    loadMore: '',
    list: [],
    house_list: [],
    housetypelist: [],
    houseareaid: 0,
    housepriceid: 0,
    housetype: 0,
    page: 1
  },
  // 首屏渲染
  onLoad(params) {
    var that = this;

    // 机房等级
    var arealist = [
      { 'name': 't1', 'id': 1 },
      { 'name': 't2', 'id': 2 },
      { 'name': 't3', 'id': 3 },
      { 'name': 't4', 'id': 4 },
    ];

    // 机房面积
    var housepricelist = [
      { 'name': '0 - 500', 'id': 1 },
      { 'name': '500 - 2000', 'id': 2 },
      { 'name': '2000 - 5000', 'id': 3 },
      { 'name': '5000以上', 'id': 4 },
    ];
    // 机柜数量
    var housetypelist = [
      { 'name': '0 - 500', 'id': 1 },
      { 'name': '500 - 1000', 'id': 2 },
      { 'name': '1000 - 2000', 'id': 3 },
      { 'name': '2000以上', 'id': 4 },
    ];

    //  housetypelist.push(data);
    var typeid = 0;
    var carid = 0;
    var priceid = 0;
    this.setData({ arealist:arealist,housetypelist: housetypelist, housepricelist: housepricelist, typeid: typeid, carid: carid, priceid: priceid });
    wx.setNavigationBarTitle({
      title: 'idc机房',
    });





    app.util.request({
      'url': 'entry/wxapp/getinitinfo',
      success: function (res) {
        if (!res.data.message.errno) {
          that.setData({
            city: wx.getStorageSync('companyinfo').city,
            arealist: res.data.data.arealist,
            housepricelist: res.data.data.housepricelist,
            title: '',
            price: '',
            typetitle: ''
          })
        }
      }
    });





    app.util.request({
      'url': 'entry/wxapp/getnewhouselist',
      data: { page: that.data.page, houseareaid: that.data.houseareaid, housepriceid: that.data.housepriceid, housetype: that.data.housetype },
      success: function (res) {
        if (!res.data.message.errno) {
          that.setData({
            houselist: res.data.data,

          })
        }
      },
      complete: function () {

        wx.hideNavigationBarLoading(); //完成停止加载
        wx.stopPullDownRefresh();
      }
    });

  }, 
  gethouselist: function (e) {
    var that = this;
    app.util.request({
      'url': 'entry/wxapp/getnewhouselist',
      data: { page: that.data.page, houseareaid: that.data.houseareaid, housepriceid: that.data.housepriceid, housetype: that.data.housetype },
      success: function (res) {
        if (!res.data.message.errno) {
          that.setData({
            houselist: res.data.data,

          })
        }
      },
      complete: function () {
        that.setData({
          loadMore: ''
        })

      }
    });


  },


  //根据等级筛选
  selectcarsitem: function (e) {
    var carid = e.currentTarget.id;
    var title = e.currentTarget.dataset.title;

    this.setData({ carid: carid, isCars: true, title: title });
    this.data.houseareaid = carid;
    console.log('-------根据等级筛选---------');
    console.log('选择的等级是：', title);
    console.log('选择等级的id是：', carid);
  }
  ,


  //根据面积筛选
  selectpriceitem: function (e) {
    var priceid = e.currentTarget.id;
    var title = e.currentTarget.dataset.title;
    this.setData({ priceid: priceid, isPrice: true, price: title });
    this.data.housepriceid = priceid;
    console.log('-------根据面积筛选---------');
    console.log('选择的面积是：', title);
    console.log('选择面积的id是：', priceid);
  },



  // 根据机柜数量筛选

  selecttypeitem: function (e) {
    var typeid = e.currentTarget.id;
    var title = e.currentTarget.dataset.title;
    this.setData({ typeid: typeid, isType: true, typetitle: title });
    this.data.housetype = typeid;
    console.log('-------根据机柜数量筛选---------');
    console.log('选择的机柜数量是：', title);
    console.log('选择机柜数量的id是：', typeid);
  }
  ,


  // 选择排序方式
  selectCars: function (e) {
    var that = this;
    that.setData({
      isSort: true,
      isPrice: true,
      isType: true,
      isCars: (!that.data.isCars)
    })
  },
  selectPrice: function () {
    var that = this;
    that.setData({
      isSort: true,
      isCars: true,
      isType: true,
      isPrice: (!that.data.isPrice)
    })
  },
  selectType: function () {
    var that = this;
    that.setData({
      isSort: true,
      isCars: true,
      isPrice: true,
      isType: (!that.data.isType)
    })
  },
  selectSort: function () {
    var that = this;
    that.setData({
      isCars: true,
      isPrice: true,
      isType: true,
      isSort: (!that.data.isSort)
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.onLoad();
  },

})