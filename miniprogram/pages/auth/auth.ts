// pages/auth/auth.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headUrl: '', // 建议在这里填入一个默认头像的本地路径，例如 '/images/default.png'
    userName: '',
    usagesRoom: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(param: any) {
    console.log(param.scene)
    if (param.scene) {
      // 处理扫码进房逻辑
    }
  },

  /**
   * 生命周期函数--监听页面显示 (用 onShow 更好，每次切回页面都能触发回显)
   */
  onShow() {
    // 【修复核心 1：数据回显】每次进入页面，尝试从本地缓存获取头像和昵称
    const savedAvatar = wx.getStorageSync('userAvatar');
    const savedName = wx.getStorageSync('userName');

    if (savedAvatar) {
      this.setData({ headUrl: savedAvatar });
    }
    if (savedName) {
      this.setData({ userName: savedName });
    }
  },

  /**
   * 处理头像选择 (对应 wxml 中的 bindchooseavatar="setHead")
   */
  setHead(e: any) {
    const tempAvatarUrl = e.detail.avatarUrl;

    // 1. 更新页面数据，立即在前端展示
    this.setData({
      headUrl: tempAvatarUrl
    });

    // 【修复核心 2：保存数据】将临时路径存入本地缓存，防止下次进来丢失
    wx.setStorageSync('userAvatar', tempAvatarUrl);

    /**
     * 【强烈建议】：这里只是存了临时路径。
     * 实际生产环境中，临时路径过段时间可能会失效。
     * 您应该在这里调用 wx.uploadFile 把 tempAvatarUrl 传给您的 Java 后端，
     * 换取一个永久的 OSS 网络链接，然后再把那个永久链接存入 setStorageSync。
     */
  },

  /**
   * 处理用户名输入 (对应 wxml 中的 bindblur="setName")
   */
  setName(e: any) {
    const name = e.detail.value;
    this.setData({
      userName: name
    });
    // 同理，也把昵称存起来
    wx.setStorageSync('userName', name);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  login(){
    // todo 发出请求,把code传给后台,后台去获取openId,然后返回成功
    wx.login({
      success: function (res) {
        if (res.code) {
          // 请求后台
          
        }
      }
    })
  }
})