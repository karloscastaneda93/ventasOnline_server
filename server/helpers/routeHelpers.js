const Joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
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
            size: Joi.string(),
            color: Joi.string()
        })
    }
}