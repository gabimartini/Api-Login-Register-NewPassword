const bcrypt = require('bcrypt');

const User = require('../model/user.model');
const usePasswordHashToMakeToken = require('../modules/token')

const profile = {
  async NewUser(req, res) {
    const newUser = req.body;
    await User.findOne({ where: {email: req.body.email}})
    .then(user => {
      if (user) return console.log('user already exist!')
      User
      .create({username: newUser.name, email: newUser.email, password: newUser.password})
      .then(() => {
        res.send('Sucess Add!')
      })
      .catch( err => res.send(err))
    })
    .catch(() => console.log('Something Went Wrong!'))
  },

  //Login
  RequestUser(req, res) {
    const { user, password } = req.body;
    User.findOne({
      where: {
        username: user,
      }
    })
    .then(user => {
      if (user) {
       const verified = bcrypt.compareSync(password, user.password);
       if( !verified) {
         console.log('wrong password')
       } else {
          const token = usePasswordHashToMakeToken(user)
          res.send({
            id: user.id,
            email: user.email,
            username: user.username,
            token: token
  })
    }
      } else {
        console.log('Not user found')
      }
    })
    .catch(error => console.log(error))
  },

};

module.exports = profile;
