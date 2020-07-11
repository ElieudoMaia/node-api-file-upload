const express = require('express')
const path = require('path')
const app = express()

const routes = require('./routes')

app.use(routes)

app.use('/profile-photo', express.static(path.resolve(__dirname, '..', 'uploads')))

app.listen(3333, () => {
    console.log('Server running on port 3333')
})