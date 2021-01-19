const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/', authorization, async (req, res) => {
    try {
        const uid = req.user.id;

        const productOrder = await pool.query(
            'SELECT orders.order_id, orders.order_date, cart_product.product_id, cart_product.product_name, cart_product.product_price FROM orders JOIN (SELECT cart.cart_id, cart_product.product_id, cart_product.product_name, cart_product.product_price FROM cart JOIN (SELECT cart_product.cart_id, product.product_id, product.product_name, product.product_price FROM cart_product JOIN product ON cart_product.product_id = product.product_id) AS cart_product ON cart.cart_id = cart_product.cart_id WHERE cart_status = $1 AND user_id = $2) AS cart_product ON orders.cart_id = cart_product.cart_id',
            ['inactive', uid]
        );

        const productOrderList = productOrder.rows;

        let orderList = [];
        //for each product-order item
        productOrderList.forEach(item => {
            if (orderList.length === 0) {
                //add new order to order list
                orderList.push({
                    order_id: item.order_id,
                    order_date: item.order_date,
                    product_list: [
                        {
                            product_id: item.product_id,
                            product_name: item.product_name,
                            product_price: item.product_price
                        }
                    ]
                });
            } else {
                //search for order list item with the same order id as the current item
                let foundOrder = null;
                orderList.some(order => {
                    if (order.order_id === item.order_id) {
                        foundOrder = order;
                        return true;
                    } else {
                        return false;
                    }
                });

                //there is no order list item with the same order id as the current item
                if (foundOrder === null) {
                    //add new order to order list
                    orderList.push({
                        order_id: item.order_id,
                        order_date: item.order_date,
                        product_list: [
                            {
                                product_id: item.product_id,
                                product_name: item.product_name,
                                product_price: item.product_price
                            }
                        ]
                    });
                //there is a order list item with the same order id as the current item
                } else {
                    //add new product to the found order
                    foundOrder.product_list.push({
                        product_id: item.product_id,
                        product_name: item.product_name,
                        product_price: item.product_price
                    });
                }
            }
        });
        
        res.json(orderList);
    } catch (error) {
        console.log(error.message);
        res.status(500).json('Server error');
    }
});

module.exports = router;