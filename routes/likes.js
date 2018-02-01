const express = require('express');
const bodyParser = require('body-parser')
const knex = require('../knex');

const putLikes = (req,res,next) => {
  knex('likes').where({
    user_id: req.body.userId,
    article_id: req.body.articleId
  }).then(relation=>{
    if(!relation){
      knex('likes').insert({
        user_id: req.body.userId,
        article_id: req.body.articleId,
        liked: req.body.liked
      }).then(data => {
        updateRating(req.body.articleId)
        res.sendStatus(202)
      })
    }else{
      knex('likes').where({
        user_id: req.body.userId,
        article_id: req.body.articleId
      }).update({liked: req.body.liked})
      .then(data => {
        updateRating(req.body.articleId)
        res.sendStatus(202)
      })
    }
  })
  .catch(err => {next(err)})
}

const updateRating = (articleId) => {
  knex.select('liked').from('likes').where({articles_id: articleId})
  .then(likes=>{
    var sum = likes.map(val => val.liked).reduce((a, b) => Number(a) + Number(b))
    knex('articles').where({id: articleId}).update({likes: sum}).then(count=>{
      return;
    })
  })
}

module.exports = {
  putLikes
}
