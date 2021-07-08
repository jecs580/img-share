const express = require('express');
const router = express.Router();
const home = require('../controllers/home');
const image = require('../controllers/image');
module.exports = app =>{
      router.get('/',home.index);
      router.get('/image/:id',image.index);
      router.post('/images',image.create);
      router.post('/images/:id/like',image.like);
      router.post('/images/:id/comment',image.comment);
      router.delete('/images/:id',image.remove);
      app.use(router);
}