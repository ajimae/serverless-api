// 'use strict'

// const AWS = require('aws-sdk')
// const dynamodb = AWS.DynamoDB.DocumentClient()

// module.exports.createTodo = function(event, context, callback) {

//   const params = {
//     TableName: 'todos',
//     key: {
//       id: event.pathParameters.id
//     }
//   }

//   dynamodb.delete(params, function () {
//     if (error) {
//       console.error(error)
//       callback(new Error(error))
//       return
//     }

//     const response = data.Item ? {
//       statusCode: 204,
//       body: JSON.stringify({})
//     } : {
//       statusCode: 404,
//       body: JSON.stringify({ "message": "Task not found" })
//     }

//     callback(null, response)
//   })
// }

'use strict'

const uuid = require('uuid')

const {
  marshall,
  unmarshall,
  client: db,
  DeleteItemCommand
} = require("../init-db")

// module.exports.deletePost = function (event, context, callback) {
//   const response = { statusCode: 200 }
//   const params = {
//     TableName: process.env.TABLE_NAME,
//     Item: marshall(JSON.stringify(event.body) || {})
//   }

//   db.send(new PutItemCommand(params), function(error, data) {
//     if (error) {
//       console.error(error)
//       response.statusCode = 500
//       response.body = JSON.stringify({
//         message: error.message || "failed to create posts.",
//         rawData: error.stack
//       })

//       callback(new Error(response))
//       return
//     }

//     response.body = JSON.stringify({
//       message: "successfully create post.",
//       data: data ? unmarshall(data) : {},
//       rawData: data 
//     })
//   })
// }

module.exports.deletePost = async (event) => {
  const response = { statusCode: 200 }
  try {
    const params = {
      TableName: process.env.TABLE_NAME,
      Key: marshall({ postId: event.pathParameters.postId })
    }
    const result = await db.send(new DeleteItemCommand(params))
    response.body = JSON.stringify({
      message: "successfully deleted post.",
      data: result
    })
  } catch (e) {
    console.log(e)
    response.statusCode = 500
    response.body = JSON.stringify({
      message: e.message || 'failed to delete post',
      stackTrace: e.stack
    })
  }

  return response
}
