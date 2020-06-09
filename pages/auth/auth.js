// pages/auth/auth.js
import { request } from '../../utils/request.js';
import { login } from '../../utils/asyncWx.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  async handleUserInfo(e) {
    try {
      //1.获取用户信息
      let { encryptedData, rawData, iv, signature } = e.detail;
      //2.获取登录的code
      let { code } = await login();

      // 3.发生请求获取用户 token值
      //需要企业id
      let loginParams = { encryptedData, rawData, iv, signature, code };
      let { token } = await request({
        url: '/users/wxlogin',
        method: 'POST',
        data: loginParams,
      });
      //4.保存token 返回上一页
      wx.setStorageSync('token', token);
      wx.navigateBack({
        delta: 1,
      });
    } catch (error) {
      console.log(error);
    }
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
