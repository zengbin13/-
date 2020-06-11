// pages/search/search.js
import { request } from '../../utils/request';
import { debounce } from '../../utils/debounce';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchText: '',
  },
  debounceInput: () => debounce(this.getSearchData, 5000),
  handleInput(e) {
    let searchText = e.detail.value.trim();
    this.setData({
      searchText,
    });
    this.debounceInput();
  },
  async getSearchData() {
    let res = await request({
      url: '/goods/qsearch',
      data: {
        query: this.data.searchText,
      },
    });
    console.log(res);
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
