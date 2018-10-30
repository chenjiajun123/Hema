const app = getApp()
Page({
  data: {
    // 购物车列表数组
    carlist: [],
    // 商品左侧图片信息
    carlistImage: '',
    // 状态
    status: 'circle',
    // 总价
    money: 0
  },
  // 生命周期函数开始
  onLoad: function(options) {
    this.setData({
      carlist: app.globalData.car
    })
    let query = wx.createSelectorQuery();
    //选择id
    query.select('.shoplist-image').boundingClientRect((rect) => {
      console.log(rect.height)
      this.setData({
        carlistImage: rect.height + 'px'
      })
    }).exec();
    this.allselect()
    this.sumMoney()
  },
  onShow: function() {
    
    this.setData({
      carlist: app.globalData.car
    })
    this.allselect()
    this.sumMoney()

  },
  onReady: function() {
    this.setData({
      carlist: app.globalData.car
    })
    this.allselect()
    this.sumMoney()
  },
  onHide: function() {
  },
  onUnload: function() {
  },
  // 生命周期函数结束
  // 购物车全选或反选
  selectAll: function(e) {
    if (this.data.status === 'circle') {
      this.data.status = "success"
      this.data.carlist.map((item, index, key) => {
        item.type = 'success'
      })
    } else {
      this.data.status = "circle"
      this.data.carlist.map((item, index, key) => {
        item.type = 'circle'
      })
    }
    this.setData({
      status: this.data.status
    })
    this.setData({
      carlist: this.data.carlist
    })
    this.sumMoney()
  },
  // 购物车单个物品选中或未被选中判断
  selectNo: function(e) {
    if (this.data.carlist[e.currentTarget.id].type === 'circle') {
      this.data.carlist[e.currentTarget.id].type = 'success'
    } else {
      this.data.carlist[e.currentTarget.id].type = 'circle'
    }
    this.setData({
      carlist: this.data.carlist
    })
    this.sumMoney()
    this.allselect()
  },
  // 购物车全选标志判断
  allselect: function() {
    if (this.data.carlist.length > 0) {
      let sympol = this.data.carlist.some((item) => {
        return item.type === 'circle'
      })
      if (sympol) {
        this.data.status = 'circle'
      } else {
        this.data.status = 'success'
      }
      this.setData({
        status: this.data.status
      })
    } else {
      this.data.status = 'circle'
      this.setData({
        status: this.data.status
      })
    }
  },
  // 购物车商品删除
  Delete: function() {
    let _this = this
    const Car = app.globalData.car
    let sel = this.data.carlist.filter(item => item.type === "success")
    console.log(sel)
    wx.showModal({
      title: '确定要删除商品吗',
      success: (res) => {
        if (res.confirm) {
          sel.map(item => {
            _this.data.carlist.splice(_this.data.carlist.indexOf(item), 1)
            Car.splice(_this.data.carlist.indexOf(item), 1)
          })
          _this.setData({
            carlist: _this.data.carlist
          })
          _this.allselect()
          _this.sumMoney()
        } else if (res.cancel) {

        }
      }
    })
  },
  // 购物车商品数量减少
  reduce: function(e) {
    if (this.data.carlist[e.currentTarget.id].count <= 1) {
      this.data.carlist[e.currentTarget.id].count = 1;
      wx.showModal({
        title: '数量小于1',
        content: '不允许操作',
        duration: 2000
      })
    } else {
      this.data.carlist[e.currentTarget.id].count--
    }
    this.setData({
      carlist: this.data.carlist
    })
    this.sumMoney()
  },
  // 购物车商品数量增加
  add: function(e) {
    this.data.carlist[e.currentTarget.id].count++
      this.setData({
        carlist: this.data.carlist
      })
    this.sumMoney()
  },
  // 购物车计算总价
  sumMoney: function() {
    let sum = this.data.money
    let Sum = this.data.carlist.filter((item, index, key) => {
      if (item.type === 'success') {
        return item
      }
    })
    if (Sum.length >= 1) {
      sum = 0
      for (let i = 0; i < Sum.length; i++) {
        sum += Sum[i].count * Sum[i].price
      }
    } else {
      sum = 0
    }
    this.setData({
      money: sum
    })
  }
})