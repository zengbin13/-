// pages/order/order.js
import { request } from '../../utils/request';
import { formatTime } from '../../utils/util';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabList: ['全部', '待付款', '待发货', '退货/退款'],
    tabIndex: 0,
    requestType: 1,
    ordersData: [],
  },
  /************ 业务逻辑 相关方法 ************/
  handleTabItemChange(e) {
    const count = e.detail.index;
    this.setData({
      tabIndex: count,
      requestType: count + 1,
    });
    if (count + 1 > 3) return;
    this.getOrdersData(count + 1);
  },
  //根据type请求订单数据
  async getOrdersData() {
    try {
      const token = wx.getStorageSync('token');
      if (!token) {
        //跳转到授权页面
        wx.navigateTo({
          url: '/pages/auth/auth',
        });
        return;
      }
      const res = await request({
        url: '/my/orders/all',
        header: { Authorization: token },
        data: {
          type: this.data.requestType,
        },
      });
      let ordersData = res.data.message.orders.map(item => {
        let date = new Date(item.create_time * 1000);
        item.create_time = formatTime(date);
        return item;
      });
      console.log(ordersData);
      this.setData({
        ordersData: ordersData,
      });
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  onShow: function () {
    let curPages = getCurrentPages();
    let options = curPages[curPages.length - 1].options;
    this.setData({
      requestType: options.type,
      tabIndex: options.type - 1,
    });
    this.getOrdersData();
  },
});
