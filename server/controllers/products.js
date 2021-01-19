const Product = require('../models/products');
const mongoose = require('mongoose');

const isEmptyObject = (obj) => {
    return !Object.keys(obj).length;
}

module.exports = {
    upload: async (req, res, next) => {
        try {
            const { title, price, type, category, tags } = req.value.body;
            let pathImages = [];

            if (req.files && req.files.length) {
                const fullUrl = 'http://localhost:5000/images/';
                req.files.forEach(({ filename }) => {
                    pathImages.push(fullUrl + filename);
                });
            }

            const newProduct = new Product({
                id: new mongoose.Types.ObjectId(),
                title,
                price,
                type,
                category,
                tags,
                images: pathImages
            });

            await newProduct.save();

            res.status(200).json({ product: newProduct });
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
            const products = await Product.find();
            res.status(200).json({ products });
        } catch (error) {
            res.status(404).json({ error })
        }
    },
    getById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await Product.findById(id);
            if (!isEmptyObject(product)) {
                req.product = product;
                res.status(200).json(product);
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