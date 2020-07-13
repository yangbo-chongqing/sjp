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
    dealStatus:0,//规则签署状态
    selectValue:'',
    exchangeMoneyIntegral:'',//可兑换积分数
    mebIntegral:'',//党员积分
    inter:''//是否党员
  },
  showNotice() {//弹出积分说明
    this.getscoreintro()
    this.setData({
      showNotice: true
    })
  },
  closenotice() {//取消提示框
    if(this.data.dealStatus==1){
    this.setData({
      showNotice: false,
    })}else{
      wx.switchTab({  
        url:'/pages/Profile/Profile'  
 })
    }
  },
  red(e){
    this.setData({
      selectValue:e.detail.value
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
  goExchange(){//跳转兑换
    wx.navigateTo({
      url: '/pages/changed/changed',
    })
  },
  // selectBtn(e){//选择展示个人积分或兑换积分
  //   this.setData({
  //     select:e.currentTarget.dataset.num
  //   })
  // },
  selectBtn1(e){//选择消费积分还是活动积分
    this.setData({
      select1:e.currentTarget.dataset.num,
      scoreList:[]
    })
    if(this.data.select1==1){
      this.setData({
        select2:1
      })
      this.getMe(this.data.pageNum)
    }
    if(this.data.select1==2){
      this.setData({
        select2:1
      })
      this.partyTotal(this.data.pageNum)
    }
  },
  selectBtn2(e){//选择展示全部还是获取或消费
    this.setData({
      select2:e.currentTarget.dataset.num,
      pageNum:1,
      scoreList:[]
    })
    if(this.data.select1==1){
    this.getMe(this.data.pageNum)
  }else{
    this.partyTotal(this.data.pageNum)
  }
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
  // getMeUp(){//获取自己消费的积分
  //   get({
  //     link:"/integralOrder/getTotalIntegralByMe"
  //   }).then(res=>{
  //     this.setData({
  //       consumeScore:res.data
  //     })
  //   })
  // },
  partyTotal(num){//获取党员积分收支记录
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
      link:"/funCodeIntegral/inAndOutList",
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
  affirm(){//确认积分使用规则
    let that=this
    if(this.data.selectValue==0){
      wx.showToast({
        title: '请勾选后提交',
        icon:'none'
      })
    }else{
      get({
        link:'/sys/user/signIntegralAgree'
      }).then(res=>{
        if(res.code==0){
          wx.showToast({
            title: '确认成功',
          })
          that.setData({
            showNotice:false
          })
        }
      })
    }
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
    let deal=wx.getStorageSync('userInfo')
    let inter=deal.partyMember||''
    let ex=deal.exchangeMoneyIntegral||''
    deal=deal.isSignIntegralAgree||''
    this.setData({
      dealStatus:deal,
      inter:inter,
      exchangeMoneyIntegral:ex,
      mebIntegral:inter.mebIntegral
    })
    if(deal==0){
      this.showNotice()
    }
    this.getMeIntegral()//获取自己的积分
    // this.getMeUp()//获取自己消费的积分
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
    if(this.data.total>this.data.pageNum*20&&this.data.select1==1){
    this.setData({
      pageNum:this.data.pageNum+1
    })
    this.getMe(this.data.pageNum)
  }
  if(this.data.total>this.data.pageNum*20&&this.data.select1==2){
    this.setData({
      pageNum:this.data.pageNum+1
    })
    this.partyTotal(this.data.pageNum)
  }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})