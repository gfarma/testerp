const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
require('dotenv').config();

// Models
const Product = require('./models/Product');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');
const Partner = require('./models/Partner');

// Controllers
const orderController = require('./controllers/orderController'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Ορισμός EJS ως templating engine
app.set('view engine', 'ejs');
// Ορισμός του φακέλου views
app.set('views', __dirname + '/views');

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');

  // Ορισμός σχέσεων μεταξύ μοντέλων
  Order.belongsTo(Partner, { foreignKey: 'PartnerID' });
  Partner.hasMany(Order, { foreignKey: 'PartnerID' });
  Order.hasMany(OrderItem, { foreignKey: 'OrderID' });
  OrderItem.belongsTo(Order, { foreignKey: 'OrderID' });
  Product.hasMany(OrderItem, { foreignKey: 'ProductID' });
  OrderItem.belongsTo(Product, { foreignKey: 'ProductID' });

  // Route για την index σελίδα 
  app.get('/', async (req, res) => {
    try {
      const products = await Product.findAll();
      const orders = await Order.findAll({ include: Partner });
      const orderItems = await OrderItem.findAll(); 
      const partners = await Partner.findAll();
      res.render('index', { products, orders, orderItems, partners }); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Route για τη δημιουργία νέας παραγγελίας 
  app.get('/createOrder', orderController.getCreateOrderPage); 

  // Route για τη λίστα συνεργατών
  app.get('/partnersList', async (req, res) => {
    try {
      const partners = await Partner.findAll();
      res.render('partnersList', { partners }); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Route για τη δημιουργία νέου συνεργάτη
  app.get('/createPartner', (req, res) => {
    res.render('createPartner'); 
  });

  // Route για τη λίστα προϊόντων
  app.get('/productsList', async (req, res) => {
    try {
      const products = await Product.findAll();
      res.render('productsList', { products }); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Route για τη δημιουργία νέου προϊόντος
  app.get('/createProduct', (req, res) => {
    res.render('createProduct'); 
  });

  // Routes για επεξεργασία και διαγραφή προϊόντων
  app.get('/editProduct/:id', async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      res.render('editProduct', { product }); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/deleteProduct/:id', async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      res.render('deleteProduct', { product }); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Routes για επεξεργασία και διαγραφή συνεργατών
  app.get('/editPartner/:id', async (req, res) => {
    try {
      const partner = await Partner.findByPk(req.params.id);
      res.render('editPartner', { partner });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/deletePartner/:id', async (req, res) => {
    try {
      const partner = await Partner.findByPk(req.params.id);
      res.render('deletePartner', { partner });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Routes για επεξεργασία και διαγραφή Order Items
  app.get('/editOrderItem/:id', async (req, res) => { 
    try {
      const orderItem = await OrderItem.findByPk(req.params.id); 
      res.render('editOrderItem', { orderItem }); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/deleteOrderItem/:id', async (req, res) => { 
    try {
      const orderItem = await OrderItem.findByPk(req.params.id); 
      res.render('deleteOrderItem', { orderItem }); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Routes
  const productRoutes = require('./routes/products');
  const orderRoutes = require('./routes/orders');
  const orderItemRoutes = require('./routes/orderItems'); 
  const partnerRoutes = require('./routes/partners');

  app.use('/api/products', productRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/order-items', orderItemRoutes);
  app.use('/api/partners', partnerRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to sync database:', err);
});