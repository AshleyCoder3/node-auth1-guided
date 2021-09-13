const router = require("express").Router();

const Users = require("./users-model.js");

const onlyAuthed = (req, res, next) => { // put it in a centralized location
  if (req.session.user) {
    next()
  } else {
    next({ status: 401, message: 'you must be authed to see this' })
  }
}

router.get("/", onlyAuthed, (req, res, next) => { // we will protect this one!!!!
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(next);
});

module.exports = router;
