const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogPosts) => {
    const startingValue = 0
    const sumLikes = (sum, post) => {
        return sum + post.likes
    }

    const totalLikes = blogPosts.reduce(sumLikes, startingValue)

    return totalLikes
}

const favoriteBlogs = (blogs) => {
    const mostLiked = (favoriteBlog, blog) => {
        return blog.likes > favoriteBlog.likes
            ? blog
            : favoriteBlog
    }

    const favoriteBlog = blogs.reduce(mostLiked)

    return favoriteBlog
}

const mostBlogs = (blogs) => {
    //const authors = blogs.map(blog => blog.author)

    // let numOfBlogs = {}
    // for (const author of authors) {
    //     numOfBlogs[author] = numOfBlogs[author]
    //         ? numOfBlogs[author] + 1
    //         : 1
    // }

    let authersNumOfBlogs = {}
    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].author in authersNumOfBlogs) {
            authersNumOfBlogs[blogs[i].author] += 1
        } else {
            authersNumOfBlogs[blogs[i].author] = 1
        }
    }

    const numOfBlogs = Object.values(authersNumOfBlogs)
    const maxNumOfBlogs = Math.max(...numOfBlogs)
    for (author in authersNumOfBlogs) {
        if (authersNumOfBlogs[author] === maxNumOfBlogs) {
            return {
                "author": author,
                "blogs": authersNumOfBlogs[author]
            }
        }
    }

}

const mostLikes = (blogs) => {
    let authorsLikes = {}
    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].author in authorsLikes) {
            authorsLikes[blogs[i].author] += blogs[i].likes
        } else {
            authorsLikes[blogs[i].author] = blogs[i].likes
        }
    }

    const likes = Object.values(authorsLikes)
    const maxLikes = Math.max(...likes)
    for (author in authorsLikes) {
        if (authorsLikes[author] === maxLikes) {
            return {
                "author": author,
                "likes": authorsLikes[author]
            }
        }
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlogs,
    mostBlogs,
    mostLikes
}