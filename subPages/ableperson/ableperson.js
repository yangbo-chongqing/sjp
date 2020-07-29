// subPages/ableperson/ableperson.js
import {
  get
} from "../../assets/js/request"
import {
  getSubDataValue
} from "../../assets/js/public";
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showNotice: false,//说明按钮
    scoreintro: {},//说明内容
    list: [{
      imgsrc: 'https://webservers.sjpdqfwzx.com/file/icon/Rectangle 272.png',
      ableLists: [{
        text: "“网格七员”大比拼",
        texturl: '/subPages/ablecompetition/ablecompetition',
      }, {
        text: "初心不改大培训",
        texturl: '/subPages/train/train',
      }, {
        text: "政治引领大作为",
        texturl: '/subPages/politics/politics',
      }]
    },
    {
      imgsrc: 'https://webservers.sjpdqfwzx.com/file/icon/Rectangle 276.png',
      ableLists: [{
        text: "杨春敏代表工作室",
        texturl: '/subPages/forum/studio/studio',
      }, {
        text: "文明实践社区",
        texturl: '/subPages/forum/community/community',
      }, {
        text: "“主题联学”百人行",
        texturl: '/subPages/forum/learning/learning',
      }]
    },
    {
      imgsrc: 'https://webservers.sjpdqfwzx.com/file/icon/Rectangle 280.png',
      ableLists: [{
        text: "“街坊好人榜”",
        texturl: '/subPages/goodperson/goodperson',
      }, {
        text: "“社会义举榜”",
        texturl: '/subPages/goodpersonTwo/goodpersonTwo',
      }, {
        text: "“商户诚信榜”",
        texturl: '/subPages/goodpersonThree/goodpersonThree',
      }]
    },
    {
      imgsrc: 'https://webservers.sjpdqfwzx.com/file/icon/Rectangle 284.png',
      ableLists: [{
        text: "情绪宣泄点",
        texturl: '/subPages/emotion/emotion',
      }, {
        text: "心理按摩室",
        texturl: '/subPages/psychological/psychological',
      }]
    },
    {
      imgsrc: 'https://webservers.sjpdqfwzx.com/file/icon/Rectangle 288.png',
      ableLists: [{
        text: "志愿加油站",
        texturl: '/subPages/gasstation/gasstation',
      }, {
        text: "街区美容站",
        texturl: '/subPages/beautystreet/beautystreet',
      }, {
        text: "素养提升站",
        texturl: '/subPages/moreVolunteerActivity/moreVolunteerActivity',
      }]
    },
    {
      imgsrc: 'https://webservers.sjpdqfwzx.com/file/icon/Rectangle 292.png',
      ableLists: [{
        text: "邻里调解讲和",
        texturl: '/subPages/voluntary/voluntary',
      }, {
        text: "司法援助助和",
        texturl: '/subPages/judicial/judicial',
      }, {
        text: "社工参与促和",
        texturl: '/subPages/social/social',
      }]
    },
    {
      imgsrc: 'https://webservers.sjpdqfwzx.com/file/icon/Rectangle 296.png',
      ableLists: [{
        text: "阵地风采",
        texturl: '/subPages/forum/positioning/positioning',

      }]
    },
    {
      imgsrc: 'https://webservers.sjpdqfwzx.com/file/icon/Rectangle 300.png',
      ableLists: [{
        text: "特钢能人库",
        texturl: '/subPages/special/special',
      }, {
        text: "管家项目库",
        texturl: '/subPages/project/project',
      }, {
        text: "优先保障库",
        texturl: '/subPages/guarantee/guarantee',
      }]
    }
    ],
  },
  godeal() {
    this.setData({//展示说明
      showNotice: true
    })
  },
  getnews() {
    get({
      link: "/information/list",
      data: {
        newsType: 33
      }
    }).then(res => {
      this.setData({
        scoreintro: res.data.list[0]
      })
    })
  },
  closenotice() {
    this.setData({//不展示说明
      showNotice: false
    })
  },
  goTheme(e) {
    let url = e.currentTarget.dataset.url
    if (url.indexOf("pages") != -1) {
      wx.switchTab({
        url: url,
      })
    } else {
      wx.navigateTo({
        url: url,
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getnews()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})