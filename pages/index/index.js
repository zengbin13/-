//index.js
import { request } from "../../utils/request.js";
Page({
  data: {
    swiperList: [],
    navMenu: [],
    floorData: [],
  },
  //页面加载开始加载
  onLoad() {
    this.getSeiperData();
    this.getNavMenuData();
    this.getFloorData();
  },
  /************ api 相关方法 ************/

  getSeiperData() {
    request({
      url: "/home/swiperdata",
    }).then((res) => {
      this.setData({
        swiperList: res.data.message,
      });
    });
  },
  getNavMenuData() {
    request({
      url: "/home/catitems",
    }).then((res) => {
      this.setData({
        navMenu: res.data.message,
      });
    });
  },
  getFloorData() {
    request({
      url: "/home/floordata",
    }).then((res) => {
      this.setData({
        floorData: res.data.message,
      });
    });
  },
});
