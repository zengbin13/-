// pages/pay/pay.js
import { request } from '../../utils/request.js';
import { requestPayment, showToast } from '../../utils/asyncWx';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: null,
    payList: [],
    totalPrice: 0,
    totalCount: 0,
    goodsList: [],
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
      totalCount = 0,
      goodsList = [];
    payList.forEach(item => {
      totalPrice += item.goods_price * item.goods_count;
      totalCount += item.goods_count;
      let goods_item = {
        goods_id: item.goods_id,
        goods_number: item.goods_count,
        goods_price: item.goods_price,
      };
      goodsList.push(goods_item);
    });
    this.setData({
      payList,
      totalPrice,
      totalCount,
      goodsList,
    });
  },
  async handlePay(e) {
    try {
      //1.获取用户token —— 判断缓存是否有 token
      //1.1没有，跳转到授权页面 进行获取token
      const token = wx.getStorageSync('token');
      if (!token) {
        //跳转到授权页面
        wx.navigateTo({
          url: '/pages/auth/auth',
        });
        return;
      }
      //缓存有token 创建订单 获取订单编号
      const res_order = await request({
        url: '/my/orders/create',
        header: { Authorization: token },
        method: 'POST',
        data: {
          order_price: this.data.totalPrice,
          consignee_addr: this.data.address.all,
          goods: this.data.goodsList,
        },
      });
      const order_number = res_order.data.message.order_number;
      //预支付 获取支付参数
      const res_pay = await request({
        url: '/my/orders/req_unifiedorder',
        header: { Authorization: token },
        method: 'POST',
        data: {
          order_number,
        },
      });
      const pay = res_pay.data.message.pay;
      console.log(pay);
      //发起微信支付
      const res_payMent = await requestPayment(pay);
      //查询后台支付数据 历史订单查询
      const res_orders = await request({
        url: '/my/orders/all',
        header: { Authorization: token },
        method: 'POST',
        data: {
          order_number,
        },
      });
      await showToast({ title: '支付成功' });
      //删除已经购买的商品
      let cart = wx.getStorageSync('cart');
      let newCart = cart.filter(item => item.goods_checked === false);
      wx.setStorageSync('cart', newCart);
      //跳回订单页面
      wx.navigateTo({ 
        url: '/pages/order/order',
      });
    } catch (error) {
      await showToast({ title: '支付失败' });
      console.log(error);
    }
  },
});
