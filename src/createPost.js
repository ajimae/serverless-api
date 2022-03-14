'use strict'

const uuid = require('uuid')

const {
  marshall,
  unmarshall,
  client: db,
  PutItemCommand
} = require("../init-db")

console.log(process.env.TABLE_NAME, '>>>>>')
module.exports.createPost = function (event, context, callback) {
  const body = JSON.pars(event.body)
  const response = { statusCode: 200 }


  let params = {
    TableName: process.env.TABLE_NAME,
    Item: marshall(JSON.stringify(body) || {})
  }

  db.send(new PutItemCommand(params), function(error, data) {
    if (error) {
      response.statusCode = 500
      response.body = JSON.stringify({
        message: "failed to create post",
        errorStack: error.stack
      })

      callback(new Error(response))
      return
    }

    response.body = JSON.stringify({
      message: "successfully retrieved post.",
      data: data ? unmarshall(data) : {},
      rawData: data
    })

    callback(null, response)
  })
}
