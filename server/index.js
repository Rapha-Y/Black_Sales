const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/products', require('./routes/products'));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});