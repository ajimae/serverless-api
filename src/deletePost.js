'use strict'

const AWS = require('aws-sdk')
const dynamodb = AWS.DynamoDB.DocumentClient()

module.exports.deletePost = function(event, context, callback) {

  const params = {
    TableName: 'todos',
    key: {
      id: event.pathParameters.id
    }
  }

  dynamodb.delete(params, function () {
    if (error) {
      console.error(error)
      callback(new Error(error))
      return
    }

    const response = data.Item ? {
      statusCode: 204,
      body: JSON.stringify({})
    } : {
      statusCode: 404,
      body: JSON.stringify({ "message": "Task not found" })
    }

    callback(null, response)
  })
}
