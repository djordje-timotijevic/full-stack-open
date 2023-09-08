const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'State and Revolution',
    author: 'Vladmir Lenin',
    url: 'https://state-revolution.ru',
    likes: 30
  },
  {
    title: 'Das Kapital',
    author: 'Karl Marx',
    url: 'https://kapital.in',
    likes: 100
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('server returns correct amount of blog posts in JSON', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(b => b.content)
  expect(contents).toHaveLength(initialBlogs.length)
}, 10000)

test('_id is undefined when requested', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]

  expect(blog._id).toBeUndefined()
})

test('blog successfully saved to the database', async () => {
  const newBlog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'https://test.ts',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const allBlogs = await Blog.find({})
  expect(allBlogs).toHaveLength(initialBlogs.length)

  const blogTitles = allBlogs.map(blog => blog.title)
  expect(blogTitles).toContain('Test Title')
})

test('likes paramater defaults to zero if no value is provided', async () => {
  const blog = {
    title: 'The Merits of Testing',
    author: 'Jhon Smith',
    url: 'https://merits-of-testing.ts'
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const newBlog = await Blog.find({ title: 'The Merits of Testing' })
  expect(newBlog[0].likes).toEqual(0)
})

test('server responds with 400 Bad Request when title of url is missing', async () => {
  const noTitleBlog = {
    author: 'Jhon Smith',
    url: 'https://merits-of-testing.ts',
    likes: 20
  }

  const noUrlBlog = {
    title: 'The Merits of Testing',
    author: 'Jhon Smith',
    likes: 20
  }

  await api
    .post('/api/blogs')
    .send(noTitleBlog)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(noUrlBlog)
    .expect(400)
})

describe('deletion tests', () => {
  test('deleting single blgog post', async () => {
    const blogToDelete = initialBlogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  })
})

test('updating number of likes is successfull', async () => {
  const blogs = await (await Blog.find({})).map(b => b.toJSON())
  const blog = {
    ...blogs[0],
    likes: 1
  }

  const updatedBlog = await api
    .put(`/api/blogs/${blog.id}`)
    .send(blog)

  expect(updatedBlog.body.likes).toEqual(1)
})

afterAll(async () => {
  await mongoose.connection.close()
})