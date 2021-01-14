const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

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

router.post('/', authorization, async (req, res) => {
    try {
        const { name, price, category, image } = req.body;
        const date = new Date();
        const uid = req.user.id;

        const newProduct = await pool.query(
            'INSERT INTO product (product_name, product_price, product_date, product_category, user_id, product_image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, price * 100, date, category, uid, image]
        );

        res.json(newProduct.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).json('Server error');
    }
});

module.exports = router;