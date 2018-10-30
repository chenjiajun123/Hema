const app = getApp()
const Reg = require('../../utils/Reg.js')
Page({
  data: {
    //新增地址里面选择地区需要的数据开始
    region: [],
    customItem: '全部',
    // 新增地址里面选择地区需要的数据结束
    // 新增地址最终提交的所有信息开始
    peopleMessage: [],
    // 新增地址最终提交的所有信息结束
    // 新增地址其他选择需要的数据开始
    detail: '',
    connect: '',
    Phone: ''
    // 新增地址其他选择需要的数据结束
  },
  // 调用微信选择地区API
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  //新增地址各个表单分别需要调用的方法开始
  detailAddress: function(e) {
    this.setData({
      detail: e.detail.value
    })
  },
  connectPeople: function(e) {
    this.setData({
      connect: e.detail.value
    })
  },
  phone: function(e) {
    this.setData({
      Phone: e.detail.value
    })
  },
  //新增地址各个表单分别需要调用的方法结束
  // 新增地址最终保存地址调用的方法开始
  addressSave: function() {
    if (this.data.region.length===0) {
      wx.showToast({
        title: '请选择地区',
        icon:'none',
        duration: 2000
      })
    } else if (this.data.detail === '') {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none',
        duration: 2000
      })
    } else if (!Reg.Regusername(this.data.connect)) {
      wx.showToast({
        title: '请输入正确的联系人',
        icon: 'none',
        duration: 2000
      })
    } else if (!Reg.RegTelPhone(this.data.Phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000
      })
    } else {
      let obj = {}
      obj.region = this.data.region
      obj.detail = this.data.detail
      obj.connect = this.data.connect
      obj.Phone = this.data.Phone
      app.globalData.address.push(obj)
      this.data.peopleMessage = app.globalData.address
      // 设置缓存
      wx.setStorage({
        key: 'peopleMessage',
        data: this.data.peopleMessage,
        success: function() {
          wx.showToast({
            title: "地址保存成功",
            icon: 'success',
            duration: 2000
          })
          setTimeout(function() {
            wx.navigateTo({
              url: "../address/address"
            })
          }, 1000);
        }
      })
    }
  }
  // 新增地址最终保存地址调用的方法结束
})