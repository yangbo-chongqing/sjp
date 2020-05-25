// components/index/tools/tools.js
const app = getApp();
Component({
    properties: {
        toolsTop:{
            type:Array,
            value:[]
        },
        toolsBottom:{
            type: Array,
            value: []
        }
    },
    methods:{
        handleGoSubPages(e){
            this.triggerEvent("goSubPages",e);
        }
    }
});