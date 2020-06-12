// pages/search/search.js
import { request } from '../../utils/request';
import { debounce } from '../../utils/debounce';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchText: '',
    searchList: [],
    isFoucs: false,
  },
  //定时器
  timer: 0,
  handleInput(e) {
    let searchText = e.detail.value.trim();
    if (!searchText) {
      this.handleCancel();
      return;
    }
    this.setData({
      searchText,
      isFoucs: true,
    });
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.getSearchData();
    }, 1000);
  },
  async getSearchData() {
    let res = await request({
      url: '/goods/qsearch',
      data: {
        query: this.data.searchText,
      },
    });
    this.setData({
      searchList: res.data.message,
    });
  },
  handleCancel() {
    this.setData({
      searchText: '',
      searchList: [],
      isFoucs: false,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
