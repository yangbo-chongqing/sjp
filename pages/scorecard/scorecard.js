// pages/scorecard/scorecard.js
import {
  get, post
} from "../../assets/js/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select:1,//选择展示个人积分或兑换积分
    select1:1,//选择消费积分还是活动积分
    select2:1,//选择展示全部还是获取或消费
    showNotice:false,//积分说明框
    scoreintro: "", //积分说明
    consumeScore:"",//消费的总积分
    meScore:'',//当前积分
    pageNum:1,//分页首条
    type:'',//收支类型
    scoreList:[],//收支列表
    total:1,
  },
  showNotice() {//弹出积分说明
    this.getscoreintro()
    this.setData({
      showNotice: true
    })
  },
  closenotice() {//取消提示框
    this.setData({
      showNotice: false,
    })
  },
  getscoreintro() {//获取积分说明
    get({
      link: "/information/list",
      data: {
        newsType: 5
      }
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        this.setData({
          scoreintro: res.data.list[0]
        })
      }
    })
  },
  // selectBtn(e){//选择展示个人积分或兑换积分
  //   this.setData({
  //     select:e.currentTarget.dataset.num
  //   })
  // },
  selectBtn1(e){//选择消费积分还是活动积分
    this.setData({
      select1:e.currentTarget.dataset.num
    })
  },
  selectBtn2(e){//选择展示全部还是获取或消费
    this.setData({
      select2:e.currentTarget.dataset.num,
      pageNum:1,
      scoreList:[]
    })
    this.getMe(this.data.pageNum)
  },
  getMeIntegral(){//获取自己的积分
    get({
      link:"/sys/user/getMeIntegral"
    }).then(res=>{
      this.setData({
        meScore:res.data
      })
    })
  },
  getMeUp(){//获取自己消费的积分
    get({
      link:"/integralOrder/getTotalIntegralByMe"
    }).then(res=>{
      this.setData({
        consumeScore:res.data
      })
    })
  },
  getMe(num){//获取自己积分收支记录
    let that=this
    if(this.data.select2==1){
      this.setData({
        type:''
      })
    }else if(this.data.select2==2){
      this.setData({
        type:1
      })
    }else if(this.data.select2==3){
      this.setData({
        type:2
      })
    }
    get({
      link:"/integralOrder/inAndOutList",
      data:{type:that.data.type,pageNum:num,pageSize:20}
    }).then(res=>{
      if(res.code==200){
        this.setData({
          scoreList:this.data.scoreList.concat(res.data.list) ,
          total:res.data.total
        })
      }
    }).catch(err=>{console.log(err)})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMeIntegral()//获取自己的积分
    this.getMeUp()//获取自己消费的积分
    this.getMe(this.data.pageNum)//获取自己的收支记录
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.total>this.data.pageNum*20){
    this.setData({
      pageNum:this.data.pageNum+1
    })
    this.getMe(this.data.pageNum)
  }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})