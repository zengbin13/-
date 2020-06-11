// pages/profile/profile.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    isLogin: false,
    CollectGoodsCount: 0,
  },

  /**
   * 生命周期函数-
   */
  onShow: function (options) {
    const userInfo = wx.getStorageSync('userInfo');
    const collect = wx.getStorageSync('collect') || [];

    if (userInfo) {
      this.setData({
        userInfo,
        isLogin: true,
        CollectGoodsCount: collect.length,
      });
    }
    //处理收藏产品数
  },
});
