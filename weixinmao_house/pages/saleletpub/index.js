
// weixinmao_house/pages/pub/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    title:'',
    special:'',
    imagelist:[],
    uploadimagelist:['','','','','',''],
    true1: true,
    true2: true,
    true3: true,
    true4: true,
    true5: true,
    true6: true,
    arealist: [],
    toplist: [],
    areaid: 0,
    toplistid: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '求租房屋发布-' + wx.getStorageSync('companyinfo').name,
    })


    that.checkuser({
      doServices: function () {

        that.oldhouseinit();

      },
      doElseServices: function () {

        //初始化导航数据

        that.oldhouseinit();

      }


    });






  },oldhouseinit:function(e){
    var that = this;
    var userinfo = wx.getStorageSync('userInfo');
    app.util.request({
      'url': 'entry/wxapp/Getpubinit',
      data: { sessionid: userinfo.sessionid, uid: userinfo.memberInfo.uid },
      success: function (res) {
        if (!res.data.message.errno) {
          that.data.arealist = res.data.data.arealist;
          that.data.toplist = res.data.data.toplist;
          that.setData({
            arealist: res.data.data.arealist,
            toplist: res.data.data.toplist,
          })
        }
      }
    });




  },

  bindAreaChange: function (e) {
    var arealist = this.data.arealist;

    if (arealist) {
      this.data.areaid = arealist[e.detail.value].id;
    }
    this.setData({
      arealist: arealist,
      areaidindex: e.detail.value
    })
  }
  ,
  bindToplistChange: function (e) {
    var toplist = this.data.toplist;

    if (toplist) {
      this.data.toplistid = toplist[e.detail.value].id;
    }
    this.setData({
      toplist: toplist,
      toplistidindex: e.detail.value
    })
  }
  ,
  upload:function(e){
    var that = this;
    var e = e;
    that.checkuser({
      doServices: function () {

        that.doupload(e);

      },
      doElseServices: function () {

        //初始化导航数据

        that.doupload(e);


      }
    }
    )
  }
  ,

  doupload:function(e){


    var that = this;
    var id = parseInt(e.currentTarget.dataset.id);
  
    switch (id) {
      case 1:
        if (that.data.true1 == false)
          return;
        break;
      case 2:
        if (that.data.true2 == false)
          return;
        break;
      case 3:
        if (that.data.true3 == false)
          return;
        break;
      case 4:
        if (that.data.true4 == false)
          return;
        break;
      case 5:
        if (that.data.true5 == false)
          return;
        break;
      case 6:
        if (that.data.true6 == false)
          return;
        break;
     

      default:


    }

    var imgurl1, imgurl2, imgurl3, imgurl4, imgurl5, imgurl6
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
     
      
        switch (id) {
          case 1:
            imgurl1 = tempFilePaths;
            console.log(that.data.true1 );
            if (that.data.true1  == false)
              return;
            that.data.true1 = false;
            break;
          case 2:
            imgurl2 = tempFilePaths;
            that.data.true2 = false;
            break;
          case 3:
            imgurl3 = tempFilePaths;
            that.data.true3 = false;
            break;
          case 4:
            imgurl4 = tempFilePaths;
            that.data.true4 = false;
            break;
          case 5:
            imgurl5 = tempFilePaths;
            that.data.true5 = false;
            break;
          case 6:
            imgurl6 = tempFilePaths;
            that.data.true6 = false;
            break;

          default:


        }
 
        that.setData({
          imgurl1: imgurl1,
          imgurl2: imgurl2,
          imgurl3: imgurl3,
          imgurl4: imgurl4,
          imgurl5: imgurl5,
          imgurl6: imgurl6,
          true1:that.data.true1,
          true2: that.data.true2,
          true3: that.data.true3,
          true4: that.data.true4,
          true5: that.data.true5,
          true6: that.data.true6,

        })
   
        that.data.imagelist.push(tempFilePaths);
      
      //  upload(that, tempFilePaths);
        that.uploadimg(tempFilePaths , id);
      }
    })



 
  },

  delupload:function(e){

    var that = this;
    var id = parseInt(e.currentTarget.dataset.id);

    switch (id) {
      case 1:
        that.setData({ imgurl1: '', true1:true})
          
        break;
      case 2:
        that.setData({ imgurl2: '', true2: true })
       
        break;
      case 3:
        that.setData({ imgurl3: '', true3: true })
      
        break;
      case 4:
        that.setData({ imgurl4: '', true4: true })
        
        break;
      case 5:
        that.setData({ imgurl5: '', true5: true })
          
        break;
      case 6:
        that.setData({ imgurl6: '', true6: true })
         
        break;


      default:


    }

    for (var i = 0; i < this.data.uploadimagelist.length ; i++)
      {
        var j = i+1;
        if(j == id)
          {

          this.data.uploadimagelist[i]= '';
          }


      }
    console.log(this.data.uploadimagelist);


  },



  savepubinfo:function(e){

   // this.data.uploadimagelist = [];
    var that = this;
    var userinfo = wx.getStorageSync('userInfo');

    var content = e.detail.value.content;
    var name = e.detail.value.name;
    var tel = e.detail.value.tel;
    var houseareaid = this.data.areaid;
    var special = this.data.special;

    if (content == "") {
      wx.showModal({
        title: '提示',
        content: '请输入求租房描述',
        showCancel: false
      })
      return
    }
  
  
    if (!special) {
      wx.showModal({
        title: '提示',
        content: '请选择房屋特色',
        showCancel: false
      })
      return
    }
  
    var uploadimagelist = this.data.uploadimagelist;
    if (uploadimagelist.length < 2) {
      wx.showModal({
        title: '提示',
        content: '上传图片不少于2张',
        showCancel: false
      })
      return

    }

    if (name == "") {
      wx.showModal({
        title: '提示',
        content: '请输入联系人',
        showCancel: false
      })
      return
    }

    if (tel == "") {
      wx.showModal({
        title: '提示',
        content: '请输入手机号',
        showCancel: false
      })
      return
    }

    if (houseareaid == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择地区',
        showCancel: false
      })
      return
    }
    var uploadimagelist_str = uploadimagelist.join('@');
    var toplistid = this.data.toplistid;
    var data = {
                sessionid: userinfo.sessionid,
                uid: userinfo.memberInfo.uid,
                uploadimagelist_str: uploadimagelist_str, 
                content: content, 
                special: special,
                name:name,
                tel:tel,
                houseareaid :houseareaid,
                saletype:4,
                avatarUrl: userinfo.wxInfo.avatarUrl,
                toplistid: toplistid
                };
    app.util.request({
      'url': 'entry/wxapp/savesaleinfo',
      data: data,
      success: function (res) {


        if (that.data.toplistid > 0) {
          var toplistid = that.data.toplistid;
          var pid = res.data.data.saleinfoid;
          var userinfo = wx.getStorageSync('userInfo');
          var ordertype = 'puboldhouse';
          wx.showModal({
            title: '确认支付',
            content: '确认支付？',
            success: function (res) {
              if (res.confirm) {
                app.util.request({
                  'url': 'entry/wxapp/Salepay',
                  data: { toplistid: toplistid, ordertype: ordertype, pid: pid, sessionid: userinfo.sessionid, uid: userinfo.memberInfo.uid },
                  success: function (res) {
                    console.log(res);
                    if (res.data && res.data.data) {
                      wx.requestPayment({
                        'timeStamp': res.data.data.timeStamp,
                        'nonceStr': res.data.data.nonceStr,
                        'package': res.data.data.package,
                        'signType': 'MD5',
                        'paySign': res.data.data.paySign,
                        'success': function (res) {
                          //支付成功后，系统将会调用payResult() 方法，此处不做支付成功验证，只负责提示用户
                          console.log(res);
                          wx.showToast({
                            title: '提交成功',
                            icon: 'success',
                            duration: 2000,
                            success: function (res) {
                              console.log(res);
                              wx.navigateTo({
                                url: "/weixinmao_house/pages/mysalepub/index?id=1"
                              })
                            }
                          })

                        },
                        'fail': function (res) {
                          //支付失败后，
                        }
                      })
                    }

                  },
                  fail: function (res) {
                    console.log(res);
                  }

                })

              }
            }

          })





        } else {

          if (res.data.errno != 0) {
            // 登录错误 
            wx.hideLoading();
            wx.showModal({
              title: '失败',
              content: res.data.data.msg,
              showCancel: false
            })
            return;
          } else {

            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000,
              success: function (res) {
                console.log(res);
                wx.navigateTo({
                  url: "/weixinmao_house/pages/mysalepub/index?id=1"
                })
              }
            })

          }

        }



      }
    });





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
  
  },

  uploadimg:function (path,id) {
    var uploadurl = app.util.geturl({ 'url': 'entry/wxapp/upload' });
    var id = id;
    wx.showToast({
      icon: "loading",
      title: "正在上传"
    });
    
    var that = this;
    wx.uploadFile({
      url: uploadurl,
      filePath: path[0],
      name: 'file',
      header: { "Content-Type": "multipart/form-data" },
      formData: {
        //和服务器约定的token, 一般也可以放在header中
        'session_token': wx.getStorageSync('session_token')
      },
      success: function (res) {
        var getdata = JSON.parse(res.data);

        if (res.statusCode != 200) {
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
          return;
        }else{
        
        }
        var imgpath = getdata.data.path;


      //  var uploadimagelist = this.data.uploadimagelist;
       
        for (var i = 0; i < that.data.uploadimagelist.length; i++) {
          var j = i + 1;
          if (j == id) {

            that.data.uploadimagelist[i] = imgpath;
          }


        }




        //that.data.uploadimagelist.push(imgpath);
       // console.log(that.data.uploadimagelist);

        /*
        var data = res.data
        page.setData({  //上传成功修改显示头像
          src: path[0]
        })
        */
      },
      fail: function (e) {

        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
      },
      complete: function () {
        wx.hideToast();  //隐藏Toast
      }
    })
  },
  checkboxChange: function (e) {
    var special = e.detail.value;
    this.data.special = special.join(',');
    //console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  checkuser: function (options) {


    var that = this;
    var options = options;
    var userinfo = wx.getStorageSync('userInfo');
    console.log(userinfo);
    if (!userinfo) {
      app.util.getUserInfo(
        function (userinfo) {
          that.getlethousedetail();
        }



      );
      return false;
    } else {
      if (!userinfo.memberInfo.uid) {
        app.util.getUserInfo();
        return false;
      } else {

        app.util.request({
          'url': 'entry/wxapp/checkuserinfo',
          data: { sessionid: userinfo.sessionid, uid: userinfo.memberInfo.uid },
          success: function (res) {
            console.log('payyyy');
            if (res.data.data.error == 0) {

              options.doServices();

            } else if (res.data.data.error == 2) {
              // console.log('payyyy');
              options.doElseServices();

            } else {




            }

          }
        });

      }
    }

  }


})


