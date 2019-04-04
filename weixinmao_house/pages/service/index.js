Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        listName: '安装指南',
        icon:'icon-gongren',
      },
      {
        listName: '维修指南',
        icon: 'icon-weixiu',
      }, {
        listName: '付费指南',
        icon: 'icon-caiwufufei',
       }
    ]
  },
  //点击最外层列表展开收起
  listTap(e) {
    let Index = e.currentTarget.dataset.parentindex;//获取点击的下标值
    console.log('触发了点击事件');
    console.log(Index)
    wx.navigateTo({
      url: './guide/index?Index=' + Index,
    })
    //   list = this.data.list;
    // list[Index].show = !list[Index].show || false;//变换其打开、关闭的状态
    // if (list[Index].show) {//如果点击后是展开状态，则让其他已经展开的列表变为收起状态
    //   this.packUp(list, Index);
    // }
    // this.setData({
    //   list
    // });
  },
  //点击里面的子列表展开收起
  // listItemTap(e) {
  //   let parentindex = e.currentTarget.dataset.parentindex,//点击的内层所在的最外层列表下标
  //     Index = e.currentTarget.dataset.index,//点击的内层下标
  //     list = this.data.list;
  //   console.log(list[parentindex].item, Index);
  //   list[parentindex].item[Index].show = !list[parentindex].item[Index].show || false;//变换其打开、关闭的状态
  //   if (list[parentindex].item[Index].show) {//如果是操作的打开状态，那么就让同级的其他列表变为关闭状态，保持始终只有一个打开
  //     for (let i = 0, len = list[parentindex].item.length; i < len; i++) {
  //       if (i != Index) {
  //         list[parentindex].item[i].show = false;
  //       }

  //     }
  //   }
  //   this.setData({ list });
  // },
  // //让所有的展开项，都变为收起
  // packUp(data, index) {
  //   for (let i = 0, len = data.length; i < len; i++) {//其他最外层列表变为关闭状态
  //     if (index != i) {
  //       data[i].show = false;
  //       for (let j = 0; j < data[i].item.length; j++) {//其他所有内层也为关闭状态
  //         data[i].item[j].show = false;
  //       }
  //     }
  //   }
  // },
  onLoad: function (options) {

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

  }
})