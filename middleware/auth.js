const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  //Check for token
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    //verify token
    const decoded = jwt.verify(token, process.env.jwt_Secret);

    //Add user from payload
    req.user = decoded;
    next();

  } catch (err) {
    res.status(400).send({ msg: 'token is not valid' })
  }
}

module.exports = auth;