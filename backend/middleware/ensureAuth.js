import { admin } from '../config/firebase-config.js';

const ensureAuth = async (req, res, next) => {
  // variable to store the token value.
  let token;

  // check if a token is provided.
  if (!req.headers.token) {
    // no token has been provided: return an error message.
    return res.status(404).json({ message: 'Error: invalid token' });
  } else {
    // token has been provided: store it in the token variable.
    token = req.headers.token.split(' ')[1];
  }

  try {
    const decodeValue = await admin.auth().verifyIdToken(token);

    if (decodeValue) {
      req.user = decodeValue;
      return next();
    } else {
      return res
        .status(403)
        .json({ message: 'Unauthorized: Only logged in users' });
    }
  } catch (err) {
    return res.status(403).json({ message: 'Internal Error: Invalid token' });
  }
};

export { ensureAuth };
