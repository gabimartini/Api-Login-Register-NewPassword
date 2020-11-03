const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const usePasswordHashToMakeToken = require('./token');
const User = require('../model/user.model');
const { transporter, template } = require('./email');

const newpassword = {
  async forgotPassword(req, res) {
    const { email } = req.body;
    User.findOne({
      where: { email }
    })
    .then(user => {
      if (!user) console.log('No email registered!')
      else {
        const token = usePasswordHashToMakeToken(user);
        const templateSend = template(user, token);
        const sendEmail = () => {
          transporter.sendMail(templateSend, (error, info) => {
            if (error) {
              // res.send(error);
              console.log('não foi enviado', error)
            } else {
              console.log(info)
              res.send(templateSend.url);
            }
          });
        }
        sendEmail(user);
      }
    })
    .catch(error => console.log('error:',error))    
  },

  resetPassword(req, res) {
    const { id, token } = req.params;
    const { password } = req.body;
    User.findOne({
      where: { id }
    })
    .then(user => {
      const secret = `${user.password} - ${user.createdat}`
      const payload = jwt.decode(token, secret);
      if( payload.userId === user.id) {

        const saltRounds = 10;
        const hash = bcrypt.hashSync(password.toString(), saltRounds);
            User.update({ password: hash }, {
              where: {
                id: payload.userId
              }
            })
            .then(() => console.log('password updated!'))
            .catch(error => console.log(error))
      }
    })
    .catch(error => console.log(error))
  },
};

module.exports = newpassword;
