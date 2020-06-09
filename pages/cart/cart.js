// pages/cart/cart.js
import { chooseAddress, getSetting, openSetting } from '../../utils/asyncWx';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: null,
    cartList: [],
    allSelect: false,
    totalPrice: 0,
    totalCount: 0,
  },
  /****业务逻辑 */
  // 处理地址的业务逻辑
  async handleAddress() {
    // 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限
    try {
      const result1 = await getSetting();
      let scopeAddress = result1.authSetting['scope.address'];
      if (scopeAddress === false) {
        // 设置界面只会出现小程序已经向用户请求过的权限
        await openSetting();
      }
      let address = await chooseAddress();
      // 5 存入到缓存中
      wx.setStorageSync('address', address);
    } catch (error) {
      console.log(error);
    }
  },
  //将购物车数据 设置全选 总价格 总数量后 放入缓存中
  setCart(cart) {
    //通过传入的数据 设置全选 总价格 总数量
    let allSelect = true;
    let totalPrice = 0,
      totalCount = 0;
    cart.forEach(item => {
      if (item.goods_checked) {
        totalPrice += item.goods_price * item.goods_count;
        totalCount += item.goods_count;
      } else {
        allSelect = false;
      }
    });
    if (!cart.length) allSelect = false;
    //全选 总价格 总数量 和购物车数据保存在data中
    this.setData({
      cartList: cart,
      allSelect,
      totalPrice,
      totalCount,
    });
    //购物车数据保存在缓存中
    wx.setStorageSync('cart', cart);
  },
  //(废弃)获取缓存购物车数据 并设置全选 总价格 总数量
  getCartData() {
    //全选按钮是否勾选
    let allSelect = true;
    //总价格 总数量
    let totalPrice = 0,
      totalCount = 0;
    cartData.forEach(item => {
      if (item.goods_checked) {
        totalPrice += item.goods_price * item.goods_count;
        totalCount += item.goods_count;
      } else {
        allSelect = false;
      }
    });
    if (!cartData.length) allSelect = false;
    this.setData({
      cartList: cartData,
      allSelect,
      totalPrice,
      totalCount,
    });
  },
  //处理单个checkbox点击 处理后数据放入缓存
  handleCheckItem(e) {
    //通过传入的id 修改内存的goods_check
    let id = e.detail.id;
    let cart = this.data.cartList;
    let index = cart.findIndex(item => {
      return item.goods_id === id;
    });
    if (cart[index].goods_checked === false && cart[index].goods_count === 0) {
      cart[index].goods_count = 1;
    }
    cart[index].goods_checked = !cart[index].goods_checked;
    this.setCart(cart);
  },
  //点击全选
  handleAllSelect() {
    let flag = this.data.allSelect;
    let cart = this.data.cartList;
    cart.forEach(item => {
      if (flag === false && item.goods_count === 0) {
        item.goods_count = 1;
      }
      return (item.goods_checked = !flag);
    });
    this.setCart(cart);
  },
  //处理商品数量加减
  handleCountChange(e) {
    let { id, count } = e.detail;
    let cart = this.data.cartList;
    let index = cart.findIndex(item => {
      return item.goods_id === id;
    });
    let flag = cart[index].goods_count;
    if (flag || count === 1) {
      if (flag === 1 && count === -1) {
        cart[index].goods_checked = false;
      }
      cart[index].goods_count = cart[index].goods_count + count;
      this.setCart(cart);
    }

    if (flag === 0 && count === -1) {
      wx.showModal({
        title: '提示',
        content: '确定删除该商品?',
        showCancel: true,
        success: result => {
          if (result.confirm) {
            cart.splice(index, 1);
            this.setCart(cart);
          }
        },
      });
    }
  },
  //处理点击结算
  handlePay() {
    if (!this.data.totalCount) {
      wx.showToast({
        title: '您还未选购商品',
        icon: 'none',
        duration: 1500,
        mask: true,
      });
      return;
    }
    if (!this.data.address) {
      wx.showToast({
        title: '您还未添加收货地址',
        icon: 'none',
        duration: 1500,
        mask: true,
      });
      return;
    }
    // 跳转支付页面
    wx.navigateTo({
      url: '/pages/pay/pay',
    });
  },
  /**
   * 生命周期函数
   */
  onShow(options) {
    let cart = wx.getStorageSync('cart') || [];
    let address = wx.getStorageSync('address');
    this.setData({ address });
    this.setCart(cart);
  },
});
