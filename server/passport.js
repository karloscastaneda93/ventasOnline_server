const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const localStrategy = require('passport-local').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const { JWT_SECRET, oauth } = require("./config/keys");
const { cookieExtractor } = require("./helpers/common");
const User = require('./models/users');

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
	jwtFromRequest: cookieExtractor.bind({ name: "access_token" }),
	secretOrKey: JWT_SECRET,
	passReqToCallback: true
}, async (req, payload, done) => {
	try {
		// Find the user specified in token
		const user = await User.findById(payload.sub);

		// If user doesn't exists, handle it
		if (!user) {
			return done(null, false);
		}

		// Otherwise, return the user
		req.user = user;
		done(null, user);
	} catch (error) {
		done(error, false);
	}
}));

// Facebook token Strategy
passport.use('facebookToken', new FacebookTokenStrategy({
	clientID: oauth.facebook.clientID,
	clientSecret: oauth.facebook.clientSecret,
	passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
	try {
		if (req.user) {
			// We're already logged in, time for linking account!
			// Add Facebook's data to an existing account
			req.user.methods.push('facebook')
			req.user.facebook = {
				id: profile.id,
				email: profile.emails[0].value,
				name: profile.displayName,
				photos: profile.photos
			}
			await req.user.save();
			return done(null, req.user);
		} else {
			// We're in the account creation process
			let existingUser = await User.findOne({ "facebook.id": profile.id });
			if (existingUser) {
				return done(null, existingUser);
			}

			// Check if we have someone with the same email
			existingUser = await User.findOne({ "local.email": profile.emails[0].value })
			if (existingUser) {
				// We want to merge facebook's data with local auth
				existingUser.methods.push('facebook')
				existingUser.facebook = {
					id: profile.id,
					email: profile.emails[0].value,
					name: profile.displayName,
					photos: profile.photos
				}
				await existingUser.save()
				return done(null, existingUser);
			}

			const newUser = new User({
				methods: ['facebook'],
				facebook: {
					id: profile.id,
					email: profile.emails[0].value,
					name: profile.displayName,
					photos: profile.photos
				}
			});

			await newUser.save();
			done(null, newUser);
		}
	} catch (error) {
		done(error, false, error.message);
	}
}));

// Local Strategy
passport.use(new localStrategy({
	usernameField: 'email'
}, async (email, password, done) => {
	try {
		//find user by email
		const user = await User.findOne({ "local.email": email });

		// if not, handle
		if (!user) {
			return done(null, false);
		}

		//check password is correct
		const isMatched = await user.isValidPassword(password);

		// if not, hanndle
		if (!isMatched) {
			return done(null, false);
		}

		// everything good? return user
		done(null, user);
	} catch (error) {
		done(error, false);
	}
}));