// components/serviceHall/PartyList/PartyList.js
Component({
  properties: {
    flag: {
      type: Number,
      value: 0
    },
    partyList: {
      type: Array,
      value: []
    },
  },
  methods: {
    handleToggleParty(e) {
      this.triggerEvent("toggleParty", e);
    },
    toggleModal(e) {
      let index = e.detail.index;
      let person = e.detail.person;
      this.triggerEvent("toggleModal", { index, person });
    }
  }
})
