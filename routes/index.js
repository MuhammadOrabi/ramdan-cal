var express = require('express');
var router = express.Router();
var _ = require('underscore');
var prayTimes = require('../PrayTimes.js');
var moment = require('moment-hijri');
var numbers = require('number-picker');

var emptyCal = {
	'day': '',
	'Fajr': '',
	'Sunrise': '',
	'Dhuhr': '',
	'Asr': '',
	'Sunset': '', 'Maghrib': '', 'Isha': '', 'Imsak': '', 'Midnight': '' };


var locations = {
	'مكة المكرمة': [21.4, 39.7],
	'المدينة المنورة': [24.4, 39.4],
	'جدة': [21.4, 38.6],
	'جازان': [16.8, 42.5],
	'أبها': [18.2, 42.4],
	'الباحة': [20.1, 41.4],
	'الرياض': [24.7, 46.2],
	'بريدة': [26.3, 43.7],
	'تبوك': [28.3, 36.4],
	'حائل': [27.5, 41.5],
	'عرعر': [30.9, 40.9],
	'سكاكا': [29.9, 39.9],
	'نجران': [17.5, 44.1],
	'الدمام': [26.3, 49.8]
};

var prays = ['day', 'Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Sunset', 'Maghrib', 'Isha', 'Imsak', 'Midnight'];
var emptyCal = { 'day': '', 'Fajr': '', 'Sunrise': '', 'Dhuhr': '', 'Asr': '', 'Sunset': '', 'Maghrib': '', 'Isha': '', 'Imsak': '', 'Midnight': '' };



/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});
// Create a new City

// Get the Data for Flowics API
router.post('/city/data', function(req, res, next) {
	var names = Object.keys(locations);
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
	if(name) {
		prayTimes.setMethod('Makkah');
		var todayDate = new Date();
		var tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

		var today = prayTimes.getTimes(todayDate, locations[name], 'auto', 1, '12h');
		var tomorrow = prayTimes.getTimes(tomorrowDate, locations[name], 'auto', 1, '12h');

		var data = {
			"city": name,
			"date": moment(todayDate).format('iD'),
			"Fajr": today.fajr,
			"Sunrise": today.sunrise,
			"Dhuhr": today.dhuhr,
			"Asr": today.asr,
			"Sunset": today.sunset,
			"Maghrib": today.maghrib,
			"Isha": today.isha,
			"Imsak": today.imsak,
			"Midnight": today.midnight,
			"date-tomorrow": moment(tomorrowDate).format('iD'),
			"Fajr-tomorrow": tomorrow.fajr,
			"Sunrise-tomorrow": tomorrow.sunrise,
			"Dhuhr-tomorrow": tomorrow.dhuhr,
			"Asr-tomorrow": tomorrow.asr,
			"Sunset-tomorrow": tomorrow.sunset,
			"Maghrib-tomorrow": tomorrow.maghrib,
			"Isha-tomorrow": tomorrow.isha,
			"Imsak-tomorrow": tomorrow.imsak,
			"Midnight-tomorrow": tomorrow.midnight
		};
		res.json(data);
	} else {
		var data = {
			"city": '',
			"date": '',
			"Fajr": '',
			"Sunrise": '',
			"Dhuhr": '',
			"Asr": '',
			"Sunset": '',
			"Maghrib": '',
			"Isha": '',
			"Imsak": '',
			"Midnight": '',
			"date-tomorrow": '',
			"Fajr-tomorrow": '',
			"Sunrise-tomorrow": '',
			"Dhuhr-tomorrow": '',
			"Asr-tomorrow": '',
			"Sunset-tomorrow": '',
			"Maghrib-tomorrow": '',
			"Isha-tomorrow": '',
			"Imsak-tomorrow": '',
			"Midnight-tomorrow": ''
		};
		res.json(data);
	}
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
		      "maxLength":9,
		      "sample": "06:26"
		    },
		    "Sunrise": {
		      "type": "string",
		      "maxLength":9,
		      "sample": "06:26"
		    },
		    "Dhuhr": {
		      "type": "string",
		      "maxLength":9,
		      "sample": "06:26"
		    },
		    "Asr": {
		      "type": "string",
		      "maxLength":9,
		      "sample": "06:26"
		    },
		    "Sunset": {
		      "type": "string",
		      "maxLength":9,
		      "sample": "06:26"
		    },
		    "Maghrib": {
		      "type": "string",
		      "maxLength":9,
		      "sample": "06:26"
		    },
		    "Isha": {
		      "type": "string",
		      "maxLength":9,
		      "sample": "06:26"
		    },
		    "Imsak": {
		      "type": "string",
		      "maxLength":9,
		      "sample": "06:26"
		    },
		    "Midnight": {
		      "type": "string",
		      "maxLength":9,
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
		      "maxLength":9,
		      "sample": "06:26 PM"
		    },
		    "Sunrise-tomorrow": {
		      "type": "string",
		      "maxLength":9,
		      "sample": "06:26 AM"
		    },
		    "Dhuhr-tomorrow": {
		      "type": "string",
		      "maxLength":9,
		      "sample": "06:26 AM"
		    },
		    "Asr-tomorrow": {
		      "type": "string",
		      "maxLength":9,
		      "sample": "06:26 AM"
		    },
		    "Sunset-tomorrow": {
		      "type": "string",
		      "maxLength":9,
		      "sample": "06:26 PM"
		    },
		    "Maghrib-tomorrow": {
		      "type": "string",
		      "maxLength":9,
		      "sample": "06:26 PM"
		    },
		    "Isha-tomorrow": {
		      "type": "string",
		      "maxLength":9,
		      "sample": "06:26 PM"
		    },
		    "Imsak-tomorrow": {
		      "type": "string",
		      "maxLength":9,
		      "sample": "06:26"
		    },
		    "Midnight-tomorrow": {
		      "type": "string",
		      "maxLength":9,
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
router.get('/city/:calc/:name', function(req, res, next) {
	var names = Object.keys(locations);
	var name;
	var tmp = req.params.name;
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
	if (!_.contains(names, tmp)) {
		res.json('Not Found');
	}
	name = tmp;

	prayTimes.setMethod(req.params.calc);
	var todayDate = new Date();
	var tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

	var today = prayTimes.getTimes(todayDate, locations[name], 'auto', 1, '12h');
	var tomorrow = prayTimes.getTimes(tomorrowDate, locations[name], 'auto', 1, '12h');
	res.json(moment().format('iYYYY/iM/iD'));
	var data = {
		"city": name,
		"date": moment(todayDate).format('iD'),
		"Fajr": today.fajr,
		"Sunrise": today.sunrise,
		"Dhuhr": today.dhuhr,
		"Asr": today.asr,
		"Sunset": today.sunset,
		"Maghrib": today.maghrib,
		"Isha": today.isha,
		"Imsak": today.imsak,
		"Midnight": today.midnight,
		"date-tomorrow": moment(tomorrowDate).format('iD'),
		"Fajr-tomorrow": tomorrow.fajr,
		"Sunrise-tomorrow": tomorrow.sunrise,
		"Dhuhr-tomorrow": tomorrow.dhuhr,
		"Asr-tomorrow": tomorrow.asr,
		"Sunset-tomorrow": tomorrow.sunset,
		"Maghrib-tomorrow": tomorrow.maghrib,
		"Isha-tomorrow": tomorrow.isha,
		"Imsak-tomorrow": tomorrow.imsak,
		"Midnight-tomorrow": tomorrow.midnight
	};
	res.render('city', { title: name, 'data': data });
});

module.exports = router;
