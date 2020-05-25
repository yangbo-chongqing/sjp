const systemInfo = wx.getSystemInfoSync();//获取系统信息
console.log(systemInfo)
var Sys = {
  getMenuPosition() {
    let top = 4
    let right = 7
    let width = 87
    let height = 32
    //systemInfo.platform获取客户端平台，systemInfo.system 获取操作系统及版本
    if (systemInfo.platform === 'devtools' && systemInfo.system.indexOf('Android') === -1) {
      
      top = 6
      right = 10
    }
    else if (systemInfo.platform === 'devtools' && systemInfo.system.indexOf('Android') != -1) {
      // console.log(2)
      top = 8
      right = 10
    }
    else if (systemInfo.system.indexOf('Android') != -1) {
      console.log(3)
      top = 8
      right = 10
      width = 95
    }
    // systemInfo.statusBarHeight 状态栏高度
    // systemInfo.windowWidth 可用窗口高度
    return {
      top: systemInfo.statusBarHeight + top,
      left: systemInfo.windowWidth - width - right,
      width: width,
      height: height
    }
  },
  /**
   * 获取状态栏样式
   */
  getStatusBarStyle() {
    let statusBarPosition = {
      top: 0,
      left: 0,
      width: systemInfo.windowWidth,
      height: systemInfo.statusBarHeight
    }
    return this.formatStyle(statusBarPosition)
  },
  /**
   * 获取导航栏样式
   */
  getNavigationBarStyle() {
    let menuPosition = this.getMenuPosition()
    let navigationBarPosition = {
      top: systemInfo.statusBarHeight,
      left: 0,
      width: systemInfo.windowWidth,
      height: (menuPosition.top - systemInfo.statusBarHeight) * 2 + menuPosition.height,
      "line-height": (menuPosition.top - systemInfo.statusBarHeight) * 2 + menuPosition.height
    }
    return this.formatStyle(navigationBarPosition)
  },
  getMainStyle() {
    let menuPosition = this.getMenuPosition()
    let navigationBarPosition = {
      "margin-top": (menuPosition.top - systemInfo.statusBarHeight) * 2 + menuPosition.height + systemInfo.statusBarHeight
    }
    return this.formatStyle(navigationBarPosition)
  },
  /**
   * 获取导航样式
   */
  getNavigationStyle() {
    let menuPosition = this.getMenuPosition()
    let padding = systemInfo.windowWidth - menuPosition.left - menuPosition.width
    let navigationPosition = {
      top: menuPosition.top,
      left: padding,
      width: systemInfo.windowWidth - padding * 3 - menuPosition.width,
      height: menuPosition.height
    }
    return this.formatStyle(navigationPosition)
  },
  /**
   * 获取胶囊按钮样式
   */
  getMenuStyle() {
    return this.formatStyle(this.getMenuPosition())
  },
  getTopInfo() {
    let menuPosition = this.getMenuPosition();
    let TopInfo = {
      height: (menuPosition.top - systemInfo.statusBarHeight) * 2 + menuPosition.height + systemInfo.statusBarHeight,
      statusHeight: systemInfo.statusBarHeight,
      navigationHeight: (menuPosition.top - systemInfo.statusBarHeight) * 2 + menuPosition.height
    }
    return TopInfo;
  },
  title: function () {
    var x = this.data.left, t = this;
    setInterval(function () {
      x -= 10;
      if (x < -500) {
        x = 0
      }
      t.setData({ left: x })
    }, 500)
  },
  /**
   * 格式化Style
   */
  formatStyle(position) {
    let styles = []
    for (let key in position) {
      styles.push(`${key}: ${position[key]}px;`)
    }
    return styles.join(' ')
  }
};
var Top = {
  statusBarStyle: Sys.getStatusBarStyle(),
  navigationBarStyle: Sys.getNavigationBarStyle(),
  navigationStyle: Sys.getNavigationStyle(),
  menuStyle: Sys.getMenuStyle(),
  mainStyle: Sys.getMainStyle(),
  topInfo: Sys.getTopInfo()
};
export default Top;