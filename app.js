//app.js
var Top = require("utils/systemTop.js");
var app=getApp();
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    var SystemInfo = wx.getSystemInfoSync();
    this.globalData.ThisSystem = SystemInfo;
    this.globalData.Top = Top.default; //将utils/stytemTop文件中的函数模块存入变量

    // wx.request({
    //   url: 'http://119.3.196.255:8094/login',
    //   header:{
    //     "clientOrigin": 2
    //   },
    //   data: {
    //     username: 'test',
    //     password: "098f6bcd4621d373cade4e832627b4f6"
    //   },
    //   success: (res) => {
    //     console.log(res)
    //     wx.setStorageSync('userCookie', res.header['Set-Cookie'])
    //   }
    // })
  },
  globalData: {
    userInfo: wx.getStorageSync("userInfo") ? wx.getStorageSync("userInfo") : '',
      //  baseUrl: "http://119.3.196.255:8094",
      //  baseUrl: "http://219.153.116.18:8081",
    // baseUrl: "http://192.168.168.9:8080",
    //aseUrl: 'https://www.sjpdqfwzx.com',
     baseUrl:'https://webservers.sjpdqfwzx.com',
    ThisSystem: {},
    userCookie: wx.getStorageSync("userCookie") ? wx.getStorageSync("userCookie") : '',
  },
  
"permission":{
  "scope.userLocation": {
  "desc": "获取位置" 
  }
  }
})