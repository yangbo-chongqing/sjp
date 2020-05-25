const app = getApp();
Component({
  properties: {
    studyList: {
      type: Array,
      value: []
    }
  },
  methods: {
    godetail: function (e) {
      console.log(e)
      this.triggerEvent("gostudy", e.currentTarget.dataset.id)
    }
  }
})
