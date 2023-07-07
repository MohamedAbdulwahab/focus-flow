import { admin } from '../config/firebase-config.js';

const ensureAuth = async (req, res, next) => {
  const token = req.headers.token.split(' ')[1];

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
