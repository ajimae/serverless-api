'use strict'

const {
  marshall,
  client: db,
  GetItemCommand,
} = require("../init-db")

module.exports.getPost = function (event, context, callback) {
  let params
  const postId = event.pathParameters?.postId ?? null
  if (postId) {
    params = {
      TableName: process.env.TABLE_NAME,
      key: marshall({ postId })
    }
  } else {
    params = {}
  }

  db.get(params, function (error, data) {
    if (error) {
      console.error(error)
      callback(new Error(error))
      return
    }

    if (data) {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(data)
      })
      return
    }
    callback(null, {
      statusCode: 404,
      message: 'resource not found on this server',
      body: JSON.stringify({})
    })
  })
}
