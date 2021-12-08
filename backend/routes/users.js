const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

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
        message: 'Account has been updated succesfuly'
      })
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json({
      error: true,
      message: 'You can only update your account'
    });
  }
});

module.exports = router;
