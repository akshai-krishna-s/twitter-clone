import formidable from 'formidable'

export default defineEventHandler(async (event) => {
  const form = formidable({})

  const response = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) {
        reject(err)
      }

      resolve({ fields, files })
    })
  })

  const { fields, files } = response

  const userId = event.context?.auth?.user.id

  const tweetData = {
    text: fields.text,
    authorId: userId,
  }

  return {
    tweetData,
  }
})
