const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request['token'] = authorization.replace('Bearer ', '')
  }

  next()
}

const userExtractor = (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  request['userId'] = decodedToken.id

  next()
}

module.exports = { tokenExtractor, userExtractor }