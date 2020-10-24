const router = require('express').Router()
const {check, validationResult} = require('express-validator')
const bycrpt = require('bcrypt')
const JWT = require('jsonwebtoken')


router.post('/signup', [
    check('email', 'Please provide a valid email')
        .isEmail(),
    check('password', 'Password must be greater than 8 characters')
        .isLength({min: 8}),
    check('confirmPassword', 'You must confirm you password')
        .not()
        .isEmpty()
], async (req, res) => {
    // Checking if input results are valid
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            errors: errors.array()
        })
    }

    const {email, password, confirmPassword} = req.body

    // Checking if passwords match
    if(password !== confirmPassword){
        return res.status(400).json({
            errors: [
                {
                    msg: "Passwords do not match"
                }
            ]
        })
    }

    // Checking if email already exists in the database

    // // If user does not exist, hash the password
    const hashedPassword = await bycrpt.hash(password, 10)

    // Save user in the database

    // Create JSON web token
    const token = await JWT.sign({email}, keys.JWTSecret, {expiresIn: 360000});

    res.json({
        token
    })
})



module.exports = router