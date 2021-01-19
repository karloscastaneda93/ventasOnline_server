const Category = require('../models/categories');
const slugify = require('slugify');
const { generateRandomId } = require("../helpers/common");

function createCategories(categories, parentId = null) {
    let categoryList = [],
        category;

    if (parentId === null) {
        category = categories.filter(cat => cat.parentId == undefined);
    } else {
        category = categories.filter(cat => cat.parentId == parentId);
    }

    category.map((element, index) => {
        categoryList.push({
            _id: element._id,
            name: element.name,
            slug: element.slug,
            parentId: element.parentId,
            children: createCategories(categories, element._id)
        });
    });

    return categoryList;
}

module.exports = {
    create: async (req, res) => {
        try {
            const { name, parentId } = req.value.body;

            const newCategory = new Category({
                name: name,
                slug: `${slugify(name)}-${generateRandomId('-', name)}`
            });

            if (parentId) newCategory.parentId = parentId;

            await newCategory.save();

            res.status(201).json({ success: true });
        } catch (error) {
            res.status(500).json({
                error: {
                    code: 500,
                    errorMessage: error
                }
            });
        }
    },
    getAll: async (req, res) => {
        try {
            const categories = await Category.find();
            res.status(200).json({ categories: createCategories(categories) });
        } catch (error) {
            res.status(404).json({ error })
        }
    },
}