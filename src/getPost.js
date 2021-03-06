'use strict'

const {
  marshall,
  unmarshall,
  client: db,
  GetItemCommand,
} = require("../init-db")

module.exports.getPost = async (event) => {
  const response = { statusCode: 200 }
  try {
    const params = {
      TableName: process.env.TABLE_NAME,
      Key: marshall({ postId: event.pathParameters.postId })
    }

    const { Item } = await db.send(new GetItemCommand(params))
    response.body = JSON.stringify({
      message: "successfully retrieved post.",
      data: Item ? unmarshall(Item) : {},
    })
  } catch (e) {
    console.log(e)
    response.statusCode = 500
    response.body = JSON.stringify({
      message: e.message || 'failed to get post',
      stackTrace: e.stack
    })
  }

  return response
}
