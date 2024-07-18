import bcrypt from 'bcrypt';
import { Register } from '../Models/userSchema.js';
import { createToken } from '../Midlewere/authentication.js';

// Register function
const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await Register.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists. Please Login!' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance
        const newUser = new Register({
            name,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        const result = await newUser.save();
        res.status(200).json({ message: "Signup successful", result });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};


// Login function
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        let user = await Register.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Email or Password. Please check..' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(email)
            res.cookie('token', token)
            res.status(200).json({ message: "user login successfully..", user, token })
        } else {
            return res.status(401).json({ message: 'invalid password..' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Get all signup data function
const getAllUsers = async (req, res) => {
    try {
        const users = await Register.find({});
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Get login data function
const GetLoginData = async (req, res) => {
    try {
        // Assuming req.user is set by authentication middleware
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const loginData = await Register.findOne({ email: req.user.email });
        if (!loginData) {
            return res.status(404).json({ message: 'User not logedIn found' });
        }
        res.json(loginData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

// update function
const UpdateLoginData = async (req, res) => {
    const { email, password } = req.body;
    try {
        const updatedItem = await Register.findOne({ email });
        if (!updatedItem) {
            return res.status(404).json({ message: 'user not found..' })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const submit = ({ ...req.body, password: hashedPassword })
        const updateData = await Register.findOneAndUpdate({ email }, { $set: submit }, { new: true })
        res.status(200).json({ message: "user update successfully...", updateData })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete function
const DeleteUserData = async (req, res) => {
    const { email } = req.body; 
    try {
        // Assuming 'Register' is your model or schema
        const deletedItem = await Register.findOneAndDelete({ email: email });

        if (!deletedItem) {
            return res.status(404).json({ message: 'User data not found.' });
        }
        
        res.json({ message: 'User data deleted successfully...' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Logout function
const logout = (req, res) => {
    try {
        // Clear the token cookie on the client side
        res.clearCookie('token');
        
        // Send a response indicating successful logout
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error during logout' });
    }
};

export { signup, login, getAllUsers, GetLoginData, DeleteUserData, UpdateLoginData, logout };