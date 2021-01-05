const router = require('express').Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const products = await pool.query(
            'SELECT product_id, product_image, product_name, product_price FROM product'
        );

        res.json(products.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json('Server error');
    }
});

module.exports = router;