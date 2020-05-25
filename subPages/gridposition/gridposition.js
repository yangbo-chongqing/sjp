const app = getApp();
import { get,post } from "../../assets/js/request"
Page({
  data: {
    mytop: {
      title: "",
      color: "#000",
      background: "transparent",
      showBack: true
    },
    Top: app.globalData.Top,
    collection: {},
    isHide: true,
    latitude: 0,
    longitude: 0,
    markers: []
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
    this.getlocation()
  },
  getlocation() {
    let _this = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      }
    })
  },
  open(event) {
    console.log(event);
    let i = event.markerId;
    let num = event.target.dataset.id
    num.forEach(element => {
      if (element.id == i) {
        console.log(element);
        this.setData({
          isHide: false,
          collection: element
        })
      }
    });
  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function () {
    this.mapCtx.translateMarker({
      markerId: 1,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function () {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
  },
  getOneImg(val) {
    if (val) {
      return val.split(',')[0]
    } else {
      return 'https://www.mlxc365.com/images/zhongyixiang/zanwuneirongtupian.png'
    }
  },
  // 地图导航
  goToMap(val) {
    let lat = val.currentTarget.dataset.lat
    let lon = val.currentTarget.dataset.lon
    wx.openLocation({
      latitude: Number(lat),
      longitude: Number(lon),
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  // 获取数据
  getMap() {
    let _this = this
    get({
      link: '/gridPosition/getAll'
    }, {
        // news_type: 34
      }).then(msg => {
        let list = []
        console.log(msg);
        msg.data.list.forEach(val => {
          list.push({
            id: val.gridId,
            latitude: val.latitude,
            longitude: val.longitude,
            name: val.gridName,
            // instructions: val.areaName,
            img: val.gridImg
          })
        })
        console.log(list);
        _this.setData({
          markers: list
        })
      }).catch(error => {
        console.log(error);
      })
  },
  // 跳转
  goMsg(value) {
    let id = value.currentTarget.dataset.id
    wx.navigateTo({
      url: '/subPages/ruralTourism/scenicMsg/scenicMsg?id=' + id
    })
  },
  onLoad: function () {
    this.getMap()
    wx.setNavigationBarTitle({
      title: '网格阵地',
    })
  }
})