const express = require('express');

const router = express.Router();

const profile = require('./api/resources/user.controller');
const routeProduct = require('./api/resources/product.controller');
const newpassword = require('./api/modules/auth');

// product
router.route('/')
  .get(routeProduct.requestProduct)
  .post(routeProduct.postProduct)
  .put(routeProduct.updateProduct)
  .delete(routeProduct.deleteProduct);

// user
router.route('/login')
  .post(profile.RequestUser);

router.route('/register')
  .post(profile.NewUser);

// Get Banner
router.route('/banner')
  .get(routeProduct.requestBanner)
  .put(routeProduct.updateBanner);

router.route('/forgot-password')
  .post(newpassword.forgotPassword);

router.route('/reset-password/:id/:token')
  .put(newpassword.resetPassword);

module.exports = router;
