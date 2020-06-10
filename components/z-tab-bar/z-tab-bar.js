// components/z-tab-bar/z-tab-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabList: {
      type: Array,
      value: ['数据', '数据', '数据'],
    },
    currentIndex: {
      type: Number,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTabClick(e) {
      let index = e.currentTarget.dataset.index;
      this.setData({
        currentIndex: index,
      });
      //触发tabItemChange事件，抛出点击索引值
      this.triggerEvent('tabItemChange', { index: index });
    },
  },
});
