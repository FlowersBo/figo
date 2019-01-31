var QQMapWX = require('../../resource/js/qqmap-wx-jssdk.js');
var app = getApp();
var siteRoots = app.data.siteroot;
var demo = new QQMapWX({
  // key: 'KFXBZ-HUBEI-KCQG4-5ZEH4-5K2PK-DOFKE'
  key: 'KFXBZ-HUBEI-KCQG4-5ZEH4-5K2PK-DOFKE'
  // sn:'yfsU4bMshzhwrDXbUcwr2TDKogqIcwQF'
});
Page({
  data: {

    isCars: true, // 选择车源开关
    isSort: true, // 选择排序开关
    isPrice: true, // 选择价格开关


    islevel: false, // 选择等级开关
    isArea: true, // 选择面积排序开关
    isNum: true, // 选择机柜数量开关
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
    userInput: null,
    title:'',
    price:'',
    typetitle:'',
    levellist: [],
    areaList: [],
    numList: [],
    area_min:null,
    area_max:null,
    num_min:null,
    num_max:null
  },
  onShow: function () { },


  // 首屏渲染
  onLoad(params) {
    var that = this;
    // 机房等级
    var arealist = [{
      'name': 'T1',
      'id': 1
    },
    {
      'name': 'T2',
      'id': 2
    },
    {
      'name': 'T3',
      'id': 3
    },
    {
      'name': 'T4',
      'id': 4
    },
    ];

    // 机房面积
    var housepricelist = [{
      'name': '0 - 500',
      'id': 1,
      'area_min': 0,
      'area_max': 500
    },
    {
      'name': '500 - 2000',
      'id': 2,
      'area_min': 500,
      'area_max': 2000
    },
    {
      'name': '2000 - 5000',
      'id': 3,
      'area_min': 2000,
      'area_max': 5000
    },
    {
      'name': '5000以上',
      'id': 4,
      'area_min': 5000,
      'area_max': 99999
    },
    ];
    // 机柜数量
    var housetypelist = [{
      'name': '0 - 500',
      'id': 1,
      'num_min': 0,
      'num_max': 500
    },
    {
      'name': '500 - 1000',
      'id': 2,
      'num_min': 500,
      'num_max': 1000
    },
    {
      'name': '1000 - 2000',
      'id': 3,
      'num_min': 1000,
      'num_max': 2000
    },
    {
      'name': '2000以上',
      'id': 4,
      'num_min': 2000,
      'num_max': 9999
    },
    ];

    //  housetypelist.push(data);
    var typeid = 0;
    var carid = 0;
    var priceid = 0;
    this.setData({
      arealist: arealist,
      housetypelist: housetypelist,
      housepricelist: housepricelist,
      typeid: typeid,
      carid: carid,
      priceid: priceid,
      siteRoots: siteRoots

    });

    wx.setNavigationBarTitle({
      title: 'IDC机房资源',
    });

    // this.confirmTap();
    var citySel = app.data.citySel;
    console.log('000000000000000000000000');
    var userInput = this.data.userInput;
    console.log('this.data.userInput的数值是 ：', this.data.userInput);
    console.log("userInput", userInput);
    console.log("app保存的当前city", app.data.citySel);
    if (citySel == null) {
      console.log("为空，自动通过经纬度获取");
      this.autoCity();
    } else {
      console.log("不为空，下一步获取IDC数据");
      this.setData({
        defaultAd: citySel,
        userInput: userInput
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
            console.log('自动获取经纬度信息的res',res);
            console.log("当前城市名称: " + res.result.ad_info.city);
            console.log("当前城市代码: " + res.result.ad_info.adcode);
            app.data.citySel = citySel;

            that.setData({
              defaultAd: citySel
            });
            that.getIdcList();

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
  getIdcList: function () {
    console.log('this.data = ', this.data);

    console.log('this.data的等级 = ', this.data.houseareaid);

    console.log('this.data的面积最新值 = ', this.data.area_min);
    console.log('this.data的面积最大值 = ', this.data.area_max);

    console.log('this.data的机柜数量最新值 = ', this.data.num_min);
    console.log('this.data的机柜数量最大值 = ', this.data.num_max);
    // 获取城市信息
    var citySel = app.data.citySel;

    // 获取用户输入信息
    var userInput = this.data.userInput;

    // 获取用户选择机房等级
    var level = this.data.houseareaid;

    // 获取用户选择机房面积
    var area_min = this.data.area_min;
    var area_max = this.data.area_max;

    // 获取用户选择机柜数量
    var num_min = this.data.num_min;
    var num_max = this.data.num_max;

   

    if (area_min == null){
      area_min = '';
    };
    if (area_max == null){
      area_max = '';
    };

    if (num_min == null) {
      num_min = '';
    };
    if (num_max == null) {
      num_max = '';
    };

    if (level == 0){
      level = '';
    };
    if (level == '全部') {
      level = '';
    };
    var that = this;
    // 用户选择全部城市置空
    if (citySel == '全部') {
      citySel = '';
    };
    // 用户未输入
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
        _query_addressText: citySel,
        _query_userInput: userInput,
        _query_level: level,
        _query_area_min: area_min,
        _query_area_max: area_max,
        _query_num_min: num_min,
        _query_num_max: num_max
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

  // 获取搜索关键字
  confirmTap: function (event) {
    var that = this;

    var userInput = event.detail.value;
    that.setData({
      userInput: userInput
    });
    console.log('用户输入的信息是：', userInput);
    this.getIdcList();
  },

  // 条件排序

  //根据等级筛选
  selectcarsitem: function (e) {
    var carid = e.currentTarget.id;
    var uRank = e.currentTarget.dataset.title;
    var title = e.currentTarget.dataset.title;
    console.log(e);
    this.setData({
      carid: carid,
      isCars: true,
      title: title
    });
    this.data.houseareaid = uRank;
    console.log('-------根据等级筛选---------');
    console.log('选择的等级是uRank：', uRank);
    console.log('选择的等级是：', title);
    console.log('选择等级的id是：', carid);
    this.getIdcList();
  },

  //根据面积筛选
  selectpriceitem: function (e) {
    console.log(e);
    var priceid = e.currentTarget.id;
    var title = e.currentTarget.dataset.title;
    var area_min = e.currentTarget.dataset.areamin;
    var area_max = e.currentTarget.dataset.areamax;
    this.setData({
      priceid: priceid,
      isPrice: true,
      price: title
    });
    this.data.housepriceid = priceid;
    this.data.area_min = area_min;
    this.data.area_max = area_max;
    console.log('-------根据面积筛选---------');
    console.log('选择的面积是：', title);
    console.log('选择面积的id是：', priceid);
    console.log('选择面积的area_min是：', area_min);
    console.log('选择面积的area_max是：', area_max);
    this.getIdcList();
  },



  // 根据机柜数量筛选

  selecttypeitem: function (e) {
    var typeid = e.currentTarget.id;
    var title = e.currentTarget.dataset.title;
    var num_min = e.currentTarget.dataset.nummin;
    var num_max = e.currentTarget.dataset.nummax;
    console.log(e);
    this.setData({
      typeid: typeid,
      isType: true,
      typetitle: title
    });
    this.data.num_min = num_min;
    this.data.num_max = num_max;
    console.log('-------根据机柜数量筛选---------');
    console.log('选择的机柜数量是：', title);
    console.log('选择机柜数量的id是：', typeid);
    console.log('选择机柜数量的num_min是：', num_min);
    console.log('选择机柜数量的num_max是：', num_max);
    this.getIdcList();
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
  selectSort: function () {
    var that = this;
    that.setData({
      isCars: true,
      isPrice: true,
      isType: true,
      isSort: (!that.data.isSort)
    })
  },





  // 地区筛选
  cityFilter: function (e) {
    wx.navigateTo({
      url: "/weixinmao_house/pages/citysel/index"
    })
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
  // toIdcKey: function (e) {
  //   wx.navigateTo({
  //     url: '/weixinmao_house/pages/idckey/index?',
  //   })
  // },
  // 详情页面
  toSailDetail: function (e) {
    var ids = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/weixinmao_house/pages/saledetail/index?ids=" + ids,
    })
  },

  // 下拉刷新
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // wx.showNavigationBarLoading();
    // this.onload();
    // this.citySearch();
    // wx.stopPullDownRefresh();
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
  // 点击搜索
  clickSearch: function (e) {
    wx.switchTab({
      url: '/pages/search/search'
    })
  },
  // 点击列表
  clickList: function () {
    wx.navigateTo({
      url: '../cars/cars'
    })
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