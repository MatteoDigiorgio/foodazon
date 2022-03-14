const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const ProductsController = require('../controllers/products')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
})

const upload = multer({ storage: storage })

router
  .route('/')
  .get(ProductsController.products_get_products)
  .post(upload.single('image'), checkAuth, ProductsController.products_create_product);

router.get('/:textTyped', ProductsController.products_get_products)

router
  .route('/:productId')
  .get(ProductsController.products_get_product)
  .patch(checkAuth, ProductsController.products_update_product)
  .delete(ProductsController.products_delete_product);

module.exports = router;