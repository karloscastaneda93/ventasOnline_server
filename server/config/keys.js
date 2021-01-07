module.exports = {
  mongoURI: "mongodb://localhost/ventasOnline_DB", //process.env.MONGO_URI
  JWT_SECRET: "vent@5onlin3_S3cret_fUk1ng_sTRing_42069", //process.env.JWT_SECRET
  oauth:{
    facebook:{
      clientID:'776669173200188', //process.env.FB_CLIENT_ID
      clientSecret:'6aafc8c24e62e72fc765352960a96b52' //process.env.FB_CLIENT_SECRET
    }
  }
};

// URL:27017
// mongodb: is the protocol definition
// localhost: 27017 is the server we are connecting to
// /myproject: is the database we wish to connect to

// https://mongodb.github.io/node-mongodb-native/2.0/tutorials/connecting/