// const JWT = require('jsonwebtoken');
const Product = require('../models/clients');
const mongoose = require('mongoose');
const Client = require('../models/clients');
// const { JWT_SECRET } = require('../config/keys');

const isEmptyObject = (obj) => {
    return !Object.keys(obj).length;
}

module.exports = {
    create: async (req, res, next) => {
        
        try {
            const { name, surname, fb, recolector } = req.value.body;
  
            
            console.log(req.value.body);
            const newClient = new Client({
                id: new mongoose.Types.ObjectId(),
                name,
                surname,
                fb,
                recolector
            });

            await newClient.save();

            res.status(200).json({ success: true});
        } catch (error) {
            res.status(500).json({
                error: {
                    code: 500,
                    errorMessage: "error creating product"
                }
            });
        }
    },
    getAll: async (req, res, next) => {
        try {
            const clients = await Client.find();
            res.status(200).json({ clients });
        } catch (error) {
            res.status(404).json({ error })
        }
    },
    getById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const clients = await Client.findById(id);
            if (!isEmptyObject( clients )) {
                req.clients = clients;
                res.status(200).json({ clients });
            } else {
                let error = new Error();
                error.status = "There was an error getting that ID";
                error.statusCode = 404;
                res.status(404).json({ error });
            }
        } catch (err) {
            let error = new Error();
            error.status = "There was an error on getById";
            error.statusCode = 500;
            res.status(500).json({ error });
        }
    }
}