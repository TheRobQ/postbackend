var express = require('express');
var router = express.Router();
var users = require('./users')
var articles = require('./articles.js')
var likes = require('./likes.js')
var bcrypt = require('./bcrypt.js')
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')

router.get('/users', users.getUsers)

router.get('/articles', articles.getArticles)

router.get('/articles/filter/:sport', articles.filter)

router.get('/articles/:id', articles.getArticleId)

router.post('/users', bcrypt.store)

router.post('/articles',articles.postArticles)

router.put('/users', bcrypt.compare)

router.put('/likes', likes.putLikes)

router.delete('/users/:id', users.deleteUser)

router.delete('/articles/:id', articles.deleteArticle)



module.exports = router;
