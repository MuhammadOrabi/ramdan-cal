var express = require('express');
var router = express.Router();
var City = require('../models/city');
var _ = require('underscore');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// Create a new City
router.post('/city', function(req, res, next) {
	City.create({ name: req.body.name, cal: req.body.cal }, function (err, city) {
	  	if (err) return res.status(500).json({ err: err });
		res.json(city);
	});
});
// Get the Data for Flowics API
router.post('/city/data', function(req, res, next) {
	City.find({}, 'name' ,function(err, names) {
		if (!names) { return res.json(); }
		names = _.pluck(names, 'name');
		var hash = req.body.mention.hashtags;
		var name;
		for (var i = 0; i < hash.length; i++) {
			if (hash[i].hashtag) {
				var tmp = hash[i].hashtag;
				if (tmp === 'مكة' || tmp === 'مكه' || tmp === 'مكة_المكرمة' || tmp === 'مكه_المكرمه') {
					tmp = 'مكة المكرمة';
				} else if (tmp === 'جده') {
					tmp = 'جدة';
				} else if (tmp === 'جيزان') {
					tmp = 'جازان';
				} else if (tmp === 'ابها') {
					tmp = 'أبها';
				} else if (tmp === 'الباحه') {
					tmp = 'الباحة';
				} else if (tmp === 'المدينة' || tmp === 'المدينه' || tmp === 'المدينة_المنورة' || tmp === 'المدينه_المنوره') {
					tmp = 'المدينة المنورة';
				}
				if (_.contains(names, tmp)) {
					name = tmp;
					break;
				}
			}
		}

		City.findOne({'name': name}, function(err, city) {
			if (err) { return res.status(500).json({ err: err }); }
			if (!city) { return res.status(422).json(); }

			var d = new Date();
			var n = d.getDate();
			var tod_data = city.cal[n.toString()];
			var tom = n === 31 ? 1 : n + 1;
			var tom_data = city.cal[tom.toString()];
			var data = {
				      	"city": city.name,
				      	"date": tod_data.day,
				      	"Fajr": tod_data.Fajr,
				      	"Sunrise": tod_data.Sunrise,
				      	"Dhuhr": tod_data.Dhuhr,
				      	"Asr": tod_data.Asr,
				      	"Sunset": tod_data.Sunset,
				      	"Maghrib": tod_data.Maghrib,
				      	"Isha": tod_data.Isha,
				      	"Imsak": tom_data.Imsak,
				      	"Midnight": tom_data.Midnight,
				      	"date-tomorrow": tom_data.day,
				      	"Fajr-tomorrow": tom_data.Fajr,
				      	"Sunrise-tomorrow": tom_data.Sunrise,
				      	"Dhuhr-tomorrow": tom_data.Dhuhr,
				      	"Asr-tomorrow": tom_data.Asr,
				      	"Sunset-tomorrow": tom_data.Sunset,
				      	"Maghrib-tomorrow": tom_data.Maghrib,
				      	"Isha-tomorrow": tom_data.Isha,
				      	"Imsak-tomorrow": tom_data.Imsak,
				      	"Midnight-tomorrow": tom_data.Midnight
					};
			res.json(data);
		});
	});
});
// Get the output Schema for Flowics
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

// Get All the data
router.get('/city/all', function(req, res, next) {
	City.find({}, function(err, all) {
		if (err) { return res.status(500).json({ err: err }); }
		if (!all) { return res.status(404).json('Not Found'); }
		res.json(all);
	});
});

// Update City By Name
router.put('/city/:name', function(req, res, next) {
	City.findOneAndUpdate({ name: req.params.name }, { cal: req.body.cal }, function(err, city) {
		if (err) { return res.status(500).json({ err: err }); }
		if (!city) { return res.status(404).json('Not Found'); }
		res.json(city);
	});
});

// Delete City By Name
router.delete('/city/:name', function(req, res, next) {
	City.remove({ name: req.params.name }, function(err) {
		if (err) { return res.status(500).json({ err: err }); }
		res.status(404).json('Deleted Succesfully');
	});
})

module.exports = router;
