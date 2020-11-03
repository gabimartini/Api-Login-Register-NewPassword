const nodemailer = require('nodemailer');

const testAccount = nodemailer.createTestAccount();
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  // port: 587,
  // secure: false, // true for 465, false for other ports
  auth: {
    user: testAccount.user, // generated ethereal user
    pass: testAccount.pass, // generated ethereal password
  },
  sendmail: true,  
});

const template = (user, token) => {
  const id = user.id
  const from = testAccount.user;
  const to = `'${user.email}'`;
  const subject = '🌻 Backwoods Password Reset 🌻';
  const url = `http://localhost:3000/reset-password/${id}/${token}`;
  const html = `
  <p>Hey ${user.username},</p>
  <p>We heard that you lost your Backwoods password. Sorry about that!</p>
  <p>But don’t worry! You can use the following link to reset your password:</p>
  <a href= ${url}></a>
  <p>Do something outside today! </p>
  <p>–Your friends at Backwoods</p>
  `;

  return {
    from, to, subject, html, url, id
  };
};

async function main() {
  await testAccount;
}

main().catch(console.error);

module.exports = {
  transporter,
  template,
};
