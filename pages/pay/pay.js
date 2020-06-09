// pages/pay/pay.js
import { request } from '../../utils/request.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: null,
    payList: [],
    totalPrice: 0,
    totalCount: 0,
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let address = wx.getStorageSync('address');
    this.setData({
      address,
    });
    let cart = wx.getStorageSync('cart');
    this.setPayList(cart);
  },
  setPayList(cart) {
    let payList = cart.filter(item => {
      return item.goods_checked === true;
    });
    let totalPrice = 0,
      totalCount = 0;
    payList.forEach(item => {
      totalPrice += item.goods_price * item.goods_count;
      totalCount += item.goods_count;
    });
    this.setData({
      payList,
      totalPrice,
      totalCount,
    });
  },
  handlePay(e) {
    //1.获取用户token —— 判断缓存是否有 token
    //1.1没有，跳转到授权页面 进行获取token
    //1.2有
    const token = wx.getStorageSync('token');
    if (!token) {
      //跳转到授权页面
      wx.navigateTo({
        url: '/pages/auth/auth',
      });
      return;
    } else {
      console.log('token');
    }

  },
});
