'use strict'

const {
  unmarshall,
  client: db,
  ScanCommand,
} = require("../init-db")

module.exports.getAllPost = async (event) => {
  const response = { statusCode: 200 }
  try {
    const params = {
      TableName: process.env.TABLE_NAME,
    }
    const { Items } = await db.send(new ScanCommand(params))
    response.body = JSON.stringify({
      message: "successfully retrieved all posts.",
      data: Items.map((item => unmarshall(item)))
    })
  } catch (e) {
    console.log(e)
    response.statusCode = 500
    response.body = JSON.stringify({
      message: e.message || 'failed to retrieve all posts.',
      stackTrace: e.stack
    })
  }

  return response
}
