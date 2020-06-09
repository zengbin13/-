// components/z-cart-item/z-cart-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartItem: {
      type: Object,
      value: {},
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    handleCheckChange(e) {
      let id = e.currentTarget.dataset.id;
      this.triggerEvent('checkchange', { id });
    },
    handleChangeCount(e) {
      let params = e.currentTarget.dataset;
      this.triggerEvent('countchange', params);
    },
  },
});
