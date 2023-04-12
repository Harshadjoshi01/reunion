const CreateError = require("http-errors");
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const { signAccessToken } = require("../validators/jwtvalidation");


var Login = async (req, res, next) => {
  try {
    const { email, password} = req.body;
    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) throw CreateError.NotFound("User not registered");
    // Check for password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw CreateError.Unauthorized("Invalid password");
    // Create and assign a token
    const accessToken = await signAccessToken(user._id);
    res.status(200).json({ AccessToken : accessToken });
  } catch (err) {
    next(err);
  }
};

var Register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        // Check for existing user
        const user = await User.findOne({ email });
        if (user) throw CreateError.Conflict(`${email} is already registered`);

        const saltrounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltrounds);
        // Create new user
        const newUser = new User({ name, email, password: hashedPassword });
        newUser.save().then(async (user) => {
            const accessToken = await signAccessToken(user._id);
            res.status(200).json({ AccessToken : accessToken });
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    Login,
    Register,
};