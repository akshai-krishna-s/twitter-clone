export default () => {
  const postTweet = (formData) => {
    const form = new FormData()

    form.append('text', formData.text)
    formData.mediaFiles.forEach((mediaFiles, index) => {
      form.append('media_file_' + index, mediaFiles)
    })

    return useFetchApi('/api/user/tweets', {
      method: 'POST',
      body: form,
    })
  }

  return {
    postTweet,
  }
}
