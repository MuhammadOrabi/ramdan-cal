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
	// res.json(req.params.name);
	City.findOne({'name': req.params.name}, function(err, city) {
		if (err) { return res.status(500).json({ err: err }); }
		if (!city) { return res.status(404).json('Not Found'); }

		var d = new Date();
		var n = d.getDate();
		var tod_data = _.pluck(city.cal, n.toString());
		var tom = n === 30 ? 1 : n + 1;
		var tom_data = _.pluck(city.cal, tom.toString());
		// var data = {
		// 			city: req.params.name,
		// 			today: ' رمضان ' + n,
		// 			today_Midnight: tod_data[0].Midnight,
		// 			today_Imsak: tod_data[0].Imsak,
		// 			today_Isha: tod_data[0].Isha,
		// 			today_Maghrib: tod_data[0].Maghrib,
		// 			today_Sunset: tod_data[0].Sunset,
		// 			today_Asr: tod_data[0].Asr,
		// 			today_Dhuhr: tod_data[0].Dhuhr,
		// 			today_Sunrise: tod_data[0].Sunrise,
		// 			today_Fajr: tod_data[0].Fajr,
		// 			tomorrow: ' رمضان ' + tom,
		// 			tomorrow_Midnight: tom_data[0].Midnight,
		// 			tomorrow_Imsak: tom_data[0].Imsak,
		// 			tomorrow_Isha: tom_data[0].Isha,
		// 			tomorrow_Maghrib: tom_data[0].Maghrib,
		// 			tomorrow_Sunset: tom_data[0].Sunset,
		// 			tomorrow_Asr: tom_data[0].Asr,
		// 			tomorrow_Dhuhr: tom_data[0].Dhuhr,
		// 			tomorrow_Sunrise: tom_data[0].Sunrise,
		// 			tomorrow_Fajr: tom_data[0].Fajr
		// 		};
		var data = {
			      	"city": req.params.name,
			      	"date": ' رمضان ' + n,
			      	"Fajr": tod_data[0].Fajr,
			      	"Sunrise": tod_data[0].Sunrise,
			      	"Dhuhr": tod_data[0].Dhuhr,
			      	"Asr": tod_data[0].Asr,
			      	"Sunset": tod_data[0].Sunset,
			      	"Maghrib": tod_data[0].Maghrib,
			      	"Isha": tod_data[0].Isha,
			      	"Imsak": tom_data[0].Imsak,
			      	"Midnight": tom_data[0].Midnight,
			      	"date-tomorrow": ' رمضان ' + tom,
			      	"Fajr-tomorrow": tom_data[0].Fajr,
			      	"Sunrise-tomorrow": tom_data[0].Sunrise,
			      	"Dhuhr-tomorrow": tom_data[0].Dhuhr,
			      	"Asr-tomorrow": tom_data[0].Asr,
			      	"Sunset-tomorrow": tom_data[0].Sunset,
			      	"Maghrib-tomorrow": tom_data[0].Maghrib,
			      	"Isha-tomorrow": tom_data[0].Isha,
			      	"Imsak-tomorrow": tom_data[0].Imsak,
			      	"Midnight-tomorrow": tom_data[0].Midnight
				};
		res.json(data);
	});
});
// router.get('/city/:name/:no', function(req, res, next) {
// 	City.findOne({'name': req.params.name}, function(err, city) {
// 		if (err) { return res.status(500).json({ err: err }); }
// 		var no = req.params.no;
// 		var data = _.pluck(city.cal, no);
// 		res.json(data);
// 	});
// });

module.exports = router;
