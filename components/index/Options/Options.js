// components/index/Options/Options.js

Component({
  properties:{
    OptionsList:{
      type:Array,
      value:[]
    },
    flag:{
      type: Number,
      value: 0
    }
  },
  methods:{
    handleGetMsg(e){
      this.triggerEvent("getMsg",e);
    }
  }
})