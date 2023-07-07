import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// protect: a middleware to protect routes.
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // read the token (named jwt) from the cookies.
  token = req.cookies.jwt;
  console.log(token);

  if (token) {
    try {
      // verify the token.
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // assign the user to req.user so we can use 'req.user' to get user info.
      req.user = await User.findById(decoded.userId).select('-password');

      // move on to the next piece of middleware.
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized - Token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized - No token');
  }
});

// admin: a middle to allow access to only admin users.
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as admin');
  }
};

export { protect, admin };
