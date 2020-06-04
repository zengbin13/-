const baseURL = "https://api-hmugo-web.itheima.net/api/public/v1";

export function request(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + options.url,
      data: options.data || {},
      method: options.method || "GET",
      header: { "content-type": "application/json" },
      dataType: "json",
      responseType: "text",
      success: resolve,
      fail: reject,
    });
  });
}
