require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

const PORT = process.env.PORT || 5000

app.use(express.json())

const posts = [
    {
        username: "John Doe",
        status: "active"
    },
    {
        username: "Anonymous",
        status: "Last seen 2 Hours Ago.."
    }
]
app.get('/posts', authenticateToken, (req, res) => {

    res.json(posts, filter(post = post.username === req.user.name))
})

app.post('/login', (req, res) => {
    // Authenticate the user
    const username = req.body.username
    const user = { name: username }
   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['aurthorization']
    const token = authHeader && authHeader.split('')[1]
    if (token == null) return res.status(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403)
        res.user = user
        next()
    })
}

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})
