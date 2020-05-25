// components/Lead/Modal/Modal.js
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
        },
        handlePhone(e){
            console.log(e)
            var phone = e.currentTarget.dataset.ph;
            //调打手机
            wx.makePhoneCall({
                phoneNumber: phone //仅为示例，并非真实的电话号码
            })
        },
    }
})