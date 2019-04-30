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
    YiLeft:0,//文字滚动
    leibie: ["执业医师", "执业药师", "中医师承", "确有专长", "袋鼠私塾课", "乡村全科","知识传播普及产品"],
    shopList : "",//加入购物车  立即购买  列表
    isGoBuy: false, // 是否加入购物车 默认false
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
    common.yaqooPost('/Course/recommended', {rand_num: 10},
      function(res){
        var dataArray = [];
        for(var i in res.data.data){
          var data = res.data.data[i];
          dataArray.push(data)
        }
        self.setData({
          shopKe_list: dataArray,
        });
        console.log(self.data.shopKe_list);
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
    query.select('.toutiao_text').boundingClientRect();
    // setInterval(function(){
    //   num--;
    //   self.setData({
    //     YiLeft: num,
    //   })
    //   query.exec(function (res) {
    //     console.log(res);  
    //     console.log(res[0].width);
    //     console.log(parseInt(0-res[0].width / 16) +"----"+ self.data.YiLeft);
    //     if (num == parseInt(0-(res[0].width/16))) {
    //       num = 0;
    //     }
    //   })
      
    // },30)
  },
// *********************************************************************************
  // 购买课程
  shopBuy:function(event){
    var datas = common.eventdata(event).item;
    var self = this;
    common.yaqooPost('/Course/class_course', { course_type: datas.course_type },
      function (data) {
        var list = data.data.data;
        // 选中哪一门课
        for(var i in list){
          list[i].isshow = false;
        };
        // 默认选中第一门
        list[0].isshow = true;
        datas.spec = list;
        datas.imgUrl = self.data.imgUrl;
        // 可购买两年  默认不被选中
        datas.towYear = false;
        self.setData({
          shopList : datas,
          isGoBuy  : true,
        })
        console.log(self.data.shopList)
      },
    )
  },
  shopping_cha(){
    this.setData({
      isGoBuy: false,
    })
  },
  // 选中那门课
  shop_huan:function(event){
    var num = common.eventdata(event).indexs;
    var list = this.data.shopList;
    // 清空 所有不选中
    for (var i in list.spec) {
      list.spec[i].isshow = false;
    };
    // 选中的
    list.spec[num].isshow = true;
    // 改变值
    this.setData({
      shopList: list,
    });
    console.log(this.data.shopList)
  },
  // 加入购物车
  shopping_gobuy:function(event){
    var list = common.eventdata(event).list;
    // 加入购物车 加的参数
    var parse = { 'course_id': "", 'spec_key': ""};
    for(var i in list.spec){
      // 选中那个课
      if(list.spec[i].isshow){
        parse.course_id = list.spec[i].course_id;
        // 判断一年还是两年
        if (list.towYear){
          parse.spec_key = list.spec[i].spec[1].key;
        }else{
          parse.spec_key = list.spec[i].spec[0].key;
        }
        break;
      }
    }
    common.yaqooPost("/Cart/add", parse,function(res){
      console.log(res)
    })
  },
  

// ******************************************************


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