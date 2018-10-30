const app = getApp();
Page({
  data:{ 
    // 商品列表
    list:[]
  },
  // 生命周期函数
  onLoad: function (options) {
    wx.request({
      url: "https://www.easy-mock.com/mock/5bc605711263521472c4913d/Hema/leibie",
      success: (res) => {
        this.setData({
          list: res.data.shoplist[app.globalData.leibie].shopList
        })
      }
    })   
  }, 
  // 加入商品到购物车
  Tocar:function(e){
    const car=app.globalData.car
    const good=this.data.list[e.currentTarget.id]
    var flag=false
    flag=car.some((item)=>{
      return item===good
    })
    if(!flag){
      car.push(good)
      wx.showToast({
        title: '商品已加入购物车',
        icon:'success',
        duration:2000
      })
    }else{
      wx.showToast({
        title: '该商品已存在',
        icon: 'success',
        duration: 2000
      })
      this.data.list[e.currentTarget.id].count++
    }
  },
  navigator:function(){
    wx.switchTab({
      url: "../shop/shop"
    })
  },
  // 下拉刷新需要的函数
  onReachBottom: function () {
    let _this = this;
    /**显示loading */
    wx.showLoading({
      title: '数据加载中',
      duration: 1000
    })
    let Request=this.newsrequest
    setTimeout(Request,1000) 
    wx.hideNavigationBarLoading();
    // console.log(_this.data.newslists)
  },
  /**请求数据 */
  // 下拉刷新需要的函数
  newsrequest: function () {
    let _this = this;
    // console.log(_this.data.page)
    wx.request({
      url: "https://www.easy-mock.com/mock/5bc605711263521472c4913d/Hema/leibie",
      success: (res) => {
        let newlist = res.data.shoplist[app.globalData.leibie].shopList
        if (newlist.length > 0) {
          /*此时会发现数据被添加到原有数据的后边类似上拉加载更多*/
          _this.setData({
            list: _this.data.list.concat(newlist)
          });
        }
      }
    })   
  },
})