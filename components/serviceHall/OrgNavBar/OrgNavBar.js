// components/serviceHall/OrgNavBar/OrgNavBar.js
Component({
  properties:{
    navbarList:{
      type:Array,
      value:[]
    },
    flag:{
      type: Number,
      value: 0
    }
  },
  methods:{
    handleToggleMsg(e){
      this.triggerEvent("toggleMsg",e);
    }
  }
})