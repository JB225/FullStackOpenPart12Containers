const MONGO_URL = process.env.MONGO_URL || undefined
const REDIS_URL = process.env.REDIS_URL || undefined

const ADDED_TODOS_STRING = "added_todos"

module.exports = {
  MONGO_URL,//: 'mongodb://the_username:the_password@localhost:3456/the_database',
  REDIS_URL,//: '//localhost:6378'
  ADDED_TODOS_STRING
}

