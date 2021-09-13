const router = require("express").Router();

const Users = require("./users-model.js");

router.get("/", (req, res, next) => { // we will protect this one!!!!
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(next);
});

module.exports = router;
