const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/', authorization, async (req, res) => {
    try {
        const uid = req.user.id;

        const itemList = await pool.query(
            'SELECT product.product_id, product.product_name, product.product_price FROM product JOIN (SELECT cart_product.product_id FROM cart JOIN cart_product ON cart.cart_id = cart_product.cart_id WHERE cart.user_id = $1 AND cart.cart_status = $2) AS cart_product ON product.product_id = cart_product.product_id',
            [uid, 'active']
        );

        res.json(itemList.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json('Server error');
    }
});

router.post('/', authorization, async (req, res) => {
    try {
        const uid = req.user.id;

        const cart = await pool.query(
            'SELECT cart_id FROM cart WHERE user_id = $1 AND cart_status = $2',
            [uid, 'active']
        );

        const cart_id = cart.rows[0].cart_id;

        await pool.query(
            'UPDATE cart SET cart_status = $1 WHERE cart_id = $2',
            ['inactive', cart_id]
        );

        const order_date = new Date();

        await pool.query(
            'INSERT INTO orders (order_date, cart_id) VALUES ($1, $2)',
            [order_date, cart_id]
        );

        const newCart = await pool.query(
            'INSERT INTO cart (cart_status, user_id) VALUES ($1, $2) RETURNING *',
            ['active', uid]
        );

        res.json(newCart.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).json('Server error');
    }
});

router.post('/item/:product_id', authorization, async (req, res) => {
    try {
        const uid = req.user.id;
        const { product_id } = req.params;

        const cart = await pool.query(
            'SELECT cart_id FROM cart WHERE user_id = $1 AND cart_status = $2',
            [uid, 'active']
        );

        const cart_id = cart.rows[0].cart_id;

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

router.post('/instant/item/:product_id', authorization, async (req, res) => {
    try {
        const uid = req.user.id;
        const { product_id } = req.params;

        const newCart = await pool.query(
            'INSERT INTO cart (cart_status, user_id) VALUES ($1, $2) RETURNING *',
            ['inactive', uid]
        );

        const cart_id = newCart.rows[0].cart_id;

        await pool.query(
            'INSERT INTO cart_product (cart_id, product_id) VALUES ($1, $2) RETURNING *',
            [cart_id, product_id]
        );

        const order_date = new Date();

        const newOrder = await pool.query(
            'INSERT INTO orders (order_date, cart_id) VALUES ($1, $2) RETURNING *',
            [order_date, cart_id]
        );

        res.json(newOrder.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).json('Server error');
    }
});

router.delete('/item/:product_id', authorization, async (req, res) => {
    try {
        const uid = req.user.id;
        const { product_id } = req.params;

        const cart = await pool.query(
            'SELECT cart_id FROM cart WHERE user_id = $1 AND cart_status = $2',
            [uid, 'active']
        );

        const cart_id = cart.rows[0].cart_id;

        const removedItem = await pool.query(
            'DELETE FROM cart_product WHERE cart_id = $1 AND product_id = $2 RETURNING *',
            [cart_id, product_id]
        );

        res.json(removedItem.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).json('Server error');
    }
});

module.exports = router;