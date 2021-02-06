const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const pool = require('../db');
const authorization = require('../middleware/authorization');

//create new user and give them a cart
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //e-mail validation
        const user = await pool.query(
            'SELECT * FROM users WHERE user_email = $1',
            [email]
        );

        if (user.rows.length !== 0) {
            return res.status(401).json('E-mail is already in use');
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        //user creation
        const newUser = await pool.query(
            'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, bcryptPassword]
        );

        const uid = newUser.rows[0].user_id;
        
        const status = 'active';

        //cart creation
        await pool.query(
            'INSERT INTO cart (cart_status, user_id) VALUES ($1, $2)',
            [status, uid]
        );

        const token = jwtGenerator(uid);

        res.json({ token });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

//log user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        //e-mail validation
        const user = await pool.query(
            'SELECT * FROM users WHERE user_email = $1',
            [email]
        );

        if (user.rows.length === 0) {
            return res.status(401).json('No users are registered under this e-mail');
        }

        //password validation
        const passwordMatches = await bcrypt.compare(password, user.rows[0].user_password);

        if (!passwordMatches) {
            return res.status(401).json('Incorrect password');
        }

        const token = jwtGenerator(user.rows[0].user_id);

        res.json({ token });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
})

//check if user is verified
router.get('/is-verify', authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;