const rp = require('request-promise');
const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');
// m    -   l
var locations = [
	{title: 'مكة المكرمة', m: 21.42, l: 39.83},
	{title: 'المدينة المنورة', m: 24.54, l: 39.36},
	{title: 'جدة', m: 21.50, l: 39.17},
	{title: 'جازان', m: 16.89, l: 42.54},
	{title: 'أبها', m: 18.22, l: 42.51},
	{title: 'الباحة', m: 20.01, l: 41.47},
	{title: 'الرياض', m: 24.67, l: 46.69},
	{title: 'بريدة', m: 26.35, l: 43.96},
	{title: 'تبوك', m: 28.40, l: 36.58},
	{title: 'حائل', m: 27.52, l: 41.70},
	{title: 'عرعر', m: 30.99, l: 41.02},
	{title: 'سكاكا', m: 29.97, l: 40.20},
	{title: 'نجران', m: 17.52, l: 44.20},
	{title: 'الدمام', m: 26.44, l: 50.10}
];

function getPrayers(m, l, year, month) {
	const options = {
	  	uri: `http://www.ummulqura.org.sa/monthprayer.aspx?l=${l}&m=${m}&t=3.00&year=${year}&month=${month}`,
	  	transform: function (body) {
	    	return cheerio.load(body);
	  	}
	};

	return rp(options).then(($) => {
		let cal = [];
		cheerioTableparser($);
		data = $('table[class=payerTB]').parsetable(true, true, true);
		for (let j = 2; j < 32; j++) {
			let prayers = {};

			prayers.hijry = data[0][j];
			prayers.day = data[1][j];
			prayers.fajr = data[2][j];
			prayers.sunrise = data[3][j];
			prayers.dhuhr = data[4][j];
			prayers.asr = data[5][j];
			prayers.maghrib = data[6][j];
			prayers.isha = data[7][j];

			cal.push(prayers);
		}
		return cal;
	}).catch((err) => {
		console.log(err);
	});

}



getPrayers(locations[1].l, locations[1].m, 1439, 12)
	.then(d => {
		console.log(d);
	});
