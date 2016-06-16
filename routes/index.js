var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/product', function(req, res, next){
  res.end('Get product lsit');
});

router.get('/product/:id', function(req, res, next){
  res.end('Get details of product with id :' + req.params.id);
});


module.exports = router;
