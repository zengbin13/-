// pages/cart/cart.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: null,
    cartList: [],
  },
  /****业务逻辑 */
  handleAddress() {
    let scopeAddress;
    // 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限
    wx.getSetting({
      success: result1 => {
        scopeAddress = result1.authSetting['scope.address'];
        if (scopeAddress === false) {
          // 设置界面只会出现小程序已经向用户请求过的权限
          wx.openSetting();
        }
        wx.chooseAddress({
          success: result2 => {
            wx.setStorageSync('address', result2);
          },
        });
      },
    });
  },
  saveCartData() {
    let cartData = wx.getStorageSync('cart');
    this.setData({
      cartList: cartData,
    });
  },
  getAddressData() {
    let address = wx.getStorageSync('address');
    this.setData({
      address: address,
    });
  },
  handleCheckChange(e) {
    console.log(e);
    console.log('iii');
  },
  /**
   * 生命周期函数
   */
  onLoad() {
    this.getAddressData();
  },
  onShow(options) {
    this.saveCartData();
  },
});
