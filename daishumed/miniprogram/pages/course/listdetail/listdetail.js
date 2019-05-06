var common = require('../../../static/static.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isGoBuy: false,//购物车列表
    imgUrl: common.objUrl('img'),//图片路径
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e);
    var self = this;
    self.setData({
      canshu : e,
    });
    common.yaqooPost("/Course/detail", { course_type: e.courseType,course_id: e.courseId},function(res){
      self.setData({
        course: res.data.data.course,
        kecheng: res.data.data.class_course,
        mulu: res.data.data.product_info,
        videoPlay: res.data.data.video_list,
      });
      console.log(res.data.data)
    })
  },

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