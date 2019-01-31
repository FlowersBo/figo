//app.js
App({
  data:{
    // siteroot:'https://wx.hubcloud.cn',
    // siteroot: 'http://172.17.0.174',
    siteroot: 'http://39.96.167.20',
    citySel: null,
    userinfo:null,
    userInput:null
  },
	onLaunch: function () {
		//调用API从本地缓存中获取数据
	},
	onShow: function () {
		// console.log(getCurrentPages())
	},
	onHide: function () {
	//	console.log(getCurrentPages())
	},
	onError: function (msg) {
		//console.log(msg)
	},
  onload:function(e){
    
  },
	util: require('we7/resource/js/util.js'),
	tabBar: {
		"color": "#123",
		"selectedColor": "#1ba9ba",
		"borderStyle": "#1ba9ba",
		"backgroundColor": "#fff",
		"list": [
		]
	},

  //渐入，渐出实现 
  show: function (that, param, opacity) {
    var animation = wx.createAnimation({
      //持续时间800ms
      duration: 800,
      timingFunction: 'ease',
    });
    //var animation = this.animation
    animation.opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  },

  //向上滑动渐入渐出
  slideupshow: function (that, param, px, opacity) {
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    });
    animation.translateY(px).opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  },

  //向右滑动渐入渐出
  sliderightshow: function (that, param, px, opacity) {
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    });
    animation.translateX(px).opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  },

  // 检查用户信息是否登录
  // useCheck: function (e) {
  //   var timestamp = Date.parse(new Date());
  //   var expiration = wx.getStorageSync('user_info_expiration');
  //   var userinfo = wx.getStorageSync('user_info');
  //   if (userinfo && expiration > timestamp) {
  //     console.log('用户已经登录,读取用户信息渲染');
  //     console.log(userinfo);
  //     console.log(userinfo.openid);
  //     console.log(userinfo.avatarurl);
  //   } else {
  //     wx.showToast({
  //       title: "为了您更好的体验,请先同意授权",
  //       icon: 'none',
  //       duration: 2000
  //     }),
  //       setTimeout(function () {
  //         wx.navigateTo
  //           ({
  //             url: '/weixinmao_house/pages/wxlogin/index',
  //           })
  //       }, 1000)
  //   }
  // },

  // useCheck: function (e) {
  //   console.log('this是',this);
  //   var userinfo = this.data.userinfo;
  //   if (!userinfo == null) {
  //     console.log('用户已经登录,读取用户信息渲染');
  //     console.log(userinfo);
  //     console.log(userinfo.openid);
  //     console.log(userinfo.avatarurl);
  //   } else {
  //     wx.showToast({
  //       title: "为了您更好的体验,请先同意授权",
  //       icon: 'none',
  //       duration: 2000
  //     }),
  //       setTimeout(function () {
  //         wx.navigateTo
  //           ({
  //             url: '/weixinmao_house/pages/wxlogin/index',
  //           })
  //       }, 1000)
  //   }
  // },







  
	globalData: {
    userInfo: null,
    openid: null,
    userid: null,
	},
  siteInfo: require('siteinfo.js') 

});