const jwt = require('jsonwebtoken');

module.exports = function(userId){
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
};