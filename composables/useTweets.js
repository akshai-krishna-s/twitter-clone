export default () => {
  const usePostTweetModal = () => useState('post_tweet_modal', () => false)
  const useReplyTweet = () => useState('reply_tweet', () => null)

  const setReplyTo = (tweet) => {
    const replyTweet = useReplyTweet()
    replyTweet.value = tweet
  }

  const openPostTweetModal = (tweet = null) => {
    const postTweetModal = usePostTweetModal()
    postTweetModal.value = true

    setReplyTo(tweet)
  }

  const closePostTweetModal = () => {
    const postTweetModal = usePostTweetModal()
    postTweetModal.value = false
  }

  const postTweet = (formData) => {
    const form = new FormData()

    form.append('text', formData.text)
    form.append('replyTo', formData.replyTo)
    formData.mediaFiles.forEach((mediaFiles, index) => {
      form.append('media_file_' + index, mediaFiles)
    })

    return useFetchApi('/api/user/tweets', {
      method: 'POST',
      body: form,
    })
  }

  const getTweets = (params = {}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await useFetchApi('/api/tweets', {
          method: 'GET',
          params,
        })
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }

  const getTweetById = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await useFetchApi(`/api/tweets/${id}`, {
          method: 'GET',
        })
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    postTweet,
    getTweets,
    getTweetById,
    closePostTweetModal,
    usePostTweetModal,
    openPostTweetModal,
    useReplyTweet,
  }
}
