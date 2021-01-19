const express = require("express");
const mongoose = require("mongoose"); // Connector for MongoDB
const bodyParser = require("body-parser"); // Let us use requests
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

mongoose.Promise = global.Promise;

const app = express();

// Middlewares

// morgan: HTTP request logger
app.use(morgan('dev'));

// make images dir public
app.use('/images', express.static('images'));

// body-parser: extract the entire body portion of incoming request and exposes it on request.body
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "https://localhost:3000",
		credentials: true
	})
);

// MongoDB config og connection
const db = require("./server/config/keys").mongoURI;

mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("ventasOnline_DB connected..."))
	.catch(err => console.log(err));

// Uses the routes from routes/api/
app.use("/api/products/", require("./server/routes/api/products"));
app.use("/api/users/", require("./server/routes/api/users"));
app.use("/api/clients", require("./server/routes/api/clients"));
app.use("/api/orders", require("./server/routes/api/orders"));
app.use("/api/categories", require("./server/routes/api/categories"));

// not found 
app.use('*', function (req, res, next) {
	let error = new Error();
	error.message = 'Page Not Found';
	error.statusCode = 404;
	res.status(404).json({ error });
	next();
});

const port = 5000; // Sets port for server

app.listen(port, () => console.log(`ventasOnline_app started on port ${port}`));