//index.js
import { getSubDataValue } from "../../assets/js/public";
import {
get,post
} from "../../assets/js/request";
const check = require("../../assets/js/islogin.js")

//获取应用实例
const app = getApp();

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    toolsTop: [{
      img: "https://webservers.sjpdqfwzx.com/file/icon/Rectangle 187.png",
        title: "服务大厅",
        link: "/subPages/serviceHall/serviceHall"
      },
      {
        img: "https://webservers.sjpdqfwzx.com/file/icon/Rectangle 187-1.png",
        title: "红岩先锋",
        link: "/subPages/hongyan/hongyan"
      },
      {
        img: "https://webservers.sjpdqfwzx.com/file/icon/Rectangle 187-2.png",
        title: "网格服务",
        link: "/subPages/gridservice/gridservice"
      },
      {
        img: "https://webservers.sjpdqfwzx.com/file/icon/Rectangle 187-3.png",
        title: "民情民意",
        link: "/subPages/residentvoice/residentvoice"
      },
    ],
    toolsBottom: [{
      img: "https://webservers.sjpdqfwzx.com/file/icon/Rectangle 187-4.png",
        title: "特钢能人坊",
        link: "/subPages/ableperson/ableperson"
      },
      {
        img: "https://webservers.sjpdqfwzx.com/file/icon/zhiyuanzhehuodong.png",
        title: "志愿活动",
        link: "/subPages/moreVolunteerActivity/moreVolunteerActivity"
      },
      {
        img: "https://webservers.sjpdqfwzx.com/file/icon/Rectangle 187-5.png",
        title: "三张清单",
        link: "/subPages/threelist/threelist"
      },
      {
        img: "https://webservers.sjpdqfwzx.com/file/icon/Rectangle 187-6.png",
        title: "积分超市",
        link: "/subPages/supermarket/supermarket"
      },
    ],
    OptionsList: ["新闻动态", "活动预告", "爱心+1+"], //选项列表
    flag: 0, //选项列表默认值和标志值
    BaseNewsList: [],
    background:[]
  },
  //跳转新闻详情页
  goNews(e) {
    console.log(e)
    let id=e.detail.currentTarget.dataset.id
    const {
      flag
    } = this.data;
    let title = null;
    switch (flag) {
      case 0:
        title = "新闻动态";
        break;
      case 1:
        title = "活动预告";
        break;
      default:
        title = "爱心+1+";
        break;
    }


    if(flag==0){
      wx.navigateTo({
        url: "/pages/News/News?title=" + title + "&id=" + id,
      })
    }else if(flag==2){
      wx.navigateTo({
        url: "/subPages/heardetail/heardetail?id=" + id,
      })
    }else{

    }
    
  },
  //根据切换的索引值不同切换选项并获取不同的数据
  getMsg(e) {
    let index = -1;
    let flag = -1;
    if(e){
      index = getSubDataValue(e).index;
      flag = index;
    }else{
      flag = this.data.flag
    }
    //const BaseNewsList = [];//新闻列表默认值
    switch (flag) {
      case 0:
        //获取新闻动态函数
        this.getnews()
        break;
      case 1:
        //获取爱心预告函数
        this.getTeaser()
        break;
      default:
        //获取爱心1+1函数
        // check.land(flag)
        this.getlove()
        break;
    }
    this.setData({
      flag,
      // BaseNewsList
    });
  },
  //获取轮播图片
  getloop() {
    var t = this
    let data = {
      homePage: 1,
      pageSize: 5,
      pageNum: 1,
      newsType: 23
    }
    get({
      link: '/information/list',
      data: data
    }).then(msg => {
     
      if (msg.code == 200) {
        t.setData({
          background: msg.data.list
        })
      }
    }).catch(error => {
      console.log(error)
    })
  },
  //获取新闻动态
  getnews(){
    var t = this
    let data = {
      pageNum: 1,
      newsType: 1
    }
    get({
      link: '/information/list',
      data: data
    }).then(msg => {
     
      if (msg.code == 200) {
        t.setData({
          BaseNewsList: msg.data.list
        })
      }

    }).catch(error => {
      console.log(error)
    })
  },
  //获取爱心1+1
  getlove() {
    var t = this
    let data = {
      deptId:wx.getStorageSync("userInfo").deptId,
      pageNum: 1,
    }
    get({
      link: '/lovehelp/list',
      data: data
    }).then(msg => {
  
      if (msg.code == 200) {
        t.setData({
          BaseNewsList: msg.data.list
        })
      }

    }).catch(error => {
      console.log(error)
    })
  },
  //获取活动预告
  getTeaser() {
    var t = this
    let data = {
      pageNum: 1,
      newsType: 22,
      getType:1,
      sort:'start_time'
    }
    get({
      link: '/information/list',
      data: data
    }).then(msg => {
  
      if (msg.code == 200) {
        t.setData({
          BaseNewsList: msg.data.list
        })
      }

    }).catch(error => {
      console.log(error)
    })
  },

  //跳转子页面
  goSubPages(e) {
    const url = getSubDataValue(e).link;
    check.land(url)
    // wx.navigateTo({
    //   url
    // })
  },
  onLoad: function() {
    let userInfo = wx.getStorageSync("userInfo")
    console.log(userInfo)
  },
  onShareAppMessage() {
    return {
      title: '首页',
      path: 'pages/index/index'
    }
  },
  onShow() {
    this.getloop()
    this.getMsg()
  }
})