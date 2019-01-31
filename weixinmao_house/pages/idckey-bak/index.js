var QQMapWX = require('../../resource/js/qqmap-wx-jssdk.js');
var app = getApp();
var siteRoots = app.data.siteroot;
var demo = new QQMapWX({
  key: 'KFXBZ-HUBEI-KCQG4-5ZEH4-5K2PK-DOFKE'
  // sn:'yfsU4bMshzhwrDXbUcwr2TDKogqIcwQF'
});

Page({
  data: {
    city: wx.getStorageSync('companyinfo').city,
    isCars: true, // 选择车源开关
    isSort: true, // 选择排序开关
    isPrice: true, // 选择价格开关
    isRank: true, // 选择等级开关
    isType: true,
    loadMore: '',
    list: [],
    house_list: [],
    housetypelist: [],
    houseareaid: 0,
    housepriceid: 0,
    housetype: 0,
    page: 1,
    idcList: [],
    idcLength: null,
    domIidcLength: null,
    siteRoots: '',
    latitude: '',
    longitude: '',
    latitudes: '',
    longitudes: '',
    defaultAd: '',
    defaultAdCode: '',
    newad: '',
    newadCode: '',
    pageNumber: 1,
    pageSize: 1,
    hasNextPage: true,
    totalPage: null,
    contentlist: null,
    list: null,
    cityAd: '110101',
    addresscode: 110101,
    userInput:null
  },
  onShow: function () { },


  // 首屏渲染
  onLoad(params) {
    var that = this;
    var levellist = [{
      'T1': 'T1',
    },
    {
      'T2': 'T2',
    },
    {
      'T3': 'T3',
    },
    {
      'T4': 'T4'
    }
    ];
    var arealist = [{
      'area_min': 0,
      'area_max': 100
    },
    {
      'area_min': 100,
      'area_max': 500
    },
    {
      'area_min': 500,
      'area_max': 1000
    },
    {
      'area_min': 1000,
      'area_max': 9999
    }
    ];
    var numList = [{
      'num_min': 0,
      'num_max': 500,
      'numId':1
    },
    {
      'num_min': 500,
      'num_max': 1000,
      'numId': 2
    },
    {
      'num_min': 1000,
      'num_max': 2000,
      'numId': 3
    },
    {
      'num_min': 2000,
      'num_max': 9999,
      'numId': 4
    }
    ];
    var housetypelist = [{
      'name': '100以下',
      'id': 1
    },
    {
      'name': '100-300',
      'id': 2
    },
    {
      'name': '300-500',
      'id': 3
    },
    {
      'name': '500以上',
      'id': 4
    }
    ];
    var typeid = 0;
    var carid = 0;
    var priceid = 0;
    this.setData({ housetypelist: housetypelist, arealis: arealist, typeid: typeid, carid: carid, priceid: priceid });


    wx.setNavigationBarTitle({
      title: 'IDC机房资源',
    });



    this.confirmTap();
    var citySel = app.data.citySel;
    var userInput = this.data.userInput;
    // var userInput="燕郊";
    console.log("app保存的当前city", app.data.citySel);
    console.log("app保存的当前用户数据userInput", app.data.userInput);
    if (citySel == null) {
      console.log("为空，自动通过经纬度获取");
      this.autoCity();
    } else {
      console.log("不为空，下一步获取IDC数据");
      this.setData({
        defaultAd: citySel,
        userInput: userInput,
        siteRoots: siteRoots
      });
      this.getIdcList(citySel, userInput);
    }
  },



  // 自动定位
  autoCity: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        demo.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
            var citySel = res.result.ad_info.city;
            var userInput = app.data.userInput;
            console.log("当前城市名称: " + res.result.ad_info.city);
            console.log("当前城市代码: " + res.result.ad_info.adcode);
            app.data.citySel = citySel;

            that.setData({
              defaultAd: citySel,
              siteRoots: siteRoots
            });
            that.getIdcList(citySel, userInput);

          },
          fail: function (res) {
            console.log('fail');
            console.log(res);
          }
        });
      },
      fail: function (res) {
        wx.showModal({
          title: '定位信息获取失败',
          content: '是否手动选择城市信息？',
        })
        console.log(res.msg);
      }
    })
  },

  // 根据城市信息获取idc
  getIdcList: function (userCity, userInput) {
    console.log('用户加载idc数据', userCity, userInput);
    var that = this;
    if (userCity == '全部') {
      userCity = '';
    };
    if (userInput == null) {
      userInput = '';
    };
    // idc机房请求
    wx.request({
      'url': siteRoots + '/wxapp/idc/list2',
      data: {
        // 降序排列
        orderMode: 'Desc',
        // 降序字段
        orderColunm: 'addressCode',
        _query_addressText: userCity,
        _query_title: userInput

      },
      success: function (res) {
        console.log("开始");
        console.log(res.data);
        if (res.data) {
          var idcLength = res.data.totalRow;
          that.setData({
            idcList: res.data.list,
            domIidcLength: idcLength
          })
        }
        console.log("结束");
      },
      complete: function () {
        // that.setData({
        //   loadMore: '数据加载完成'
        // })
        wx.stopPullDownRefresh();
      }
    });
  },

  // 地区筛选
  cityFilter: function (e) {
    wx.navigateTo({
      url: "/weixinmao_house/pages/citysel/index"
    })
  },

  // 获取搜索关键字
  confirmTap: function (event) {
    var citySel = app.data.citySel;
    var userInput = event.detail.value
    // console.log(event.detail.value);
    console.log('用户输入的信息是：', userInput);
    this.getIdcList(citySel, userInput);
  },


  doCall: function (e) {
    console.log(e.currentTarget);
    var tel = e.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: tel, //此号码并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })

  },
  // 详情页面
  toSailDetail: function (e) {
    var ids = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/weixinmao_house/pages/saledetail/index?ids=" + ids,
    })
  },
  toHouseDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/weixinmao_house/pages/saledetail/index?id=" + id
    })

  },
  toSearch: function (e) {
    wx.navigateTo({
      url: "/weixinmao_house/pages/search/index"
    })
  },
  selectcarsitem: function (e) {
    var carid = e.currentTarget.id;
    var title = e.currentTarget.dataset.title;

    this.setData({
      carid: carid,
      isCars: true,
      title: title
    });
    this.data.houseareaid = carid;
    this.gethouselist();
  },
  selectpriceitem: function (e) {
    var priceid = e.currentTarget.id;
    var title = e.currentTarget.dataset.title;
    this.setData({
      priceid: priceid,
      isPrice: true,
      price: title
    });
    this.data.housepriceid = priceid;
    this.gethouselist();
  },
  selecttypeitem: function (e) {
    var typeid = e.currentTarget.id;
    var title = e.currentTarget.dataset.title;
    this.setData({
      typeid: typeid,
      isType: true,
      typetitle: title
    });
    this.data.housetype = typeid;
    this.gethouselist();
  },
  // 下拉刷新
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    wx.stopPullDownRefresh();

  },
  // 上拉加载
  onReachBottom(params) {
    var that = this;
    wx.request({
      'url': siteRoots + '/wxapp/idc/list2',
      data: {
        pageNumber: this.data.pageNumber
      },
      success: function (res) {
        console.log("开始");
        console.log(res.data);
        if (res.data) {
          var idcLength = res.data.totalRow;
          console.log(idcLength);
          that.setData({
            idcList: that.data.list.concat(res.data.list),
            domIidcLength: idcLength
          })
        }
        console.log("结束");
      },
      complete: function () {
        that.data.pageNumber = that.data.pageNumber + 1;
      }
    });
  },

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
  selectRank: function () {
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
  selectBrand: function () {
    wx.navigateTo({
      url: '../brand/brand'
    })
  },

  // 加载
  onShow: function () { },
  // 分享
  onShareAppMessage: function () {
    return {
      title: 'IDC' + wx.getStorageSync('companyinfo').name,
      path: '/weixinmao_house/pages/newhouselist/index'
    }
  }
})