exports.verifyUser = function(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token === 'Orabi') {
		next();
	} else {
		var err = new Error('Not authoraized!');
		err.status = 403;
		return next(err);
	}
};

