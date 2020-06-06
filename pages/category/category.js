// pages/category/category.js
import { request } from '../../utils/request';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,
    //滚动条置顶
    scrollTop: 0,
  },
  // 请求的分类数据
  categotyData: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*使用本地存储缓存数据
      1.判断是否有旧数据并且没有过期
      {time: Date.now, data:[...]}
      2.1 有，使用旧数据
      2.2 没有，发生请求获取数据，并缓存数据
    */
    let categotyData = wx.getStorageSync('categotyData');
    if (!categotyData) {
      //不存在数据
      this.getCategoryDataData();
    } else {
      //存在数据
      //验证过期时间
      if (Date.now() - categotyData.time < 1000 * 60) {
        this.categotyData = categotyData.data;
        this.handleLoadData();
      } else {
        this.getCategoryDataData();
      }
    }
  },
  /************ api 相关方法 ************/

  //ES6 异步请求 promise
  // getCategoryDataData() {
  //   request({
  //     url: "/categories",
  //   }).then((res) => {
  //     //将数据保存在data中
  //     this.categotyData = res.data.message;
  //     this.handleLoadData();
  //     //将数据缓存到本地存储
  //     wx.setStorageSync("categotyData", {
  //       time: Date.now(),
  //       data: this.categotyData,
  //     });
  //   });
  // },

  //ES7 异步请求 async await
  async getCategoryDataData() {
    const res = await request({ url: '/categories' });
    // 将数据保存在data中
    this.categotyData = res.data.message;
    this.handleLoadData();
    //将数据缓存到本地存储
    wx.setStorageSync('categotyData', {
      time: Date.now(),
      data: this.categotyData,
    });
  },
  /************ 业务逻辑 相关方法 ************/
  //设置保存渲染页面的初始数据
  handleLoadData() {
    this.setData({
      leftMenuList: this.categotyData.map(item => {
        return item.cat_name;
      }),
      rightContent: this.categotyData[0].children,
    });
  },
  //点击左侧菜单项
  handleCateClick(event) {
    let index = event.currentTarget.dataset.index;
    this.setData({
      currentIndex: index,
      //使用缓存的数据，不要多次请求
      rightContent: this.categotyData[index].children,
      scrollTop: 0,
    });
  },
});
