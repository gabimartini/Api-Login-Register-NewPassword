/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const client = require('../../db');

const Product = require('../model/product.model')
const Banner = require('../model/banner.model')

const routeProduct = {
 async requestBanner(req, res) {
   const banner = await Banner.findAll()
   if(banner) {
     res.json({banner})
   } else {
     console.log('something went wrong!')
   }
  },

  updateBanner(req, _res) {
    const {
      banner,
    } = req.body;
    Banner.update({photo: banner}, {
      where: {id : 1}
    })
    .then(result => res.send(result))
    .catch(error => console.log(error))
  },

  async requestProduct(req, res) {
   const product =  await Product.findAll()
   if(product) {
    res.json({product})
   } else {
    console.log('something went wrong')
   }
  },

  postProduct(req, _res) {
    const {
      title, image, description, price, type, link,
    } = req.body;
    Product.create({title, image, description, price, type, link})
    .then(() => console.log('New Product ADD'))
    .catch(error => console.log(error))
  },

  deleteProduct(req, _res) {
    const el = req.query.id;
    Product.destroy({
      where: {id: el}
    })
    .then(() => console.log('sucess deleted'))
    .catch(error => console.log(error))
  },

  updateProduct(req, res) {
    const {
      id, title, image, description, price, type
    } = req.body;
    if (image !== '') {
      Product.update({title, description, image, price, type}, {
        where: {
          id
        }
      })
      .then(() => console.log('Product Updated!'))
      .catch(err => console.log(err))
    } else {
      Product.update({title, description, price, type })
      .then(() => console.log('Sucess Update'))
      .catch(error => console.log(error))
    }
  },
};

module.exports = routeProduct;
