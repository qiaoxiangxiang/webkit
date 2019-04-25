//index.js
var php_Url = "https://daishu.daishumed.com/index.php";//接口域名

function objUrl(type){
  return type == "img" ?"http://t-www.daishumed.com/webkit_img": "";//图片相对应的路径
  
}
// 授权并获取openid值
function userName() {
  // 获取用户信息
  wx.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            wx.setStorageSync(userName, res)

            // 接受授权后登录
            wx.login({
              success(res) {
                if (res.code) {
                  // 发起网络请求
                  // wx.request({
                  //   url: 'https://test.com/onLogin',
                  //   data: {
                  //     code: res.code
                  //   },
                  //   success: res => {
                  //       wx.setStorageSync('openid',res.openid)
                  //    },
                  //     fail: err => {
                  //      
                  //     }
                  // })
                  SetToken(res.code);
                  console.log('登录成功' + res.code)
                } else {
                  console.log('登录失败！' + res.errMsg)
                }
              }
            })

          }
        })
      }
    }
  })
}

// 保存token到本地
function SetToken(token) {
  wx.setStorageSync('Token', token);
}

// 获取本地存的token
function getToken() {
  return wx.getStorageSync('Token');
}

// 获取数据接口
function yaqooPost(url, parameter,succes) {
  wx.request({
    url: php_Url + url,
    data: parameter,
    header: {
      Authorization: getToken,
    },
    success: succes,
    fail: err => {
      console.log(err);
    },
  })
};


// 上传图片
function doUpload() {
  // 选择图片
  wx.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: function (res) {

      wx.showLoading({
        title: '上传中',
      })

      const filePath = res.tempFilePaths[0]

      // 上传图片
      const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
      wx.cloud.uploadFile({
        cloudPath,
        filePath,
        success: res => {
          console.log('[上传文件] 成功：', res)

          app.globalData.fileID = res.fileID
          app.globalData.cloudPath = cloudPath
          app.globalData.imagePath = filePath

          wx.navigateTo({
            url: '../storageConsole/storageConsole'
          })
        },
        fail: e => {
          console.error('[上传文件] 失败：', e)
          wx.showToast({
            icon: 'none',
            title: '上传失败',
          })
        },
        complete: () => {
          wx.hideLoading()
        }
      })

    },
    fail: e => {
      console.error(e)
    }
  })
};

// 
module.exports = {
  yaqooPost: yaqooPost, //获取接口返回参数
  userName: userName,   //用户授权 并保存用户openid
  SetToken: SetToken,   //保存 token
  getToken: getToken,   //获取 token
  doUpload: doUpload,   //上传图片
  objUrl: objUrl,       //所有相关的路径
}