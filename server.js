const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const mustache = require('consolidate').mustache;
const db = require('./db');

const app = express();

const port = parseInt(process.env.PORT) || 32767;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('html', mustache);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/', (req, res) => {
	if(!req.body.url) {
		res.redirect('/');
		return;
	}

	let { url, count } = req.body;
	if(!count) count = 1;

	let id = shortid.generate();

	let obj = new db({
		url,
		max: count,
		current: 0,
		id
	});

	obj.save();

	res.redirect(`/success?id=${id}`);
});

app.get('/success', (req, res) => {
	if(req.query.id) {
		res.render('success', { id: req.query.id, base: req.get('host') });
	}
	else {
		res.redirect('/');
	}
});

app.get('/:id', (req, res, next) => {
	if(shortid.isValid(req.params.id)) {
		db.findOne({
			id: req.params.id
		}, (err, result) => {
			if(err) {
				console.log(err);
				res.redirect('/');
				return;
			}

			if(!result) {
				next();
				return;
			}

			let clicksDone = result.current + 1;

			if(result.max > clicksDone) {
				result.current = clicksDone;
				result.save();
			}

			else {
				result.remove();
			}

			console.log(result, clicksDone);

			res.redirect(result.url);
		});
	}

	else next();
});

app.use((req, res, next) => {
	res.render('index', {
		expired: true
	});
});

app.listen(port, () => {
	console.log(`Server listening at port ${port}`);
});