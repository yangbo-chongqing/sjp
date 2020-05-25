// components/serviceHall/FrameworkList/FrameworkList.js
Component({
  properties: {
    FrameworkList: {
      type: Array,
      value: []
    }
  },
  methods: {
    handleToggleModal(e) {
      let index = e.currentTarget.dataset.index;
      let person = e.currentTarget.dataset.person;
      this.triggerEvent("toggleModal", { index, person });
    }
  }
})
