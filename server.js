let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
let logger = require('morgan');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Import des routes
let UserRoutes = require('./routes/user.routes');
let productRoutes = require('./routes/product.routes');
let OrderRoutes = require('./routes/order.routes');
let AdminRoutes = require('./routes/admin.routes');
let CategoryRoutes = require('./routes/category.routes');
let UnderCategoryRoutes = require('./routes/subCategory.routes');
let ShippingFeesRoutes = require('./routes/shippingFees.routes');
// -----

let app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/user', UserRoutes);
app.use('/order', OrderRoutes);
app.use('/product', productRoutes);
app.use('/admin', AdminRoutes);
app.use('/category', CategoryRoutes);
app.use('/subCategory', UnderCategoryRoutes);
app.use('/shippingFee', ShippingFeesRoutes);
// -----

// DB
let mongoose = require('mongoose');
let mongoDB = 'mongodb://127.0.0.1/Suhi-commerce';

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false);
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// -----

module.exports = app;
