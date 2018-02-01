const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser')
const secret = process.env.SECRET || 'A4e2n84E0OpF3wW21'
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const store = (req,res,sendit)=>{
  var salt = bcrypt.genSaltSync(6)
  var hash = bcrypt.hashSync(req.body.password, salt);
  knex('users').insert({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    password:hash
  },'*')
  .then(user=>{
    res.status(204).send({id:user[0].id})
  })
  .catch(err=>{next(err)})
}
const compare = (req,res,sendit)=>{
  knex('users').where({
  email: req.body.email
  }).first()
  .then(user =>{
    bcrypt.compare(req.body.password, user.password, function(err, ver) {
        var token = jwt.sign({ id: user.id, admin: user.is_admin }, secret)
        var admin = user.is_admin
        var id = user.id
        ver ? res.status(200).send({token,admin,id}): res.sendStatus(403)
    })
  .catch(err=>{next(err)})
  })
}
module.exports = {
  store,
  compare
}
