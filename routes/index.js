var express = require('express');
var router = express.Router();
var City = require('../models/city');
var _ = require('underscore');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/city', function(req, res, next) {
	City.create({ name: req.body.name, cal: req.body.cal }, function (err, city) {
	  	if (err) return res.status(500).json({ err: err });
		res.json(city);
	});
});

router.get('/city/:name', function(req, res, next) {
	City.findOne({'name': req.params.name}, function(err, city) {
		if (err) { return res.status(500).json({ err: err }); }
		res.json(city);
	});
});
router.get('/city/:name/:no', function(req, res, next) {
	City.findOne({'name': req.params.name}, function(err, city) {
		if (err) { return res.status(500).json({ err: err }); }
		var no = req.params.no;
		var data = _.pluck(city.cal, no);
		res.json(data);
	});
});

module.exports = router;
