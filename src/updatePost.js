'use strict'

const uuid = require('uuid')

const {
  marshall,
  unmarshall,
  client: db,
  UpdateItemCommand,
} = require("../init-db")

// module.exports.updatePost = function (event, context, callback) {
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
//         message: error.message || "failed to update posts.",
//         rawData: error.stack
//       })

//       callback(new Error(response))
//       return
//     }

//     response.body = JSON.stringify({
//       message: "successfully updated post.",
//       data: data ? unmarshall(data) : {},
//       rawData: data 
//     })
//   })
// }


module.exports.updatePost = async (event) => {
  const response = { statusCode: 200 }
  try {
    const body = JSON.parse(event.body)
    const keys = Object.keys(body)
    const params = {
      TableName: process.env.TABLE_NAME,
      Key: marshall({ postId: event.pathParameters.postId }),
      // updateExpression: "SET #attrName = :attriValue",
      // "ExpressionAttributeNames": {
      //   "#attrName": "SessoinID"
      // },
      // "ExpressionAttributeValues": {
      //   ":attrValue": {
      //     "S": "some string value"
      //   }
      // }
      UpdateExpression: `SET ${keys.map((_, index) => `#key${index} = :value${index}`).join(", ")}`,
      ExpressionAttributeNames: keys.reduce((acc, key, index) => ({
        ...acc,
        [`#key${index}`]: key
      }), {}),
      ExpressionAttributeValues: marshall(keys.reduce((acc, key, index) => ({
        ...acc,
        [`:value${index}`]: body[key]
      }), {}))
    }
    const result = await db.send(new UpdateItemCommand(params))
    response.body = JSON.stringify({
      message: "successfully updated post.",
      data: result
    })
  } catch (e) {
    console.log(e)
    response.statusCode = 500
    response.body = JSON.stringify({
      message: e.message || 'failed to update post',
      stackTrace: e.stack
    })
  }

  return response
}
