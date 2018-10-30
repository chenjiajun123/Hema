const app = getApp()
Page({
  data: {
    // 中间icon模拟数据
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
    ],
  },
  onLoad: function (options) {
  },
  // 跳转到商品列表
  Toshoplist:function(e){
    console.log(e.currentTarget.id)
    app.globalData.leibie = e.currentTarget.id;
    wx.navigateTo({
      url: "../shoplist/shoplist"
    })
  }
})