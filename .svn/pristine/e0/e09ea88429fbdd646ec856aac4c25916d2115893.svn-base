// components/Policy/List/List.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    allList:{
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetails(e){
      console.log(e)
      let newsId = e.currentTarget.dataset.id
      this.triggerEvent('toDetails',newsId)
    }
  }
})
