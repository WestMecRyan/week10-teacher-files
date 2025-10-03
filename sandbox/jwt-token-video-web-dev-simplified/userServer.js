const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
app.use(express.json());

const users = [];

app.get('/users', (req, res) => {
	res.json(users);
});
app.post('/users', async (req, res) => {
		const {username, password} = req.body;
	try {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);
		console.log(salt);
		console.log(hashedPassword);
		const user = { username, hashedPassword }; 
		users.push(user);
		console.log(users);
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({error: error.message});
	}

});
app.post('/users/login', async (req, res) => {
	const {username} =  req.body;
	const user = users.find(user => user.name = username);
	if (user == null) res.status(400).send('Cannot find user');
try {
		if (await bcrypt.compare(req.body.password, user.password)) {
			res.send('Success');
		} else {
			res.send('Not Allowed');
		}
	} catch (error ) {
		res.status(500).send('error');
	}
});
app.listen(5000);
