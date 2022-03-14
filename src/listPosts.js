'use strict'

const AWS = require('aws-sdk')
const dynamodb = AWS.DynamoDB.DocumentClient()

module.exports.listTodo = function(event, context, callback) {

  dynamodb.scan(params, function(error, data) {
    if (error) {
      console.error(error)
      callback(new Error(error))
      return
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(data.Items)
    }

    callback(null, response)
  })
}
