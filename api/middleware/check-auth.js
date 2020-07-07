const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    console.log('1')
    const token = req.body.token;
    console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log('3')
    req.userData = decoded;
    console.log('4')
    next()
  } catch (error) {
    console.log(error)
    return res.json({
      message: 'Auth failed'
    }).status(401)
  }
}