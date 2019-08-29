const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



//Item Model
const User = require('../../models/User')

//@route POST api/user
//@desc register new users
//@access Public
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //Simple validation
    if (!email || !name || !password) {
      return res.status(400).send({ msg: 'All the fields are required, please.' })
    }
    const newUser = new User({
      name,
      email,
      password
    })

    //Check if the email already exist
    const foundUser = await User.findOne({ email })
    if (foundUser) {
      return res.status(400).send({ msg: 'This user already exists in the system' })
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    newUser.password = hashedPassword


    console.log(process.env.jwt_Secret);

    //Save the user in the db
    const savedUser = await newUser.save();

    //Create the token
    const token = await jwt.sign({ id: savedUser._id }, process.env.jwt_Secret)

    res.status(200).send({
      user: {
        name: savedUser.name,
        email: savedUser.email,
        password: savedUser.password
      }, token
    })

  } catch (err) {
    res.status(400).send(err)
  }
})

//@route POST api/user
//@desc login users
//@access Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    //Simple validation
    if (!email || !password) {
      return res.status(400).send({ msg: 'All the fields are required, please.' })
    }

    //Check if the email exist
    const foundUser = await User.findOne({ email })
    if (!foundUser) {
      return res.status(400).send({ msg: 'This user is not register' });
    }

    //compare the password
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(400).send({ msg: 'Wrong password' })
    }
    res.status(200).send({ msg: 'Log in' })
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router;