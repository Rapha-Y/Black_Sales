const router = require('express').Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const products = await pool.query(
            'SELECT product_id, product_image, product_name, product_price, product_category FROM product'
        );

        res.json(products.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json('Server error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const product = await pool.query(
            'SELECT * FROM product WHERE product_id = $1',
            [id]
        );

        res.json(product.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).json('Server error');
    }
});

module.exports = router;