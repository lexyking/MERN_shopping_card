const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');



//Item Model
const User = require('../../models/User')


//@route POST api/auth
//@desc auth user
//@access Public
router.post('/', async (req, res) => {
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

    const token = await jwt.sign({
      id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email
    },
      process.env.jwt_Secret
    )

    res.status(200).send({
      user: {
        name: foundUser.name,
        email: foundUser.email,
        password: foundUser.password
      }, token
    })
  } catch (err) {
    res.status(400).send(err)
  }
})

//@route GET api/auth/user
//@desc get user data
//@access Private
router.get('/user', auth, async (req, res) => {
  try {
    const foundUser = await User.findById(req.user.id).select('-password')
    if (!foundUser) res.status(401).send({ msg: 'User not found' });
    res.status(200).send(foundUser)
  } catch (err) {
    res.status(400).send({ msg: 'Something went wrong' })
  }
})

module.exports = router;