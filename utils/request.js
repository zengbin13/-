const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1';
let ajaxTimes = 0;
export function request(options) {
  wx.showLoading({
    title: '加载中',
    mask: true,
    complete: () => {
      ajaxTimes++;
    },
  });
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + options.url,
      data: options.data || {},
      method: options.method || 'GET',
      header: { 'content-type': 'application/json' },
      dataType: 'json',
      responseType: 'text',
      success: resolve,
      fail: reject,
      complete() {
        ajaxTimes--;
        if (ajaxTimes === 0) {
          wx.hideLoading();
        }
      },
    });
  });
}
