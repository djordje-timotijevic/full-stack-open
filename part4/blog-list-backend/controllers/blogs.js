const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const allBlogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1, id: 1 })
    
    response.json(allBlogs)
})

blogsRouter.post('/', async (request, response) => {
    const { title, author, url, likes, userId } = request.body

    if (title === undefined) {
        response.status(400).end()
    } else if (url === undefined) {
        response.status(400).end()
    }

    const user = await User.findById(userId)

    const blog = new Blog({
        title: title,
        author: author,
        url: url,
        likes: likes,
        user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.__id)
    await user.save()

    response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const userId = request.userId
    const blogId = request.params.id

    const blogUserId = await Blog.findById(blogId)
    if (blogUserId.user.toString() !== userId) {
        return response.status(401).json({ error: 'user not owner of blog' })
    }

    await Blog.findByIdAndRemove(blogId)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.ulr,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
    response.status(200).json(updatedBlog)
})

module.exports = blogsRouter