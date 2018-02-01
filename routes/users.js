const express = require('express');
const router = express.Router();
const knex = require('../knex')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const secret = process.env.SECRET || 'A4e2n84E0OpF3wW21'

const getUsers = function(req, res, next) {
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
  knex('users').then(data=>{res.status(200).send({data})})
  .catch(err=>{next(err)})
}

const deleteUser = function(req,res,next){
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
  knex('users').where({id : req.params.id}).del()
  .then(data=>{res.sendStatus(200)})
  .catch(err=>{next(err)})
}

module.exports = {
  getUsers,
  deleteUser
}
