const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const { send } = require('process');

const app = express();

require('./database');

// Settings
app.set('port', process.env.PORT || 3100);


// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(multer({storage}).array('image', 5));


// Routes
app.use(require('./routes/products.routes'));
app.use(require('./routes/users.routes'));
app.use(require('./routes/cartItems.routes'));
app.use(require('./routes/payments.routes'));
app.use(require('./routes/noUsers.routes'));
app.use('/', () => {
    send('connected')
})



module.exports = app;