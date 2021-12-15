const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

//update user
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, { $set:req.body });
      res.status(200).json({
        error: false,
        message: 'Account has been updated successfuly'
      })
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json({
      error: true,
      message: 'You can update only your account'
    });
  }
});

//delete user
router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json({
        error: false,
        message: 'Account has been deleted successfuly'
      })
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json({
      error: true,
      message: 'You can delete only your account'
    });
  }
});

//get user
router.get('/', async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const user = userId 
      ? await User.findById(userId) 
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow user
router.put('/:id/follow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json({ message: "user has been followed" });
      } else {
        res.status(403).json({ message: "you allready follow this user" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json({ message: "you cant follow yourself" });
  }
});

//unfollow user
router.put('/:id/unfollow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json({ message: 'user has been unfollowed' });
      } else {
        res.status(403).json({ message: 'you dont follow this user' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json({ message: 'you cant unfollow yourself' });
  }
});

module.exports = router;
