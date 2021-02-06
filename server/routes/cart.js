const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

//get cart items
router.get('/', authorization, async (req, res) => {
    try {
        const uid = req.user.id;

        //get items
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

//submit current cart and create new one
router.post('/', authorization, async (req, res) => {
    try {
        const uid = req.user.id;

        //find current cart
        const cart = await pool.query(
            'SELECT cart_id FROM cart WHERE user_id = $1 AND cart_status = $2',
            [uid, 'active']
        );

        const cart_id = cart.rows[0].cart_id;

        //deactivate current cart
        await pool.query(
            'UPDATE cart SET cart_status = $1 WHERE cart_id = $2',
            ['inactive', cart_id]
        );

        const order_date = new Date();

        //create order of current cart
        await pool.query(
            'INSERT INTO orders (order_date, cart_id) VALUES ($1, $2)',
            [order_date, cart_id]
        );
        
        //create new cart
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

//add item to cart
router.post('/item/:product_id', authorization, async (req, res) => {
    try {
        const uid = req.user.id;
        const { product_id } = req.params;

        //select current cart
        const cart = await pool.query(
            'SELECT cart_id FROM cart WHERE user_id = $1 AND cart_status = $2',
            [uid, 'active']
        );

        const cart_id = cart.rows[0].cart_id;

        //add item to cart
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

//create new order with a single product cart
router.post('/instant/item/:product_id', authorization, async (req, res) => {
    try {
        const uid = req.user.id;
        const { product_id } = req.params;

        //create new cart
        const newCart = await pool.query(
            'INSERT INTO cart (cart_status, user_id) VALUES ($1, $2) RETURNING *',
            ['inactive', uid]
        );

        const cart_id = newCart.rows[0].cart_id;

        //add product
        await pool.query(
            'INSERT INTO cart_product (cart_id, product_id) VALUES ($1, $2) RETURNING *',
            [cart_id, product_id]
        );

        const order_date = new Date();

        //add new order
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

//remove item from cart
router.delete('/item/:product_id', authorization, async (req, res) => {
    try {
        const uid = req.user.id;
        const { product_id } = req.params;

        //find current cart
        const cart = await pool.query(
            'SELECT cart_id FROM cart WHERE user_id = $1 AND cart_status = $2',
            [uid, 'active']
        );

        const cart_id = cart.rows[0].cart_id;

        //remove item from cart
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