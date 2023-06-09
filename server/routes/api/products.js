const express = require("express");
const multer = require("multer");
const router = express.Router();
const fs = require("fs");

const uploadPath = 'images';

const { checkApiParameters, validateBody, schemas } = require('../../helpers/routeHelpers');
const ProductsController = require("../../controllers/products");
const ProductsModel = require("../../models/products");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './images');
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

function checkUploadPath(req, res, next) {
    fs.exists(uploadPath, function (exists) {
        if (exists) {
            next();
        }
        else {
            fs.mkdir(uploadPath, function (err) {
                console.log('Error: Images folder not found, creating...');
                if (err) {
                    console.log('Error: Images folder could not be created');
                    next();
                }
                console.log('Success: Images folder created');
                next();
            })
        }
    })
}

router.get("/", checkApiParameters(ProductsModel), ProductsController.getAll);

router.get("/:id", ProductsController.getById);

router.route("/upload")
    .post(checkUploadPath, upload.single('images'), validateBody(schemas.productSchema), ProductsController.upload);

module.exports = router;