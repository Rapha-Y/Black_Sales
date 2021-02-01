const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/products', require('./routes/products'));
app.use('/auth', require('./routes/auth'));
app.use('/cart', require('./routes/cart'));
app.use('/purchases', require('./routes/purchases'));
app.use('/user', require('./routes/user'));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});