module.exports = {
	mongoURI: process.env.MONGO_URI,
	JWT_SECRET: process.env.JWT_SECRET,
	oauth: {
		facebook: {
			clientID: process.env.FB_CLIENT_ID,
			clientSecret: process.env.FB_CLIENT_SECRET
		}
	}
};

// URL:27017
// mongodb: is the protocol definition
// localhost: 27017 is the server we are connecting to
// /myproject: is the database we wish to connect to

// https://mongodb.github.io/node-mongodb-native/2.0/tutorials/connecting/