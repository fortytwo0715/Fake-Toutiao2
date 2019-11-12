// pages/landing/landing.js
Page({

  /**
   * Page initial data
   */
  data: {
    stories:[],
  },
  
  showStory(event) {
    const data = event.currentTarget.dataset;
    const id = data.id;

    wx.navigateTo({
      url: `/pages/story/story?id=${id}`
    });
  },

  getRequestData: function (res) {
    console.log(res)
    this.setData({
      stories: res.data.objects
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function () {
    let page = this
    let tableName = 'stories'
    let Story = new wx.BaaS.TableObject(tableName)

    Story.find().then(page.getRequestData)
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
    // 11月9日作业如下————
    // const page = this
    // const index_endpoint = {
    //   header: { 'Authorization': 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e' }, 
    //   url: 'https://cloud.minapp.com/oserve/v1/table/84988/record',
    //   method: 'GET',

    //   // API key from Above
    //   success(res) {
    //     console.log(res)
    //     page.setData({
    //       stories: res.data.objects
    //     })
    //   }
    // }
    // wx.request(index_endpoint)
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