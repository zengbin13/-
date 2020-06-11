// pages/goods_detail/goods_detail.js
import { request } from '../../utils/request.js';
import { showToast } from '../../utils/asyncWx';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsData: {},
    swiperData: [],
    isCollect: false,
  },
  goodsData: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    //判断商品是否存在收藏缓存
    let curPages = getCurrentPages();
    let { goods_id } = curPages[curPages.length - 1].options;
    this.getGoodsDetail(goods_id);
    this.handleCollectGoods(goods_id);
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
  handleClickCollect(e) {
    //样式处理
    this.setData({
      isCollect: !this.data.isCollect,
    });
    //toast提示
    if (this.data.isCollect) {
      // 保存在缓存中
      let collectList = wx.getStorageSync('collect') || [];
      collectList.push(this.data.goodsData);
      wx.setStorageSync('collect', collectList);
      //toast样式激活
      showToast({ title: '收藏成功', icon: 'success' });
    } else {
      // 取消保存在缓存中
      let collectList = wx.getStorageSync('collect') || [];
      let index = collectList.findIndex(item => {
        return this.data.goods_id === item.goods_id;
      });
      collectList.splice(index, 1);
      wx.setStorageSync('collect', collectList);
      //toast样式激活
      showToast({ title: '取消收藏', icon: 'success' });
    }
  },
  handleCollectGoods(id) {
    let collectList = wx.getStorageSync('collect') || [];
    let isCollect = collectList.some(item => Number(id) === item.goods_id);
    this.setData({
      isCollect,
    });
  },
});
