const router = require('express').Router();
const pool = require('../db');

router.post('/item', async (req, res) => {
    try {
        const { cart_id, product_id } = req.body;

        const newItem = await pool.query(
            'INSERT INTO cart_product (cart_id, product_id) VALUES ($1, $2) RETURNING *',
            [cart_id, product_id]
        );

        res.json(newItem.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).json('Server error');
    }
});

module.exports = router;