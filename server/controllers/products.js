const Product = require('../models/products');

const isEmptyObject = (obj) => {
    return !Object.keys(obj).length;
}

module.exports = {
    upload: async (req, res, next) => {
        try {
            const { title, price, category, tags } = req.value.body;
            const images = [];
            
            if (req.file) {
                const fullUrl = 'http://localhost:5000/images/';
                images.push(fullUrl + req.file.filename);
            }

            const newProduct = new Product({
                title,
                price,
                category,
                tags,
                images
            });

            await newProduct.save();

            res.status(201).json({ product: newProduct });
        } catch (error) {
            res.status(500).json({
                error: {
                    code: 500,
                    errorMessage: "error creating product"
                }
            });
        }
    },
    getAll: (req, res, next) => {
        if (res.paginatedResults && !isEmptyObject(res.paginatedResults.results)) {
            res.status(200).json({ products: res.paginatedResults });
        } else {
            res.status(204).send();
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
                error.statusCode = 500;
                res.status(500).json({ error });
            }
        } catch (err) {
            let error = new Error();
            error.status = "There was an error on getById";
            error.statusCode = 500;
            res.status(500).json({ error });
        }
    }
}