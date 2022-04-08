'use strict'

const { v4: uuidv4 } = require('uuid')

const {
  marshall,
  client: db,
  PutItemCommand,
} = require("../init-db")

module.exports.createPost = async (event) => {
  const response = { statusCode: 201 }
  try {
    const body = JSON.parse(event.body)
    const params = {
      Item: marshall({ ...body, postId: uuidv4() } || {}),
      TableName: process.env.TABLE_NAME,
    }

    const result = await db.send(new PutItemCommand(params))
    response.body = JSON.stringify({
      message: "successfully created post.",
      data: result
    })
  } catch (e) {
    console.log(e)
    response.statusCode = 500
    response.body = JSON.stringify({
      message: e.message || 'failed to create post',
      stackTrace: e.stack
    })
  }

  return response
}
