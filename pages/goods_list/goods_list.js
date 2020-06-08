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
    totalPages: 1,
    currentPage: 1,
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
  //触底加载后续数据
  onReachBottom() {
    if (this.data.currentPage < this.data.totalPages) {
      this.setData({
        currentPage: this.data.currentPage + 1,
      });
      this.queryData.pagenum++;
      this.getGoodsLits(this.queryData);
    } else {
      //没有更多数据
      wx.showToast({
        title: '没有更多数据',
        icon: 'none',
        duration: 1500,
      });
    }
  },
  //下拉刷新页面：清空数组，重新请求第一页
  onPullDownRefresh() {
    this.setData({
      goodsList: [],
      currentPage: 1,
    });
    this.queryData.pagenum = 1;
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
        url: item.goods_id,
      };
    });
    this.setData({
      message,
      totalPages: Math.ceil(message.total / data.pagesize),
      goodsList: [...this.data.goodsList, ...goodsList],
    });
    //关闭下拉刷新样式
    wx.stopPullDownRefresh();
  },
  /************ 业务逻辑 相关方法 ************/
  handleTabItemChange(e) {
    this.setData({
      tabIndex: e.detail.index,
    });
  },
});
