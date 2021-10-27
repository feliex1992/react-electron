const UserSchema = {
  name: 'user',
  properties: {
    userId: 'string',
    userName: 'string',
    password: 'string',
    level: 'string'
  },
  primaryKey: 'userId'
}

module.exports = UserSchema
