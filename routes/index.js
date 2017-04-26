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

router.post('/city/data', function(req, res, next) {
	City.find({}, 'name' ,function(err, names) {
		if (!names) { return res.json(); }
		names = _.pluck(names, 'name');
		var hash = req.body.mention.hashtags;
		var name;
		for (var i = 0; i < hash.length; i++) {
			if (hash[i].hashtag && _.contains(names, hash[i].hashtag)) {
				name = hash[i].hashtag;
			}
		}
		City.findOne({'name': name}, function(err, city) {
			if (err) { return res.status(500).json({ err: err }); }
			if (!city) { return res.status(422).json(); }

			var d = new Date();
			var n = d.getDate();
			var tod_data = _.pluck(city.cal, n.toString());
			var tom = n === 30 ? 1 : n + 1;
			var tom_data = _.pluck(city.cal, tom.toString());
			var data = {
				      	"city": city.name,
				      	"date": '' + n,
				      	"Fajr": tod_data[0].Fajr,
				      	"Sunrise": tod_data[0].Sunrise,
				      	"Dhuhr": tod_data[0].Dhuhr,
				      	"Asr": tod_data[0].Asr,
				      	"Sunset": tod_data[0].Sunset,
				      	"Maghrib": tod_data[0].Maghrib,
				      	"Isha": tod_data[0].Isha,
				      	"Imsak": tom_data[0].Imsak,
				      	"Midnight": tom_data[0].Midnight,
				      	"date-tomorrow": '' + tom,
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

	// if (!name) { return res.status(422).json(); }
	// // if (name === 'مكة' || name === 'مكه' || name === 'مكة_المكرمة' || name === 'مكه_المكرمه') {
	// // 	name = 'مكة المكرمة';
	// // } else if (name === 'جده') {
	// // 	name = 'جدة';
	// // } else if (name === 'جيزان') {
	// // 	name = 'جازان';
	// // } else if (name === 'ابها') {
	// // 	name = 'أبها';
	// // } else if (name === 'الباحه') {
	// // 	name = 'الباحة';
	// // } else if (name === 'المدينة' || name === 'المدينه' || name === 'المدينة_المنورة' || name === 'المدينه_المنوره') {
	// // 	name = 'المدينة المنورة';
	// // }


});
// router.get('/city/:name/:no', function(req, res, next) {
// 	City.findOne({'name': req.params.name}, function(err, city) {
// 		if (err) { return res.status(500).json({ err: err }); }
// 		var no = req.params.no;
// 		var data = _.pluck(city.cal, no);
// 		res.json(data);
// 	});
// });

router.get('/schema/city', function(req, res, next) {
	var schema = {
		  "type":"object",
		  "properties":{
		    "city":{
		      "type":"string",
		      "description":"name of the city",
		      "maxLength":15,
		      "sample":"San Francisco"
		    },
		    "date":{
		      "type":"string",
		      "description":"Date",
		      "maxLength":15,
		      "sample":"17 Mar 2016"
		    },
		    "Fajr": {
		      "type": "string",
		      "maxLength":6,
		      "sample": "06:26"
		    },
		    "Sunrise": {
		      "type": "string",
		      "maxLength":6,
		      "sample": "06:26"
		    },
		    "Dhuhr": {
		      "type": "string",
		      "maxLength":6,
		      "sample": "06:26"
		    },
		    "Asr": {
		      "type": "string",
		      "maxLength":6,
		      "sample": "06:26"
		    },
		    "Sunset": {
		      "type": "string",
		      "maxLength":6,
		      "sample": "06:26"
		    },
		    "Maghrib": {
		      "type": "string",
		      "maxLength":6,
		      "sample": "06:26"
		    },
		    "Isha": {
		      "type": "string",
		      "maxLength":6,
		      "sample": "06:26"
		    },
		    "Imsak": {
		      "type": "string",
		      "maxLength":6,
		      "sample": "06:26"
		    },
		    "Midnight": {
		      "type": "string",
		      "maxLength":6,
		      "sample": "06:26"
		    },
		    "date-tomorrow": {
		      "type":"string",
		      "description":"Date",
		      "maxLength":15,
		      "sample":"18 Mar 2016"
		    },
		    "Fajr-tomorrow": {
		      "type": "string",
		      "maxLength":6,
		      "sample": "06:26"
		    },
		    "Sunrise-tomorrow": {
		      "type": "string",
		      "maxLength":6,
		      "sample": "06:26"
		    },
		    "Dhuhr-tomorrow": {
		      "type": "string",
		      "maxLength":6,
		      "sample": "06:26"
		    },
		    "Asr-tomorrow": {
		      "type": "string",
		      "maxLength":6,
		      "sample": "06:26"
		    },
		    "Sunset-tomorrow": {
		      "type": "string",
		      "maxLength":6,
		      "sample": "06:26"
		    },
		    "Maghrib-tomorrow": {
		      "type": "string",
		      "maxLength":6,
		      "sample": "06:26"
		    },
		    "Isha-tomorrow": {
		      "type": "string",
		      "maxLength":6,
		      "sample": "06:26"
		    },
		    "Imsak-tomorrow": {
		      "type": "string",
		      "maxLength":6,
		      "sample": "06:26"
		    },
		    "Midnight-tomorrow": {
		      "type": "string",
		      "maxLength":6,
		      "sample": "06:26"
		    }
		  },
		  "required":[
			  	"city","date","Fajr","Sunrise","Dhuhr","Asr","Sunset","Maghrib","Isha","Imsak","Midnight",
			  	"date-tomorrow","Fajr-tomorrow","Sunrise-tomorrow","Dhuhr-tomorrow","Asr-tomorrow","Sunset-tomorrow",
			  	"Maghrib-tomorrow","Isha-tomorrow","Imsak-tomorrow","Midnight-tomorrow"
		  	]
		};
	res.json(schema);
});

module.exports = router;
