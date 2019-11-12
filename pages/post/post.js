// pages/post/post.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {

  },

  formSubmit(event) {
    console.log(event)
    // 向 tableName 为 'product' 的数据表插入一条记录
    let tableName = 'stories'
    let Story = new wx.BaaS.TableObject(tableName)
    let story = Story.create()
    let data = event.detail.value
    story.set(data).save().then(this.submitSuccess)

    // let story = event.detail.value
    // // app.globalData.stories.unshift(story)

    // wx.request({
    //   url: `https://cloud.minapp.com/oserve/v1/table/84988/record/`,
    //   method: 'POST',
    //   header: {
    //     'Authorization': 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e'
    //   },
    //   data: story,
    //   success: this.submitSuccess
    // })

  },

  submitSuccess(res) {
    console.log(res)
    if (res.statusCode === 201) {
      // wx.navigateBack()
      wx.showToast({
        title: 'Yay',
        icon: 'success'
      })
      setTimeout(() => wx.redirectTo({
        url: '/pages/landing/landing',
      }), 200)
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})