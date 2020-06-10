// pages/profile/profile.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    isLogin: false,
  },

  /**
   * 生命周期函数-
   */
  onShow: function (options) {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo,
        isLogin: true,
      });
    }
  },
});
