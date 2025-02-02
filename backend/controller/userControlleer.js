const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../config/generateToken')

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body

    //if any field is undefined , we throw an error
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please Enter all the Fields")
    }

    const userExists = await User.findOne({ email });

    //if another user exists with the same email
    if (userExists) {
        res.status(400);
        throw new Error("User already Exists")
    }


    //create user
    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Failed to create User")
    }
})


//authenticate User

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
})



module.exports = { registerUser, authUser }























