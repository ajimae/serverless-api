'use strict'

const uuid = require('uuid')

const {
  marshall,
  unmarshall,
  client: db,
  PutItemCommand,
} = require("../init-db")

module.exports.createPost = function (event, context, callback) {
  const response = { statusCode: 200 }
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: marshall(JSON.stringify(event.body) || {})
  }

  db.send(new PutItemCommand(params), function(error, data) {
    if (error) {
      console.error(error)
      response.statusCode = 500
      response.body = JSON.stringify({
        message: error.message || "failed to create posts.",
        rawData: error.stack
      })

      callback(new Error(response))
      return
    }

    response.body = JSON.stringify({
      message: "successfully create post.",
      data: data ? unmarshall(data) : {},
      rawData: data 
    })
  })
}
