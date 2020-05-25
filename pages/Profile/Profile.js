// pages/Profile/Profile.js
import {
  get, post
} from "../../assets/js/request"
const check = require("../../assets/js/islogin.js")

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navlist: [{
      name: "积分排名",
      id: 0,
      url: "/subPages/scoreRank/scoreRank"
    },
    {
      name: "我的活动",
      id: 1,
      url: "/subPages/myactivity/myactivity"
    },
    {
      name: "绑定党员",
      id: 2,
      url: ""
    },
    {
      name: "积分商品",
      id: 3,
      url: "/subPages/integralgoods/integralgoods"
    },
    {
      name: "能人服务",
      id: 4,
      url: "/subPages/manservice/manservice"
    },
    {
      name: "能人核销",
      id: 5,
      url: "/subPages/manexchange/manexchange"
    },
    {
      name: "商品核销",
      id: 6,
      url: "/subPages/goodsexchange/goodsexchange"
    },
    {
      name: "修改密码",
      id: 7,
      url: "/pages/updatepwd/updatepwd"
    },
    {
      name: "账号注销",
      id: 8,
      url: ""
    },


    ],
    showCode: false, //二维码弹窗
    showNotice: false, //积分说明弹窗
    showForm: false, //党员绑定弹窗
    scoreintro: "", //积分说明
    isparty: '', //是否为党员
    name: app.globalData.userInfo.partyMember ? app.globalData.userInfo.partyMember.mebName : '', //党员绑定姓名
    idcard: app.globalData.userInfo.partyMember ? app.globalData.userInfo.partyMember.mebCard : '', //党员绑定证件号码
    myscore: '',
    supermarketScore:'',      //超市消费积分
    ablePersonScore: '',      //能人消费积分
    islogin: '',
    userinfo: wx.getStorageSync("userInfo"),
    showAbleperson:false,  //能人弹窗
    ablepersonMsg:null,      //能人提示
    showMarket:false,     //商家弹窗
    marketMsg:null,     //商家信息
  },
  //点击跳转事件判断登录和当前登录人员角色信息
  goEach(e) {
    let id = e.currentTarget.dataset.id
    if (e.currentTarget.dataset.url) {
      var url = e.currentTarget.dataset.url
    } else { }
    if (id == 2) {
      if (this.data.islogin) {
        if (!this.data.isparty) { //如果不是党员，就打开绑定党员弹框
          this.setData({
            showForm: true
          })
        }
      } else {
        this.checknotice()
      }
    } else if (id == 0 || id == 1 || id == 3 || id == 4 || id == 7) {
      check.land(url)
      // if (this.data.islogin) {
      //   wx.navigateTo({
      //     url: url,
      //   })
      // } else {
      //   this.checknotice()
      // }
    } else if (id == 5 || id == 6) {
      if (this.data.islogin) {
        let userinfo = wx.getStorageSync("userInfo")
        //console.log(userinfo)
        if (id == 5 && userinfo.ablePerson) {
          // wx.navigateTo({
          //   url: url,
          // })
          check.land(url)
        } else if (id == 6 && userinfo.market) {
          // wx.navigateTo({
          //   url: url,
          // })
          check.land(url)
        } else {
          if (id == 5) {
            this.getAble()
            // wx.showToast({
            //   title: '暂无能人信息',
            //   icon: "none"
            // })
            this.setData({
              showAbleperson:true,
            })
          } else {
            this.getMarket()
            this.setData({
              showMarket:true
            })
            // wx.showToast({
            //   title: '暂无商家信息',
            //   icon: "none"
            // })
          }
        }

      } else {
        check.land(url)
        // this.checknotice()
      }


    } else if(id==8){
      if (this.data.islogin) {
        this.cancellation()
      } else {
        this.checknotice()
      }
    } else {
      check.land(url)
      // if (this.data.islogin) {
      //   wx.navigateTo({
      //     url: url,
      //   })
      // } else {
      //   this.checknotice()
      // }
    }
    // wx.navigateTo({
    //   url: e.currentTarget.dataset.url,
    // })
  },

  // 账号注销
  cancellation(){
    let t = this
    wx.showModal({
      title: '温馨提示',
      content: '确定要注销吗？注销账户30天内可联系管理员恢复，30天后自动删除该账号',
      success(res) {
        if (res.confirm) {
          post({
            link: "/sys/user/cancel"
          }).then(res => {
            if (res.code === 0) {
              wx.showToast({
                title: '注销成功',
                icon: "success"
              })
              t.setData({
                islogin: false
              })
              wx.navigateTo({
                url: '/pages/login/login',
              })
              t.cleardata()
            }
          }).catch(err => {
            wx.showToast({
              title: '网络错误',
              icon: "none"
            })
          })
        } else if (res.cancel) {
          // wx.navigateBack()
        }
      }
    })
  },

  checknotice() {
    wx.showModal({
      title: '登录提醒',
      content: '你还未登录，请登录后访问',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        } else if (res.cancel) {
          // wx.navigateBack()
        }
      }
    })
  },
  closem() {
    this.setData({
      showForm: false
    })
  },
  //党员绑定
  party() {
    let t = this
    if (!this.data.isparty) {
      let reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/
      if (!this.data.name) {
        wx.showToast({
          title: '请输入姓名',
          icon: "none"
        })
        return
      }
      if (!this.data.idcard) {
        wx.showToast({
          title: '请输入身份证号码',
          icon: "none"
        })
        return
      }
      if (!reg.test(this.data.idcard)) {
        wx.showToast({
          title: '号码有误请重新输入',
          icon: "none"
        })
        return
      }
      let data = {
        popName: this.data.name,
        popCard: this.data.idcard
      }
      get({
        link: "/fun/partyMember/bindingMember",
        data: data
      }).then(res => {
        if (res.code == 200) {
          let userInfo = wx.getStorageSync('userInfo');
          userInfo.partyMember = res.data;
          wx.setStorageSync('userInfo', userInfo)
          wx.showToast({
            title: '绑定成功',
          })
          t.setData({
            showForm: false
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.msg,
            success(res) {
              if (res.confirm) {
                t.setData({
                  showForm: false
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      })
    }
  },
  //党员解绑
  unparty() {
    get({
      link: "/fun/partyMember/unboundMember",
    }).then(res => {
      if (res.code == 200) {
        app.globalData.userInfo.partyMember = null
        wx.showModal({
          title: '提示',
          content: "解绑成功！",
          success(res) {
            if (res.confirm) {
              t.setData({
                showForm: false
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },
  //党员绑定姓名
  name(e) {
    this.setData({
      name: e.detail.value
    })
  },
  //党员绑定证件号码
  idcard(e) {
    this.setData({
      idcard: e.detail.value
    })
  },
  //点击展示二维码
  showCode() {
    this.setData({
      showCode: true
    })
  },
  //关闭二维码
  closecode() {
    this.setData({
      showCode: false,
      showAbleperson:false,
      showMarket:false
    })
  },
  //点击积分说明弹出提示框
  showNotice() {
    if (this.data.islogin) {
      this.getscoreintro()
      this.setData({
        showNotice: true
      })
    } else {
      wx.showModal({
        title: '登录提醒',
        content: '你还未登录，请登录后访问',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          } else if (res.cancel) {
            // wx.navigateBack()
          }
        }
      })
    }

  },
  //取消说明提示框
  closenotice() {
    this.setData({
      showNotice: false,
    })
  },
  //党员绑定提交并关闭弹窗
  joinparty() {
    if (this.data.isparty) {
      this.unparty()
    } else {
      this.party()
    }
  },
  //点击关闭绑定党员弹窗
  handelForm() {
    this.setData({
      showForm: false
    })
  },
  //获取积分说明
  getscoreintro() {
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
  //退出登录
  logout() {
    let t = this
    wx.showModal({
      title: '温馨提示',
      content: '确定要退出吗？',
      success(res) {
        if (res.confirm) {
          get({
            link: "/logout"
          }).then(res => {
            console.log(res)
            if (res.code == 0) {
              wx.showToast({
                title: '退出成功',
                icon: "success"
              })
              t.setData({
                islogin: false
              })
              t.cleardata()
            }else if(res.code==403){
              wx.showModal({
                title: '登录提醒',
                content: '登录状态失效，请登录！',
                success(res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '/pages/login/login',
                    })
                  } else if (res.cancel) {
                    // wx.navigateBack()
                  }
                }
              })
              // wx.showToast({
              //   title: '登录状态失效，请登录！',
              //   icon: "none"
              // })
            }
          }).catch(err => {
            console.log("err")
            wx.showToast({
              title: '网络错误',
              icon: "none"
            })
          })
        } else if (res.cancel) {
          // wx.navigateBack()
        }
      }
    })

  },
  //清除数据
  cleardata() {
    // wx.clearStorageSync()
    wx.removeStorageSync("userCookie")
    wx.removeStorageSync("userInfo")
    wx.removeStorageSync("password")
    wx.removeStorageSync("username")
    this.setData({
      userInfo: null
    })
  },
  //我的活动积分
  getmyscore() {
    get({
      link: "/sys/user/getMeIntegral"
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          myscore: res.data
        })
      }
    })
  },
  //我的消费积分
  // getusedscore() {
  //   get({
  //     link: "/integralOrder/getTotalIntegralByMe"
  //   }).then(res => {
  //     if (res.code == 200) {
  //       this.setData({
  //         myusedscore: res.data
  //       })
  //     }
  //   })
  // },

  //能人消费积分
  getAblePerson() {
    get({
      link: "/ablePerson/getMeIntegral"
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          ablePersonScore: res.data
        })
      }
    })
  },
  //超市消费积分
  getSupermarketScore() {
    get({
      link: "/integralSupermarket/getMeIntegral"
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          supermarketScore: res.data
        })
      }
    })
  },
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  //能人消息
  getAble(){
    get({
      link: "/information/list",
      data:{
        newsType:24
      }
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        this.setData({
          ablepersonMsg: res.data.list[0]

        })
      }
    })
  }, 

  //商家消息
  getMarket(){
    get({
      link: "/information/list",
      data:{
        newsType:25
      }
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        this.setData({ 
          marketMsg: res.data.list[0]
        })
      }
    })
  }, 


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    let password = wx.getStorageSync("password")
    let username = wx.getStorageSync("username")
    console.log(password,username)
   
    wx.request({
      url: app.globalData.baseUrl + '/login',
      header:{
        "clientOrigin": 2
      },
      data: {
        username,
        password
      },
      success: (res) => {
        console.log(res)
        if (res.data.code == 0) {
          // wx.setStorageSync('userCookie', res.header['Set-Cookie'])
          wx.setStorageSync('userInfo', res.data.data)
        }
      }
    })
    console.log(1)

    let userInfo = wx.getStorageSync("userInfo")
    console.log(userInfo)
    if (userInfo) {
      this.getmyscore()
      this.getAblePerson()
      this.getSupermarketScore()
      this.getAble()
      this.getMarket()
      this.setData({
        ablePerson:userInfo.ablePerson,    //能人 
        market: userInfo.market,    //超市
        names: userInfo.name || "游客",
        phone: userInfo.mobile ? userInfo.mobile : userInfo.username,
        pic: userInfo.picId || "/assets/img/headpic.png",
        islogin: true
      })
      if (userInfo.partyMember !== null) {
        let navlist = this.data.navlist;
        navlist = navlist.map((obj, index) => { //如果已绑定党员，菜单名称改为已绑定
          if (obj.id === 2) {
            obj.name = '绑定党员（已绑定）'
          }
          return obj;
        })
        this.setData({
          navlist: navlist,
          isparty: true,
          orgname: userInfo.partyMember.orgName,
          mebname: userInfo.partyMember.mebName,
          ablePerson:userInfo.ablePerson,    //能人 
          market: userInfo.market,    //超市
          names: userInfo.name || "游客",
          phone: userInfo.mobile ? userInfo.mobile : userInfo.username,
          pic: userInfo.picId.replace(/^http/ig,"https") || "/assets/img/headpic.png"
        })
      } else {}
    } else {
      this.setData({
        islogin: false
      })
    }
  },

  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

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