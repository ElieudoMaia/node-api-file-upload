const connection = require('../database/connection')
const fs = require('fs')
const path = require('path')
require('dotenv').config()
const { v4: uuidv4 } = require('uuid')

module.exports = {
    async index(req, resp) {
        const users = await connection('users').select('*')

        users.map(user => {
            user.url_image_profile = `${process.env.SERVER_ADDRESS}/profile-photo/${user.url_image_profile}`
        })

        if(!users) {
            resp.json({
                msg: 'No users'
            })
        }

        resp.json(users)

    },

    async show(req, resp) {
        const { id } = req.params

        const user = await connection('users')
            .select('*')
            .where('id', id)
            .first()

        if(!user) {
            resp.json({
                msg: 'User not found'
            })
        }

        resp.json({
            ...user,
            url_image_profile: `${process.env.SERVER_ADDRESS}/profile-photo/${user.url_image_profile}`
        })

    },

    async store(req, resp) {

        const { name, email } = req.body
        const id = uuidv4()
        const url_image_profile = req.file.filename

        const user = await connection('users').insert({
            id,
            name,
            email,
            url_image_profile
        })

        resp.json({
            msg: 'User successfully created'
        })

    },

    async delete(req, resp) {
        const { id } = req.params

        const [photoName] = await connection('users')
            .select('url_image_profile')
            .where('id', id)

        console.log(photoName.url_image_profile)

        fs.unlink(path.resolve(__dirname, '..', '..', 'uploads', photoName.url_image_profile), error => {
            if(error) {
                console.log(error)
            }
        })

        const successfullyDeleted = await connection('users')
            .where('id', id)
            .del()

        if(!Boolean(successfullyDeleted)) {
            resp.json({
                error: 'Something went wrong'
            })
        }

        resp.json({
            msg: 'User successfully deleted'
        })

    }
}