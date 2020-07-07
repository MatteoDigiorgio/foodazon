var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var path = require('path');

var productRoutes = require('./api/routes/products');
var cartRoutes = require('./api/routes/cart');
var orderRoutes = require('./api/routes/orders');
var userRoutes = require('./api/routes/user');


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
  next();
});

app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);
app.use('/uploads', express.static('uploads'));

mongoose.connect(
  'mongodb+srv://matteo_digiorgio:' +
  process.env.MONGO_ATLAS_PW +
  '@clustertest-2ysg8.mongodb.net/' +
  process.env.MONGO_ATLAS_DB_NAME +
  '?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  function (err) {
    if (err) {
      console.log('Not connected to the database \n' + err);
    } else {
      console.log('Succesfully connected to MongoDB')
    }
  });

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error)
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname + "/src/index.html"));
});

app.listen(port, function () {
  console.log('Running the server on port ' + port)
});