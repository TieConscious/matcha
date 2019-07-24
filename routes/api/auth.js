const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//Item Model
const User = require('../../models/User.model');

//@route	POST api/auth
//@desc		Authenticate user
//@access	Public
router.post('/', (req, res) => {
	const { username, password } = req.body;

	//Simple validation
	if (!username || !password) {
		return res.status(400).json({ msg: 'Please enter all fields' });
	}

	//Check for existing user
	User.findOne({ username })
		.then(
			user => {
				if (!user)
					return res.status(400).json({ msg: 'User does not exist' });

		// Validate password
		bcrypt.compare(password, user.password)
			.then(isMatch => {
				if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

				jwt.sign(
					{ id: user.id },
					config.get('jwtSecret'),
					{ expiresIn: 3600 },
					(err, token) => {
						if(err) throw err;
						res.json({
							token,
							user: {
								id: user.id,
								name: user.name,
								email: user.email
							}
						});
					}
				)
			})
	})
});

module.exports = router;
