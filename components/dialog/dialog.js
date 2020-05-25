// components/dialog/dialog.js
Component({
  properties:{
      isShow:{
          type:Boolean,
          value:false
      },
      person:{
          type: Object,
          value: {}
      }
  },
    methods:{
        handleToggleModal(e){
            this.triggerEvent("toggleModal",e);
        }
    }
})
