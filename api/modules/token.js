const jwt = require('jsonwebtoken');

const usePasswordHashToMakeToken = ({
  password: passwordHash,
  id: userId,
  createdat,
}) => {
  // highlight-start
  const secret = `${passwordHash}-${createdat}`;
  const token = jwt.sign( {userId} , secret, {
    expiresIn: 300,
  });
  // highlight-end
  return token;
};

module.exports = usePasswordHashToMakeToken;
