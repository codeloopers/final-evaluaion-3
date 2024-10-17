const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');



const Register = require('../Server/Models/User');

dotenv.config();

const app = express();
const Auth = require('./Middleware/Auth.js')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());







// SignUp Route
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExist = await Register.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: 'User Already Exists' });
        }
        const encryptedPass = await bcrypt.hash(password, 10);
        const user = new Register({ name, email, password: encryptedPass });
        await user.save();

        res.status(201).json({ status: 'Success', message: 'User signed up successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'Failed', message: 'Internal server error' });
    }
});

// Login Route
app.post('/Login', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await Register.findOne({ email }).lean();
        if (!user) {
            return res.status(400).json({ status: 'Failed', message: 'Invalid email or password' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ status: 'Failed', message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '1H' } 
        );

        res.json({ status: 'Success', message: 'User logged in successfully', token, userId: user._id, name: user.name });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ status: 'Failed', message: 'Internal server error' });
    }
});

// Server Initialization
const server = app.listen(process.env.PORT, async () => {
    if (!process.env.MONGO_URL) {
        throw new Error('MONGO_URL is not defined');
    }

    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log(`Server is up at port ${process.env.PORT} and Mongoose is connected`);
            
        })
        .catch((error) => console.error('Mongoose connection error:', error));
});