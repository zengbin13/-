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
    this.setData({
      goodsData: res.data.message,
      swiperData: res.data.message.pics,
    });
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
});
