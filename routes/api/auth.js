const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



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

module.exports = router;