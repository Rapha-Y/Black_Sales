const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/', authorization, async (req, res) => {
    try {
        const uid = req.user.id;

        const user = await pool.query(
            'SELECT user_name, user_email FROM users WHERE user_id = $1',
            [uid]
        );

        res.json(user.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).json('Server error');
    }
});

module.exports = router;