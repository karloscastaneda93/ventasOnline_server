// const JWT = require('jsonwebtoken');
const Order = require('../models/orders');
const mongoose = require('mongoose');
// const { JWT_SECRET } = require('../config/keys');

const isEmptyObject = (obj) => {
    return !Object.keys(obj).length;
}

module.exports = {
    
    getAll: async (req, res, next) => {
        try {
            const order = await Order.find();
            res.status(200).json({ order });
        } catch (error) {
            res.status(404).json({ error })
        }
    },

    create: async (req, res, next) => {
        
        try {
            const { client, products, total, recolector  } = req.value.body;
  
            
            console.log(req.value.body);
            const newOrder = new Order({
                _id: new mongoose.Types.ObjectId(),
                client,
                products,
                total,
                recolector
            });

            await newOrder.save();

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
    
}