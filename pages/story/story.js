// pages/story/story.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    sid: '',
    story:[],
    comments:[],
    
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const id = options.id
    this.setData({
      sid: options.id
    })
    // console.log('getting id', id)
    const index_endpoint = {
      url: `https://cloud.minapp.com/oserve/v1/table/84988/record/${id}`,
      method: 'GET',
      header: {
        'Authorization': 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e'
      },
      success: this.getResult,
    }
    wx.request(index_endpoint)

    const request = {
      url: 'https://cloud.minapp.com/oserve/v1/table/85188/record/',
      method: 'GET',
      header: { 'Authorization': 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e' },
      success: this.getComment,
      data: {
        where: { // filtering comments for a specific story
          "story_id": { "$eq": id } // story id
        }
      }
    }
    wx.request(request)
  },

  getResult(res) {
    console.log('one story', res)
    this.setData({
      story: res.data
    })
  },

  getComment(res) {
    console.log('one comment', res)
    this.setData({
      comments: res.data.objects
    })
  },

  formSubmit(event) {
    console.log(event)
    let comment = event.detail.value
    // app.globalData.comments.unshift(comment)
    comment.story_id = this.data.sid
    wx.request({
      url: 'https://cloud.minapp.com/oserve/v1/table/85188/record/',
      data: comment,
      method: 'POST',
      header: { 'Authorization': 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e' },
      success: this.submitSuccess
    })

  },

  submitSuccess(res) {
    console.log(res)
    if (res.statusCode === 201) {
      wx.navigateBack()
      wx.showToast({
        title: 'Yay',
        icon: 'success'
      })
    }
  },

  deleteComment(event) {
    const data = event.currentTarget.dataset;
    // make a DELETE request
    wx.request({
      url: `https://cloud.minapp.com/oserve/v1/table/85188/record/${data.id}`,
      method: 'DELETE',
      header: { 'Authorization': 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e' }, // API key from Above

      success() {
        // no need for response data
        // redirect to index page when done
        wx.redirectTo({
          url: '/pages/landing/landing'
        });
      }
    });
  },

  voteComment(event) {
    const page = this
    const data = event.currentTarget.dataset;
    const votes = data.votes;
    const new_votes = { votes: votes + 1 };
    wx.request({
      url: `https://cloud.minapp.com/oserve/v1/table/85188/record/${data.id}`,
      method: 'PUT',
      header: { 'Authorization': 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e' }, // API key from Above
      data: new_votes,
      success(res) {
        console.log(res)
        const new_comment = res.data
        let comments = page.data.comments
        let comment = comments.find(comment => comment._id == new_comment.id)
        comment.votes = new_comment.votes
        page.setData({ comments: comments })
      }
    })
  },

  downVote (event) {
    const page = this
    const data = event.currentTarget.dataset;
    console.log(data)
    var opt = {
      url: `https://cloud.minapp.com/oserve/v1/table/85188/record/${data.id}`,  // 3906 对应 :table_id, 5a33406909a805412e3169xx 对应 :record_id
      method: 'PUT',
      header: {
        Authorization: `Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e`,
      },
      // json: {   // 指定 data 以 "Content-Type": 'application/json' 传送
      //   votes: {
      //     "$incr_by": -1
      //   }
      // },
      data: {
        "votes": {
          "$incr_by": -1
        }
      },
      success(res) {
        console.log(res)
        const new_comment = res.data
        let comments = page.data.comments
        let comment = comments.find(comment => comment._id == new_comment.id)
        comment.votes = new_comment.votes
        page.setData({ comments: comments })
      }
    }
    wx.request(opt)
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