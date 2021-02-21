const Joi = require('joi');

module.exports = {
    checkApiParameters: (model) => {
        return async (req, res, next) => {
            const page = parseInt(req.query.page) || 1;
            const number = parseInt(req.query.number) || 20; // return 20 itmes by default
            const { order_by = "_id", order_direction = "asc" } = req.query;

            const startIndex = (page - 1) * number;

            const results = {};

            try {

                const options = {
                    sort: { 
                        [order_by]: order_direction, // sort by
                    }, 
                    limit: number, // page size
                    skip: startIndex //page index
                };

                results.results = await model.find({}, {}, options).exec();

                const totalItems = await model.countDocuments().exec();
                const totalPages = Math.ceil(totalItems / number);

                results.total_items = totalItems;
                results.total_pages = totalPages;
                results.current_page = page;
                res.paginatedResults = results;
                next();
            } catch (e) {
                res.status(500).json({ message: e.message });
            }
        }
    },

    validateBody: (schema) => {
        return (req, res, next) => {
            const { tags } = req.body;
            if (tags) {
                req.body.tags = [tags];
            }
            const result = Joi.validate(req.body, schema);

            if (result.error) {
                return res.status(400).json(result.error);
            }

            if (!req.value) { req.value = {}; }
            req.value['body'] = result.value;
            next();
        }
    },

    schemas: {
        authSchema: Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required(),
            name: Joi.string(),
            facebook: Joi.string()
        }),
        productSchema: Joi.object().keys({
            title: Joi.string(),
            price: Joi.number(),
            category: Joi.string(),
            description: Joi.string(),
            images: Joi.any(),
            tags: Joi.array(),
            attributes: {
                color: Joi.string(),
                size: Joi.string()
            }
        }),
        orderSchema: Joi.object().keys({
            client: Joi.any(),
            products: Joi.any(),
            status: Joi.string(),
            recolector: Joi.string(),
            total: Joi.number()
        }),
        clientSchema: Joi.object().keys({
            name: Joi.string(),
            surname: Joi.string(),
            fb: Joi.string(),
            recolector: Joi.string()
        }),
        categorySchema: Joi.object().keys({
            name: Joi.string(),
            parentId: Joi.string().allow('')
        })
    }
}