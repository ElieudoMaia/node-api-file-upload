const express = require('express')
const routes = express.Router()
const multer = require('multer')

const multerConfig = require('./config/multerConfig')

const upload = multer(multerConfig)

const UserController = require('./controllers/UserController')

routes.get('/users', UserController.index)
routes.get('/users/:id', UserController.show)
routes.post('/users', upload.single('profile-photo'), UserController.store)
routes.delete('/users/:id', UserController.delete)

module.exports = routes