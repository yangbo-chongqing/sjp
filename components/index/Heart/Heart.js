// components/index/Heart/Heart.js
Component({
  properties:{
    BaseNewsList:{
      type:Array,
      value:[]
    }
  },
  methods:{
    /*去帮扶详情页面 需要修改 现在是去新闻详情页*/
    handleGoNews(e){
      this.triggerEvent("goNews",e);
    }
  }
})