const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ errmsg: "Please enter all the fields..." });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, encryptedPass) => {
      if (err) throw err;
      const newUser = new User({ name, email, password: encryptedPass });
      newUser
        .save()
        .then((user) => {
          jwt.sign(
            { id: user.id },
            config.get("JWT_Secret"),
            { expiresIn: 604800 },
            (err, jwtToken) => {
              if (err) throw err;
              return res.json({
                jwtToken,
                user: { id: user.id, name: user.name, email: user.email },
              });
            }
          );
        })
        .catch((err) => {
          return res.status(400).json({ errmsg: "User already Exist" });
        });
    });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ errmsg: "Please enter all the fields" });
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ errmsg: "Invalid Credentials" });
    bcrypt
      .compare(password, user.password)
      .then((isMatch) => {
        if (!isMatch)
          return res.status(401).json({ errmsg: "Invalid Credentials" });
        jwt.sign(
          { id: user.id },
          config.get("JWT_Secret"),
          { expiresIn: 604800 },
          (err, jwtToken) => {
            if (err) throw err;
            return res.json({
              jwtToken,
              user: { id: user.id, name: user.name, email: user.email },
            });
          }
        );
      })
      .catch((err) => console.log(user.password));
  });
});

router.get("/auth", auth, (req, res) => {
  User.findById(req.user.id, "id name email").then(({ id, name, email }) => {
    res.json({ id, name, email });
  });
});

module.exports = router;
