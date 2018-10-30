const app = getApp()
Page({
  data: {
    // 标题部分
    ctitle: '',
    // banner部分
    banner: '',
    // 主页列表信息高度
    ListHeight: '',
    // 列表信息
    List: [],
    // 模拟数据
    imgUrls: [
      '../../assets/images/indexBanner.jpg',
      '../../assets/images/indexBanner.jpg',
      '../../assets/images/indexBanner.jpg',
      '../../assets/images/indexBanner.jpg',
      '../../assets/images/indexBanner.jpg'
    ],
    midIcon: [{
        src: '../../assets/icons/index-icon-five.png',
        text: '休闲零食'
      },
      {
        src: '../../assets/icons/index-icon-six.png',
        text: '中外名酒'
      },
      {
        src: '../../assets/icons/index-icon-five.png',
        text: '饮料/水'
      },
      {
        src: '../../assets/icons/index-icon-eight.png',
        text: '乳品冲饮'
      },
      {
        src: '../../assets/icons/index-icon-nine.png',
        text: '粮油副食'
      },
      {
        src: '../../assets/icons/index-icon-ten.png',
        text: '美妆个护'
      },
      {
        src: '../../assets/icons/index-icon-eleven.png',
        text: '母婴保健'
      },
      {
        src: '../../assets/icons/index-icon-twelve.png',
        text: '厨卫清洁'
      },
      {
        src: '../../assets/icons/index-icon-threeten.png',
        text: '日用百货'
      },
      {
        src: '../../assets/icons/index-icon-five.png',
        text: '礼品卡券'
      }
    ],
    // 轮播到哪一张图片
    swiperCurrent: 0,
    // 是否自动播放
    autoplay: false,
    // 事件间隔开始
    interval: 3000,
    duration: 800,
    // 事件间隔结束
  },
  // 生命周期函数
  onLoad: function() {
    wx.request({
      url: "https://www.easy-mock.com/mock/5bc605711263521472c4913d/Hema/index",
      success: (res) => {
        console.log(res.data);
        // console.log(res.data.data.goods);
        this.setData({
          ctitle: res.data.ctitle,
          List: res.data.indexList
        })
        var query = wx.createSelectorQuery();
        //选择id
        var that = this;
        query.select('.List-pic').boundingClientRect(function(rect) {
          console.log(rect.height)
          that.setData({
            ListHeight: rect.height + 'px'
          })
        }).exec();
      }
    })
    var query = wx.createSelectorQuery();
    //选择id
    var that = this;
    query.select('.slide-image').boundingClientRect(function(rect) {
      console.log(rect.height)
      that.setData({
        banner: rect.height + 'px'
      })
    }).exec();
  },
  // 轮播调用函数
  swiperChange: function(e) {
    // console.log(e);
    this.setData({
      swiperCurrent: e.detail.current //获取当前轮播图片的下标
    })
  },
  // 跳转到商品列表
  Toshoplist: function(e) {
    console.log(e.currentTarget.id)
    app.globalData.leibie = e.currentTarget.id;
    wx.navigateTo({
      url: "../shoplist/shoplist"
    })
  },
  // 调用微信扫一扫
   scan: function () {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  Toaddress:function(){
    wx.navigateTo({
      url: "../address/address"
    })
  }
})