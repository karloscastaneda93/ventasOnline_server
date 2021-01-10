const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	methods: {
		type: [String],
		required: true
	},
	local: {
		email: {
			type: String,
			lowercase: true
		},
		password: {
			type: String
		},
		name: {
			type: String
		},
		facebook: {
			type: String
		}
	},
	google: {
		id: {
			type: String
		},
		email: {
			type: String,
			lowercase: true
		}
	},
	facebook: {
		id: {
			type: String
		},
		email: {
			type: String,
			lowercase: true
		},
		name: {
			type: String
		},
		photos: {
			type: Array
		}
	}
});

userSchema.pre('save', async function (next) {
	try {
		console.log('entered');
		if (!this.methods.includes('local')) {
			next();
		}
		//the user schema is instantiated
		const user = this;
		//check if the user has been modified to know if the password has already been hashed
		if (!user.isModified('local.password')) {
			next();
		}
		// Generate a salt
		const salt = await bcrypt.genSalt(10);
		// Generate a password hash (salt + hash)
		const passwordHash = await bcrypt.hash(this.local.password, salt);
		// Re-assign hashed version over original, plain text password
		this.local.password = passwordHash;
		console.log('exited');
		next();
	} catch (error) {
		next(error);
	}
});


userSchema.methods.isValidPassword = async function (newPwd) {
	try {
		return await bcrypt.compare(newPwd, this.local.password);
	} catch (error) {
		throw new Error(error);
	}
}

//create model

const User = mongoose.model('user', userSchema);

module.exports = User;