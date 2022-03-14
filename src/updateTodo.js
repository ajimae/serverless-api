'use strict'

const AWS = require('aws-sdk')
const uuid = require('uuid')

const dynamodb = AWS.DynamoDB.DocumentClient()

module.exports.updatePost = function(event, context, callback) {
  const datetime = new Date().toISOString()
  const data = JSON.parse(event.body)

  if (typeof data.task !== 'string' || typeof data.done !== 'boolean') {
    console.error('Invalid entry for field task or done')
    const response = {
      statusCode: 400,
      body: JSON.stringify({ message: "Invald entry for field task or done" })
    }

    callback(new Error(response))
    return
  }

  const params = {
    TableName: 'todos',
    key: {
      id: event.pathParameters.id
    },
    ExpressionAttributeValues: {
      ':t': data.task,
      ':d': data.done,
      ':u': datetime
    },
    UpdateExpression: 'set task = :t, done = :d, updatedAt = :u'
  }

  dynamodb.update(params, function (error, data) {
    if (error) {
      console.error(error)
      callback(new Error(error))
      return
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(data.Item)
    }

    callback(null, response)
  })
}
