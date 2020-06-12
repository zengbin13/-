import { request } from '../../utils/request.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabList: ['体验问题', '商品、商家投诉'],
    tabIndex: 0,
    chooseImgs: [],
    textVal: '',
  },
  UpLoadImgs: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  handleTabItemChange(e) {
    this.setData({
      tabIndex: e.detail.index,
    });
  },
  handleChooseImg() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...res.tempFilePaths],
        });
      },
    });
  },
  handleCancelImg(e) {
    const { index } = e.currentTarget.dataset;
    let { chooseImgs } = this.data;
    // 4 删除元素
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs,
    });
  },
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value,
    });
  },
  handleFormSubmit() {
    // 1 获取文本域的内容 图片数组
    const { textVal, chooseImgs } = this.data;
    // 2 合法性的验证
    if (!textVal.trim()) {
      // 不合法
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true,
      });
      return;
    }
    // 3 准备上传图片 到专门的图片服务器
    // 上传文件的 api 不支持 多个文件同时上传  遍历数组 挨个上传
    // 显示正在等待的图片
    wx.showLoading({
      title: '正在上传中',
      mask: true,
    });

    // 判断有没有需要上传的图片数组

    if (chooseImgs.length != 0) {
      chooseImgs.forEach((item, i) => {
        wx.uploadFile({
          // 图片要上传到哪里
          url: 'https://img.coolcr.cn/index/api.html',
          // 被上传的文件的路径
          filePath: item,
          // 上传的文件的名称 后台来获取文件  file
          name: 'image',
          // 顺带的文本信息
          formData: {},
          success: result => {
            console.log(result);
            let url = JSON.parse(result.data).url;
            this.UpLoadImgs.push(url);

            // 所有的图片都上传完毕了才触发
            if (i === chooseImgs.length - 1) {
              wx.hideLoading();

              console.log('把文本的内容和外网的图片数组 提交到后台中');
              //  提交都成功了
              // 重置页面
              this.setData({
                textVal: '',
                chooseImgs: [],
              });
              // 返回上一个页面
              wx.navigateBack({
                delta: 1,
              });
            }
          },
        });
      });
    } else {
      wx.hideLoading();

      console.log('只是提交了文本');
      wx.navigateBack({
        delta: 1,
      });
    }
  },
});
