const Product = require('../models/Product');
const Partner = require('../models/Partner'); // Εισαγωγή του μοντέλου Partner

exports.getCreateOrderPage = async (req, res) => {
  try {
    const products = await Product.findAll();
    const partners = await Partner.findAll(); // Ανάκτηση όλων των partners
    res.render('createOrder', { products: products, partners: partners }); // Πέρασμα των partners στο template
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('An error occurred while fetching products.');
  }
};
