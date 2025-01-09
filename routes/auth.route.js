
const express = require("express")
const routes = express.Router()

const {
    authUser
} = require("../controllers/auth/user.controller")

const { loginValidator } = require("../validator/auth.validator")

routes.post("/login", loginValidator, authUser)

module.exports = routes