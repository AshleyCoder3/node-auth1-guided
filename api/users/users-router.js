const router = require("express").Router();

const Users = require("./users-model.js");

//put in in a central location
const onlyAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    next({
      status: 401,
      message: 'YOU must be authenticated to see this'
    });
  }
};


router.get("/", onlyAuth, (req, res, next) => { // we will protect this !!!
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(next);
});

module.exports = router;
