import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc    get user information by email
// @route   GET /api/users/login
// @access  Public
const getUserInfo = asyncHandler(async (req, res) => {
  // get the user email from the request body
  const { email } = req.body;

  // find the user by email.
  const user = await User.findOne({ email });

  if (user) {
    res.status(200).json({
      _id: user._id,
      firebaseUserId: user.firebaseUserId,
      userName: user.userName,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User sign-in failed');
  }
});

// @desc    register (creat) a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  // get name, email, and password from the request body.
  const { firebaseUserId, userName, email } = req.body;

  // search for a user by firebaseUserId.
  const firebaseUserIdExists = await User.findOne({ firebaseUserId });

  // firebaseUserId doesn't exist - create a new user.
  if (!firebaseUserIdExists) {
    // search for user by email in the database.
    const userExists = await User.findOne({ email });

    // user already exists in the database.
    if (userExists) {
      // send a client errer.
      res.status(400);

      // throw and error.
      throw new Error('Email is used by an existing user');
    }

    // create a new user.
    const user = await User.create({
      firebaseUserId: firebaseUserId,
      userName: userName,
      email: email,
    });

    // new user has been created.
    if (user) {
      // set status to success creation (201) and send user info.
      res.status(201).json({
        _id: user._id,
        firebaseUserId: user.firebaseUserId,
        userName: user.userName,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      // user has not been created.
      res.status(400);

      // throw an error.
      throw new Error('Invalid user data');
    }
  } else {
    // firebaseUserId exists - respond with user info.
    res.status(200).json({
      _id: firebaseUserIdExists._id,
      firebaseUserId: firebaseUserIdExists.firebaseUserId,
      userName: firebaseUserIdExists.userName,
      email: firebaseUserIdExists.email,
      isAdmin: firebaseUserIdExists.isAdmin,
    });
  }
});

// @desc    update user display name
// @route   PUT /api/users/:id
// @access  Private
const updateDisplayName = asyncHandler(async (req, res) => {
  // get the user email from the request body
  const { userId } = req.body;

  // get the updated display name
  const { newDisplayName } = req.body;

  // update display name by id
  const result = await User.updateOne(
    { _id: userId },
    {
      $set: {
        userName: newDisplayName.trim(),
      },
    }
  );

  // Check if any document was modified
  if (result.modifiedCount === 1) {
    res.json({
      message: 'Display name updated successfully',
    });
  } else {
    res.status(404);
    throw new Error('Failed to update display name');
  }
});

// @desc    update user email address
// @route   PUT /api/users/:id/email
// @access  Private
const updateEmail = asyncHandler(async (req, res) => {
  // get the user email from the request body.
  const { userId } = req.body;

  // get the updated display name.
  const { newEmail } = req.body;

  // find user by new email.
  const currentUser = await User.findOne({ email: newEmail });

  console.log(userId, newEmail, currentUser);

  // if a user already exists with the new email, throw an error.
  if (currentUser) {
    res.status(404);
    throw new Error(
      'Unable to change Email. The provided email is registered to another user.'
    );
  }

  // update display name by id
  const result = await User.updateOne(
    { _id: userId },
    {
      $set: {
        email: newEmail.trim(),
      },
    }
  );

  // Check if any document was modified
  if (result.modifiedCount === 1) {
    res.json({
      message: 'Email address updated successfully',
    });
  } else {
    res.status(404);
    throw new Error('Failed to update Email address');
  }
});

export { registerUser, getUserInfo, updateDisplayName, updateEmail };
