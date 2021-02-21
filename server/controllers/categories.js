const Category = require('../models/categories');
const slugify = require('slugify');
const { generateRandomId } = require("../helpers/common");

function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;

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
    delete: async (req, res) => {
        const { ids } = req.body.payload;
        const deletedCategories = [];
        for (let i = 0; i < ids.length; i++) {
            const deleteCategory = await Category.findOneAndDelete({
                _id: ids[i]._id
            });
            deletedCategories.push(deleteCategory);
        }

        if (deletedCategories.length == ids.length) {
            res.status(201).json({ message: "Categories removed" });
        } else {
            res.status(400).json({ message: "Something went wrong" });
        }
    },
    getAll: async (_req, res) => {
        try {
            const categories = await Category.find();
            res.status(200).json({ categories: createCategories(categories) });
        } catch (error) {
            res.status(404).json({ error });
        }
    },
    update: async (req, res) => {
        try {
            const { _id, name, parentId } = req.value.body;
            const updatedCategories = [];

            if (name instanceof Array) {
                for (let i = 0; i < name.length; i++) {
                    const category = {
                        name: name[i]
                    };
                    if (parentId[i] !== "") {
                        category.parentId = parentId[i];
                    }

                    const updatedCategory = await Category.findOneAndUpdate({ _id: _id[i] }, category, { new: true });
                    updatedCategories.push(updatedCategory);
                }
                return res.status(201).json({ updateCategories: updatedCategories });
            } else {
                const category = {
                    name
                };
                if (parentId !== "") {
                    category.parentId = parentId;
                }
                const updatedCategory = await Category.findOneAndUpdate({ _id }, category, { new: true });
                return res.status(201).json({ updatedCategory });
            }
        } catch (error) {
            res.status(404).json({ error });
        }
    }
}