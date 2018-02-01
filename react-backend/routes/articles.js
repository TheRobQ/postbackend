const knex = require('../knex.js')
const express = require('express')
const bodyParser = require('body-parser')
const secret = process.env.SECRET || 'A4e2n84E0OpF3wW21'
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const getArticles = (req,res,next) =>{
  knex('users')
  .join('articles', 'users.id', '=', 'articles.user_id')
  .select('articles.id', 'users.first_name', 'users.last_name', 'articles.title', 'articles.summary',
  'articles.body', 'articles.image_url', 'articles.sport', 'articles.views',
  'articles.likes', 'articles.created_at', 'articles.updated_at', 'articles.user_id')
  .then(data => {
    res.status(200).send({ data })
  })
  .catch(err => {next(err)})
}

const filter = (req,res,next) => {
  knex('users')
  .join('articles', 'users.id', '=', 'articles.user_id' )
  .select('articles.id', 'users.first_name', 'users.last_name', 'articles.title', 'articles.summary',
  'articles.body', 'articles.image_url', 'articles.sport', 'articles.views',
  'articles.likes', 'articles.created_at', 'articles.updated_at')
  .where('sport', req.params.sport)
  .then((data) => {res.send({data})}
)}

const getArticleId = (req,res,next) => {
  var id = req.params.id
  knex('users')
  .join('articles', 'users.id', '=', 'articles.user_id')
  .select('articles.id', 'users.first_name', 'users.last_name', 'articles.title', 'articles.summary',
  'articles.body', 'articles.image_url', 'articles.sport', 'articles.views',
  'articles.likes', 'articles.created_at', 'articles.updated_at')
  .where('articles.id', id)
  .then(data => {
    updateViews(id)
    res.status(200).send({ data: data[0] })
  }).catch(err => {
    next(err)
  })
}


const postArticles = (req,res,next) => {
  var cookie = req.headers['cooker']
  var jwot = cookie.split(';')[1].split('=')[1]
  var decoded = jwt.verify(jwot, secret, function(err, decoded) {
    if(err){
      next(err)
    }else{
      return decoded
    }
  })
  if(!decoded.id) res.sendStatus(403)
  var image_url = req.body.image_url || 'https://images.unsplash.com/photo-1485388276992-0ce5ce2d6981?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b23bb57338708adc590a9243d8f80797&auto=format&fit=crop&w=799&q=80'
  knex('articles').insert({
    user_id:req.body.user_id,
    title:req.body.title,
    summary:req.body.summary,
    sport:req.body.sport,
    body:req.body.body,
    image_url:image_url,
  },'*').then(data => {res.status(204).send({article:data[0]})})
}

const deleteArticle = (req,res,next) => {
  var cookie = req.headers['cooker']
  var jwot = cookie.split(';')[1].split('=')[1]
  var decoded = jwt.verify(jwot, secret, function(err, decoded) {
    if(err){
      next(err)
    }else{
      return decoded
    }
  })
  if(!decoded.admin)res.sendStatus(403)
  knex('articles').returning('*').where({id: req.params.id}).del()
  .then(data=>{res.status(200).send({data})})
  .catch(err=>{next(err)})
}

const updateViews = (id) => {
  knex('articles').where({id: id})
  .then((article)=> {
    var newViews = Number(article[0].views) + 1
    knex('articles').where({id: id}).update({views: newViews})
    .then(count=>{
      return;
    })
    .catch(err=>{
      res.sendStatus(304);
    })
  })
  .catch(err=>{
    res.sendStatus(304);
    })
}

module.exports = {
  getArticles,
  getArticleId,
  postArticles,
  deleteArticle,
  filter,
  updateViews
}
