// components/Alarm/PhoneList/PhoneList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    telephoneList:{
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
    handlePhone(e){
      console.log(e)
      var phone = e.currentTarget.dataset.ph;
      //调打手机
      wx.makePhoneCall({
        phoneNumber: phone //仅为示例，并非真实的电话号码
      })
    },
    handLandline(e) {
      console.log(e)
      var landline = e.currentTarget.dataset.li;
      //调打电话
      wx.makePhoneCall({
        phoneNumber: landline //仅为示例，并非真实的电话号码
      })
    }
  }
});
