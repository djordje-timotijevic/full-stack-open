const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

test('invalid user cannot be created', async () => {
  const invalidUser = {
    username: 'jnsds',
    password: 'p',
    name: 'Jhon Smith'
  }

  await api
    .post('/api/users')
    .send(invalidUser)
    .expect(400)
})