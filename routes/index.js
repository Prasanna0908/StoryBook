const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')
const Stories = require('../model/Story')

const errorStatus500 = require('../views/errors/500.hbs')


router.get('/' , ensureGuest, (req, res) => {
    res.render("login", {
        layout:'login'
    })
})

router.get('/dashboard' ,ensureAuth , async (req, res) => {
    try{
        const stories = await Stories.find({user : req.user.id}).lean()
        res.render("dashboard", {
            name: req.user.firstName,
            stories
        })
    }catch(error){
        res.render('errorStatus500 ')
    }
})

module.exports = router