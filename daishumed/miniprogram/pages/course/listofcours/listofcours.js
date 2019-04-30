var common = require('../../../static/static.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: common.objUrl('img'),
    dataList:[],
    shopList: "",//加入购物车  立即购买  列表
    isGoBuy: false, // 是否加入购物车 默认false
    istoubu: false,
    istoubuFan:"",//第二个头部传参
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1、执业医师 2、执业药师 3、中医师承 4、确有专长 5、知识付费 6、乡村全科 7、知识传播普及产品
    var self = this;
    
    // 1、执业医师
    common.yaqooPost("/Course/index",{'list_type':'1'},function(res){
      self.setData({
        dataList: res.data.data,
      })
      console.log(self.data.dataList)
    });
    // 4、确有专长
    
    // 5、知识付费
    
    //获取手机可视区域的高度
    wx.getSystemInfo({
      success: function (res) {
        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        let ratio = clientWidth / 750;
        let height = clientHeight / ratio;
        
        self.setData({
          height: height
        });
      }
    });
  },
// 滚动条位置
  scroll(e) {
    var self = this;
    console.log(e.detail.scrollTop);
    var num = 0;
    var imgUrl = self.data.imgUrl;
    common.scroll_juli(".listofcourse_content",function(res){
      console.log(res)
      if (e.detail.scrollTop > num){
        if (res.top <= 0) {
          self.data.istoubu = true;
          self.setData({
            istoubuFan: {
              "imgUrl": imgUrl,
              "txt": "执业医师",
            },
          })
        }
      }else{
        if (res.top <= 0 && res.bottom >= 0) {
          self.data.istoubu = true;
          self.setData({
            istoubuFan: {
              "imgUrl": imgUrl,
              "txt": "执业医师",
            },
          })
        }
      }
      
    });
    common.scroll_juli(".listofcourse_topTxt", function (res) {
      if (e.detail.scrollTop > num) {
        if (res.top <= 0) {
          self.setData({
            istoubuFan: {
              "imgUrl": imgUrl,
              "txt": "全部",
            },
          })
        }
      } else {
        if (res.top <= 0 && res.bottom >= 0) {
          self.setData({
            istoubuFan: {
              "imgUrl": imgUrl,
              "txt": "全部",
            },
          })
        }
      }
    });
    
    num = e.detail.scrollTop;
  },

  


  // *********************************************************************************
  // 购买课程
  shopBuy: function (event) {
    var datas = common.eventdata(event).item;
    var self = this;
    common.yaqooPost('/Course/class_course', { course_type: datas.course_type },
      function (data) {
        var list = data.data.data;
        // 选中哪一门课
        for (var i in list) {
          list[i].isshow = false;
        };
        // 默认选中第一门
        list[0].isshow = true;
        datas.spec = list;
        datas.imgUrl = self.data.imgUrl;
        // 可购买两年  默认不被选中
        datas.towYear = false;
        self.setData({
          shopList: datas,
          isGoBuy: true,
        })
        console.log(self.data.shopList)
      },
    )
  },
  shopping_cha() {
    this.setData({
      isGoBuy: false,
    })
  },
  // 选中那门课
  shop_huan: function (event) {
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
  shopping_gobuy: function (event) {
    var list = common.eventdata(event).list;
    // 加入购物车 加的参数
    var parse = { 'course_id': "", 'spec_key': "" };
    for (var i in list.spec) {
      // 选中那个课
      if (list.spec[i].isshow) {
        parse.course_id = list.spec[i].course_id;
        // 判断一年还是两年
        if (list.towYear) {
          parse.spec_key = list.spec[i].spec[1].key;
        } else {
          parse.spec_key = list.spec[i].spec[0].key;
        }
        break;
      }
    }
    common.yaqooPost("/Cart/add", parse, function (res) {
      console.log(res)
    })
  },


// ******************************************************



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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