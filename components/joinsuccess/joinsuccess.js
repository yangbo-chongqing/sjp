Component({
  properties: {
    showModel: {
      type: Boolean,
      value: false
    },
    
  },
  methods: {
    closemodel(e) {

      this.triggerEvent("closeModel", e);
    },
   
  }
})