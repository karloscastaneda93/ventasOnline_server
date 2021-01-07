const JWT = require('jsonwebtoken');
const User = require('../models/users');
const mongoose = require('mongoose');
const { JWT_SECRET } = require('../config/keys');

signToken = user => {
    return JWT.sign({
        iss: 'ventasOnline_app',
        sub: user._id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1) 
    }, JWT_SECRET);
}

module.exports = {
    signUp: async (req, res, next) => {
        try {
            const { name, email, password, facebook} = req.value.body;

            // Check if there is a user with the same email
            let foundUser = await User.findOne({ "local.email": email });

            if (foundUser) { 
                return res.status(403).json({ error: 'Email is already in use'});
            }

            // Is there a FB account with the same email?
            foundUser = await User.findOne({ 
                $or: [
                    { "google.email": email },
                    { "facebook.email": email },
                ] 
            });

            if (foundUser) {
                // Let's merge them?
                foundUser.methods.push('local');
                foundUser.local = {name, email, password, facebook};
                await foundUser.save();
                // Generate the token
                const token = signToken(foundUser);
                // Respond with token
                res.cookie('access_token', token, {
                    httpOnly: false
                });
                res.status(200).json({ success: true });
            }
            
            // Create a new user
            const newUser = new User({ 
                methods: ['local'],
                local: {
                    _id: new mongoose.Types.ObjectId(),
                    email,
                    password,
                    name,
                    facebook
                }
            });

            await newUser.save();

            // Generate the token
            const token = signToken(newUser);
            // Send a cookie containing JWT
            res.cookie('access_token', token, {
                httpOnly: false
            });
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({
                error: {
                    code: 500,
                    errorMessage: "Error Creating User"
                }
            });
        }
    },
    signIn: async (req, res, next) => {
        try {
            //generate token
            const token = signToken(req.user);

            res.cookie('access_token', token, {
                httpOnly: false
            });

            res.status(200).json({ success: true });
        } catch (error) {
            res.status(404).json({ error })
        }
    },
    secret: async (req, res, next) => {
        // secret data, for logged in users
        try {

        } catch (error) {
            res.status(404).json({ error })
        }
    },
    facebookOauth: async (req, res, next) => {
        try {
            // Generate token
            const token = signToken(req.user);
            res.cookie('access_token', token, {
                httpOnly: false
            });
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(404).json({ error })
        }
    },
    signOut: async (req, res, next) => {
        res.clearCookie('access_token');
        console.log(res.cookie);
        res.json({ success: true });
    },

    linkFacebook: async (req, res, next) => {
        res.json({ 
            success: true, 
            methods: req.user.methods, 
            message: 'Successfully linked account with Facebook' 
        });
    },

    unlinkFacebook: async (req, res, next) => {
        // Delete Facebook sub-object
        if (req.user.facebook) {
            req.user.facebook = undefined
        }
        // Remove 'facebook' from methods array
        const facebookStrPos = req.user.methods.indexOf('facebook')
        if (facebookStrPos >= 0) {
            req.user.methods.splice(facebookStrPos, 1)
        }
        await req.user.save()

        // Return something?
        res.json({ 
            success: true,
            methods: req.user.methods, 
            message: 'Successfully unlinked account from Facebook' 
        });
    },

    dashboard: async (req, res, next) => {
        console.log('I managed to get here!');
        res.json({ 
            secret: "resource",
            methods: req.user.methods
        });
    },

    checkAuth: async (req, res, next) => {
        res.json({ success: true });
    }
    
}