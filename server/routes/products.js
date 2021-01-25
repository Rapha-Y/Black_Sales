const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');
const url = require('url');

router.get('/', async (req, res) => {
    try {
        const queryObj = url.parse(req.url, true).query;
        const { category, text } = queryObj;

        let products;

        if (category === 'All') {
            products = await pool.query(
                'SELECT product_id, product_image, product_name, product_price FROM product WHERE LOWER(product_name) LIKE LOWER($1) ORDER BY product_date DESC LIMIT 100',
                [`%${text}%`]
            );
        } else {
            products = await pool.query(
                'SELECT product_id, product_image, product_name, product_price FROM product WHERE product_category = $1 AND LOWER(product_name) LIKE LOWER($2) ORDER BY product_date DESC LIMIT 100',
                [category, `%${text}%`]
            );
        }

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
            'SELECT users.user_name, product.product_name, product.product_price, product.product_date, product.product_category, product.product_image FROM product JOIN users ON product.user_id = users.user_id WHERE product_id = $1',
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