Component({
  externalClasses: ['custom-class', 'custom-badge'],
  options: {
    addGlobalClass: true,
  },
  properties: {
    // 数量
    count: {
      type: Number,
      value: 0,
      observer: 'finalCount'
    },
    // 最大数量
    overflowCount: {
      type: Number,
      value: 100
    },
    // 红点
    dot: {
      type: Boolean,
      value: false
    },
    // 单独使用
    alone: {
      type: Boolean,
      value: false
    }
  },
  data: {
    finalCount: 0
  },
  methods: {
    finalCount() {
      this.setData({
        finalCount: parseInt(this.data.count) >= parseInt(this.data.overflowCount) ? `${this.data.overflowCount}+` : this.data.count
      });
    },
  }
});