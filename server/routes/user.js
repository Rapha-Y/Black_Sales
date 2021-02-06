const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');
const bcrypt = require('bcrypt');

//get user info
router.get('/', authorization, async (req, res) => {
    try {
        const uid = req.user.id;

        //get info
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

//change user password
router.put('/', authorization, async (req, res) => {
    try {
        const uid = req.user.id;
        const { currentPassword, newPassword } = req.body;

        //password validation
        const user = await pool.query(
            'SELECT user_password FROM users WHERE user_id = $1',
            [uid]
        );

        const passwordMatches = await bcrypt.compare(currentPassword, user.rows[0].user_password)

        if (!passwordMatches) {
            return res.status(401).json('Incorrect password');
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(newPassword, salt);

        //password update
        const newPassUser = await pool.query(
            'UPDATE users SET user_password = $1 WHERE user_id = $2 RETURNING *',
            [bcryptPassword, uid]
        );

        res.json(newPassUser.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).json('Server error');
    }
});

module.exports = router;