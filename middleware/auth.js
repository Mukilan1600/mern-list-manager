const jwt = require("jsonwebtoken");
const config = require("config");

const auth = (req, res, next) => {
  const jwtTok = req.header("x-auth-token");
  if (!jwtTok)
    return res.status(401).json({ errmsg: "Invalid or missing token" });
  try {
    const decodedTok = jwt.verify(jwtTok, config.get("JWT_Secret"));
    req.user = decodedTok;
    next();
  } catch (e) {
    return res.status(401).json({ errmsg: "Invalid or missing token" });
  }
};

module.exports = auth;
