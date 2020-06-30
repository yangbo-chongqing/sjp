// subPages/special/special.js
import {
  get
} from "../../assets/js/request"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    showFiltrate: false, //特岗能人筛选切换
    manlist: [],
    servelist: [],
    showLocation: false, //有限保障库筛选切换
    id: '',
    locationlist: [],
    itemid: '',
    index: '',
    arr: [], //点击确认后的数组
    pageSize: 6,
    pageNum: 1,
    tablelist: [],
    newdata: [], //项目管家库处理后的表格数据
    value: "", //能人筛选单选点击
    argument: { //能人筛选参数
      deptId: '',
      skillType: "",
      skill: ''
    },
    locationlist: [], //区域数据
    deptid: '',
    //优先保障库
    typelist: [],
    // priority:'',//点击每一个筛选项的id
    type: '',
    local: '',
    priority: { //优先保障筛选参数
      protectType: '',
      deptId: ''
    },
    prioritylist: [],
    num:1,
    tall:1,
    numm:1,
    tell:1
  },
  changeSwiper(e) {
    console.log(e, 111)
    let current = e.currentTarget.dataset.current
    this.setData({
      current: e.currentTarget.dataset.current,
    });

    // this.reset()
    console.log(this.data.pageNum, this.data.pageNum)


  },
  //重置分页
  reset() {
    this.setData({
      pageSize: 6,
      pageNum: 1
    })
  },
  //点击筛选按钮
  showFiltrate() {
    wx.hideTabBar()

    this.setData({
      showFiltrate: true
    })
  },
  //取消筛选
  cancle() {
    wx.showTabBar()
    this.setData({
      showFiltrate: false,
      showLocation: false,
      id: '',
   

    })
  },
  //确认筛选
  confirm() {
    let newarr = []
    let servelist = this.data.servelist
    let locationlist = this.data.locationlist
    for (var a = 0; a < locationlist.length; a++) {
      if (locationlist[a].dept_id == this.data.deptid) {
        let obj = {}
        obj.dictItemName = locationlist[a].areaName
        obj.dictItemCode = locationlist[a].dept_id
        obj.parent_id = locationlist[a].parent_id

        newarr.push(obj)

      }
    }
    for (var i = 0; i < servelist.length; i++) {
      if (servelist[i].children) {
        for (var j = 0; j < servelist[i].children.length; j++) {
          if (servelist[i].children[j].dictItemCode == this.data.value) {
            newarr.push(servelist[i].children[j])
          }
        }
      }

    }
    this.setData({
      arr: newarr,
      num:1,
      manlist:[]
    })
    this.cancle()
    this.getlist(this.data.num,this.data.argument)
    console.log(newarr)

  },
  delate(e) {
    console.log(e)
    var index = e.currentTarget.dataset.idx
    var t = this
    var arr = t.data.arr
    arr.splice(index, 1)
    t.setData({
      arr: arr
    })
    console.log(arr, index)
    if (index == 0) {
      this.setData({
        deptid: '',
        "argument.deptId": ''

      })
    }
    if (index == 1) {
      this.setData({
        value: '',
        "argument.skillType": ''

      })
    }
    this.setData({
      num:1,
      argument: { //能人筛选参数
        deptId: '',
        skillType: "",
        skill: ''
      },
      manlist:[]
    })
    this.getlist(this.data.num)

  },
  // 点击全部
  recovery(){
    this.setData({
      manlist:[],
      num:1,
      argument: { //能人筛选参数
        deptId: '',
        skillType: "",
        skill: ''
      }
    })
    this.getlist(this.data.num)
  },
  //筛选
  place(e) {
    var value = e.currentTarget.dataset.value
    console.log(value)
    this.setData({
      deptid: value,
      "argument.deptId": value
    })
  },
  pitch(e) {
    console.log(e)
    //单选
    var value = e.currentTarget.dataset.value
    this.setData({
      value: value,
      "argument.skillType": value

    })
    //多选
    // var servelist = this.data.servelist

    // var value = e.currentTarget.dataset.value
    // var parentindex = e.currentTarget.dataset.parentindex

    // for (var i = 0; i < servelist.length; i++) {
    //   if (i == parentindex) {
    //     if(servelist[i].children){
    //       for (var j = 0; j < servelist[i].children.length; j++) {
    //         servelist[i].children[j].checked = false
    //       }
    //       servelist[i].children[index].checked = !servelist[i].children[index].checked;
    //     }


    //   }


    // }
    // this.setData({
    //   servelist: servelist
    // })
    // console.log(this.data.servelist)
  },


  //获取能人筛选选项
  getmantype() {
    let data = {
      dictType: 'skill_type'
    }
    get({
      link: "/baseDict/getBaseDictTree",
      data: data
    }).then(res => {
      console.log(res)
      this.setData({
        servelist: res
      })

    })
  },
  //获取能人筛选区域
  getlocation() {
    var t = this
    get({
      link: "/system/sysDept/getByParentId",
      data: {
        deptId: 35
      }
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        this.setData({
          locationlist: msg.data
        })
      }

    }).catch(error => {
      console.log(error)
    })
  },
  //获取能人列表
  getlist(key,argument) {
    let data = {
      pageSize: this.data.pageSize,
      pageNum: key
    }
    let newdata = { ...data,
      ...argument
    }

    get({
      link: "/ablePerson/list",
      data: newdata
    }).then(msg => {
      if (msg.code == 200) {
        console.log(msg.data.list)
        this.setData({
          manlist:this.data.manlist.concat(msg.data.list),//拼接显示
          tall:msg.data.total
        })

      }
    })
  },
  //项目管家库列表
  getprolist() {
    get({
      link: "/housekeeperProject/list",
      data: {

      }
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        let data = res.data.list
        let newdata = []
        data.forEach(item => {
          let type = item.projectTypeDesc
          let index
          newdata.forEach((val, i) => {
            if (val.projectTypeDesc == type) {
              index = i
            }
          })
          if (index == undefined) {
            newdata.push({
              projectTypeDesc: type,
              data: []
            })
            index = newdata.length - 1
          }
          newdata[index].data.push(item)
        })
        this.setData({
          newdata
        })
      }
    })
  },
  //项目管家库跳转
  goEach(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },

  //优先保障库筛选
  getAndshow(e) {
    console.log(e)

    wx.hideTabBar()
    let id = e.currentTarget.dataset.id

    this.setData({
      showLocation: true,
      id: e.currentTarget.dataset.id
    })

    if (id == 1) { //区域选择
      let link = '/system/sysDept/getByParentId'
      let data = {
        deptId: 35
      }
      this.gettype(link, data)
    } else if (id == 2) { //类型选择
      let link = '/baseDict/get'
      let data = {
        dictType: 'protect_type'
      }
      this.gettype(link, data)
    } else {

    }
  },

  //获取区域和类型
  gettype(link, data) {
    var t = this
    get({
      link: link,
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        this.setData({
          typelist: msg.data
        })
      }

    }).catch(error => {
      console.log(error)
    })
  },
  //点击优先保障库中筛选条件每一项
  choose(e) {
    console.log(e)
    let argu = e.currentTarget.dataset
    this.setData({
      type: argu.type || this.data.type,
      local: argu.local || this.data.local,
    })
    console.log(this.data.type,this.data.local)
  },
  //优先保障库确认筛选
  affirm() {
    this.setData({
      'priority.protectType': this.data.type,
      'priority.deptId':this.data.local,
      prioritylist:[],
      numm:1
    })
    this.cancle()
    this.getprioritylist(this.data.numm,this.data.priority)

  },
  //优先保障库列表
  getprioritylist(key,priority) {
    let data = {
      pageSize: this.data.pageSize,
      pageNum: key
    }
    let newdata = {
      ...data,
      ...priority
    }
    get({
      link: "/protectLibrary/getProtectList",
      data: newdata
    }).then( res => {
      console.log(res)
      this.setData({
        prioritylist:this.data.prioritylist.concat(res.data.list), 
        tell:res.data.total
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getmantype()
    this.getlist(this.data.num)
    this.getprolist()
    this.getlocation()
    this.getprioritylist(this.data.numm,this.data.priority)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if(this.data.current==0&&this.data.tall>this.data.num*6){
      console.log(this.data.tall)
      this.data.num+=1
      this.getlist(this.data.num,this.data.argument)
      wx.startPullDownRefresh()
   }
   if(this.data.current==2&&this.data.tell>this.data.numm*6){
     console.log(this.data.tell)
    this.data.numm+=1
    this.getprioritylist(this.data.numm,this.data.priority)
    wx.startPullDownRefresh()
 }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})