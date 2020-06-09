// pages/goods_detail/goods_detail.js
import { request } from '../../utils/request.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsData: {},
    swiperData: [],
  },
  goodsData: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsDetail(options.goods_id);
  },
  /************ api 相关方法 ************/
  async getGoodsDetail(id) {
    let res = await request({
      url: '/goods/detail',
      data: {
        goods_id: id,
      },
    });
    let goodsData = res.data.message;
    console.log(goodsData.goods_big_logo);
    this.setData({
      goodsData: {
        goods_id: goodsData.goods_id,
        goods_price: goodsData.goods_price,
        goods_name: goodsData.goods_name,
        goods_introduce: goodsData.goods_introduce,
        goods_img: goodsData.goods_big_logo,
      },
      swiperData: res.data.message.pics,
    });
    //全局的商品数据
    this.goodsData = this.data.goodsData;
  },
  /************ 业务逻辑 相关方法 ************/
  //点击图片放大预览
  handlePreviewImg(e) {
    const imgs = this.data.swiperData.map(item => {
      return item.pics_mid;
    });
    const index = e.currentTarget.dataset.index;
    console.log(e.currentTarget.dataset.index);
    wx.previewImage({
      current: imgs[index],
      urls: imgs,
    });
  },
  //添加购物车
  handleAddCart(e) {
    //获取缓存中购物车数组
    let cart = wx.getStorageSync('cart') || [];
    //判断商品是否存在于缓存
    let index = cart.findIndex(item => {
      return this.data.goodsData.goods_id === item.goods_id;
    });
    if (index === -1) {
      //不存在
      this.goodsData.goods_count = 1;
      this.goodsData.goods_checked = true;
      cart.push(this.goodsData);
    } else {
      //存在
      cart[index].goods_count++;
    }
    wx.setStorageSync('cart', cart);
    //保存缓存成功，提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      duration: 1500,
      mask: true,
    });
  },
});
