// components/public/BaseList/BaseList.js
Component({
  properties:{
    BaseNewsList:{
      type:Array,
      value:[]
    }
  },
  methods:{
    handleGoNews(e){
      console.log(e)
      this.triggerEvent("goNews",e);
    }
  }
})