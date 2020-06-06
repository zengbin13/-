// pages/goods_list/goods_list.js
import { request } from '../../utils/request.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabList: ['综合', '销量', '价格'],
    tabIndex: 0,
    message: {},
    goodsList: [],
  },
  queryData: {
    query: '',
    cid: '0',
    pagenum: 1,
    pagesize: 10,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取页面路径传递的参数——通过options获取
    this.queryData.cid = options.cid;
    this.getGoodsLits(this.queryData);
  },
  /************ api 相关方法 ************/
  async getGoodsLits(data) {
    let res = await request({
      url: '/goods/search',
      data,
    });
    let message = res.data.message;
    let goodsList = message.goods.map(item => {
      return {
        src:
          item.goods_small_logo ||
          'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg',
        content: item.goods_name,
        price: item.goods_price,
      };
    });
    this.setData({
      message,
      goodsList,
    });
  },
  /************ 业务逻辑 相关方法 ************/
  handleTabItemChange(e) {
    this.setData({
      tabIndex: e.detail.index,
    });
  },
});
