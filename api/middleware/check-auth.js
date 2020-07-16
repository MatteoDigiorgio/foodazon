const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.body.token;
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next()
  } catch (error) {
    console.log(error)
    return res.json({
      message: 'Auth failed'
    }).status(401)
  }
}