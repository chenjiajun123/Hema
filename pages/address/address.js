const app = getApp()
Page({
  data: {
    listAddress:[]
  },
  // 地址选择生命周期部分开始
  onLoad: function () {
    let that = this
    wx.getStorage({
      key: 'peopleMessage',
      success(res) {
        that.setData({
          listAddress: res.data
        })
      },
    })
  }, 
  onShow:function(){
    let that=this
    wx.getStorage({
      key: 'peopleMessage',
      success(res) {
        that.setData({
          listAddress: res.data
        })
      },
    })
  }, 
   // 地址选择生命周期部分结束
  //  跳转到新增地址页面
  address:function(){
    wx.navigateTo({
      url: "../addressAdd/addressAdd"
    })
  },
  Delete:function(e){
    app.globalData.address.splice(app.globalData.address[e.currentTarget.id], 1)
    this.setData({
      listAddress:app.globalData.address
    })
    wx.clearStorage()
    wx.setStorage({
      key: 'peopleMessage',
      data: this.data.listAddress,
      success: function () {
        wx.showToast({
          title: "地址删除成功",
          icon: 'success',
          duration: 2000
        })
      }
    })
  }
})