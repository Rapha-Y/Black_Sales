const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const pool = require('../db');

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

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

        const newUser = await pool.query(
            'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, bcryptPassword]
        );

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({ token });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await pool.query(
            'SELECT * FROM users WHERE user_email = $1',
            [email]
        );

        if (user.rows.length === 0) {
            return res.status(401).json('No user is registered under this e-mail');
        }

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

module.exports = router;