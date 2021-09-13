const router = require("express").Router();

const Users = require("./users-model.js");

const protected = (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    next({ status: 401, message: 'you must be authed to see this' })
  }
}

router.get("/", protected, (req, res, next) => { // we will protect this one!!!!
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(next);
});

module.exports = router;
