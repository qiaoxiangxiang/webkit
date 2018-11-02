// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userImage: "",
    userName: "",
    // ceshi
    userInfo: "", //是否授权弹框
    jiazai:"向上拉加在更多",
    num: "4",
    id:"",
    video_autoplay:false,
    data_list:[
      {
        id:"1",
        Image: [
          { data_list1_img: "http://cdkey.yaqoo.com.cn/webkit_cun_img/index/index_img_04.png" },
          { data_list1_img: "http://cdkey.yaqoo.com.cn/webkit_cun_img/index/index_img_06.png" },
          { data_list1_img: "http://cdkey.yaqoo.com.cn/webkit_cun_img/index/index_img_08.png" },
          { data_list1_img: "http://cdkey.yaqoo.com.cn/webkit_cun_img/index/index_img_13.png" },
          { data_list1_img: "http://cdkey.yaqoo.com.cn/webkit_cun_img/index/index_img_14.png" },
          { data_list1_img: "http://cdkey.yaqoo.com.cn/webkit_cun_img/index/index_img_15.png" },
          { data_list1_img: "http://cdkey.yaqoo.com.cn/webkit_cun_img/index/index_img_19.png" },
          { data_list1_img: "http://cdkey.yaqoo.com.cn/webkit_cun_img/index/index_img_20.png" },
          { data_list1_img: "http://cdkey.yaqoo.com.cn/webkit_cun_img/index/index_img_21.png" }
          ],
        Text:"慧慧是个敏感的小宝贝。从她刚学会走路起，只要我和她爸爸聊天时，说话大声点儿，就以为我们吵架了就会站在我们中间呜呜呜地哭起来。惹得我们哈哈大笑，每次都要解释半天，没和爸爸吵架。",
        day:"24",
        YM:"2018.8",
        site:"北京市",
        title: "美糖宝宝 8岁零4个月了",
        Image_or_video:"1"
      },
      {
        id: "2",
        Image: [],
        Video: "http://seentao.yaqoo.cn/static/module/index/img/journalism/%E6%80%BB%E6%9C%89%E4%B8%80%E4%B8%AA%E7%90%86%E7%94%B1.mp4",
        Text: "慧慧是个敏感的小宝贝。从她刚学会走路起，只要我和她爸爸聊天时，说话大声点儿，就以为我们吵架了就会站在我们中间呜呜呜地哭起来。惹得我们哈哈大笑，每次都要解释半天，没和爸爸吵架。",
        day: "24",
        YM: "2018.8",
        site: "",
        title: "美糖宝宝 8岁零4个月了",
        Image_or_video: "2"
      },
      {
        id: "3",
        Image: [
          { data_list1_img: "http://cdkey.yaqoo.com.cn/webkit_cun_img/index/index_img_28.png" },
          { data_list1_img: "http://cdkey.yaqoo.com.cn/webkit_cun_img/index/index_img_30.png" },
          { data_list1_img: "http://cdkey.yaqoo.com.cn/webkit_cun_img/index/index_img_32.png" },
          { data_list1_img: "http://cdkey.yaqoo.com.cn/webkit_cun_img/index/index_img_36.png" },
          { data_list1_img: "http://cdkey.yaqoo.com.cn/webkit_cun_img/index/index_img_37.png" },
          { data_list1_img: "http://cdkey.yaqoo.com.cn/webkit_cun_img/index/index_img_38.png" },
          { data_list1_img: "http://cdkey.yaqoo.com.cn/webkit_cun_img/index/index_img_42.png" },
          { data_list1_img: "http://cdkey.yaqoo.com.cn/webkit_cun_img/index/index_img_43.png" },
          { data_list1_img: "http://cdkey.yaqoo.com.cn/webkit_cun_img/index/index_img_45.png" }
        ],
        Text: "慧慧是个敏感的小宝贝。从她刚学会走路起，只要我和她爸爸聊天时，说话大声点儿，就以为我们吵架了就会站在我们中间呜呜呜地哭起来。惹得我们哈哈大笑，每次都要解释半天，没和爸爸吵架。",
        day: "24",
        YM: "2018.8",
        site: "北京市",
        title: "美糖宝宝 8岁零4个月了",
        Image_or_video: "1"
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        self.setData({
          userInfo: !res.authSetting['scope.userInfo'],//用户是否已授权 未授权false
        })
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              wx.setStorage({
                key: 'token',
                data: res,
              })
              let user = res.userInfo;
              self.setData({
                userImage: user.avatarUrl,
                userName: user.nickName,
              })
            }
          })
        }
      }
    });
  },
  // 事件
  scrolltolower: function () {
    console.log("lower");
  },
  // 获取用户信息
  onGotUserInfo: function (e) {
    const self = this;
    self.setData({
      userInfo: false,//用户是否已授权 未授权false
    });
    wx.login({
      success: function (res) {
        res.code//用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 api，使用 code 换取 openid 和 session_key 等信息
        res.errMsg//调用结果
        console.log(res)
        if (res.errMsg.slice(res.errMsg.length - 2, res.errMsg.length) == "ok") {
          wx.getUserInfo({
            // 用户授权
            success: function (res) {
              let user = res.userInfo;
              self.setData({
                userImage: user.avatarUrl,
                userName: user.nickName,
              })
            },
            // 用户未授权
            fail:function(res){
              console.log(res)
              console.log(2222222222)
            }
          })
        }
      }

    });

    wx.setNavigationBarTitle({
      title: '首页'
    })
  },
  videoInfo:function(e){
    let info = e.currentTarget.dataset.info;
    this.setData({
      id:info.id
    });
  },
  // 底部页面跳转
  chengzhang() {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  baby_quan() {
    wx.navigateTo({
      url: '../baobao_quan/baobao_quan',
    })
  },
  tianjia() {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  huodong() {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  my_xinxi() {
    wx.navigateTo({
      url: '../index/index',
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
    
    var obj = {
      id: (this.data.num++)+"",
      Image: [],
      Video: "http://seentao.yaqoo.cn/static/module/index/img/journalism/%E6%80%BB%E6%9C%89%E4%B8%80%E4%B8%AA%E7%90%86%E7%94%B1.mp4",
      Text: "慧慧是个敏感的小宝贝。从她刚学会走路起，只要我和她爸爸聊天时，说话大声点儿，就以为我们吵架了就会站在我们中间呜呜呜地哭起来。惹得我们哈哈大笑，每次都要解释半天，没和爸爸吵架。",
      day: "24",
      YM: "2018.8",
      site: "",
      title: "美糖宝宝 8岁零4个月了",
      Image_or_video: "2"
    };
    var array = this.data.data_list;
    array.push(obj);

    this.setData({
      jiazai: "加载中...",
      data_list: array
    })
    console.log(array)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})