var common = require('../../static/static.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: common.objUrl('img'),
    gongge_list:[
      { imgUrl: '/index/yishi.png',     txt: '执业医师', srcUrl: '', },
      { imgUrl: '/index/shicheng.png',  txt: '中医师承', srcUrl: '', },
      { imgUrl: '/index/sishu.png',     txt: '袋鼠私塾', srcUrl: '', },
      { imgUrl: '/index/shiting.png',   txt: '试听课程', srcUrl: '', },
      { imgUrl: '/index/jingpin.png',   txt: '精品图书', srcUrl: '', },
      { imgUrl: '/index/daka.png',      txt: '打卡做题', srcUrl: '', },
      { imgUrl: '/index/kaquan.png',    txt: '激活卡券', srcUrl: '', },
      { imgUrl: '/index/fenlei.png',    txt: '全部分类', srcUrl: '', },
    ],
    YiLeft:0,
  },






















  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取数据
    var self = this;
    common.yaqooPost("/Web/home", "",
      function (res) {
        self.setData({
          banner_list: res.data.data,
        })
        console.log(self.data.banner_list)
      }
    );




  },

  

  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var self = this;
    var num = 0;
    var query = wx.createSelectorQuery();
    query.select('.toutiao_text').boundingClientRect()
    setInterval(function(){
      num=num--;
      self.setData({
        YiLeft: num,
      })
      query.exec(function (res) {
        //console.log(res);  
        console.log(res[0].width);
        if (num == 0-res[0].width) {
          num = 0;
        }
      })
      
    },1)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})