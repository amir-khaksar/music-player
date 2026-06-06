const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerValidator = require("./../validators/register");

exports.register = async (req, res) => {
    const validationResult = registerValidator(req.body);
    if (validationResult !== true) {
        return res.status(422).json(validationResult);
    }

    const { username, email, phone, password } = req.body;

    const isUserExist = await userModel.findOne({
        $or: [{ username }, { email }],
    });

    if (isUserExist) {
        return res
            .status(409)
            .json({ message: "Username or Email already exists" });
    }

    const countOfUsers = await userModel.countDocuments();

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
        phone,
        role: countOfUsers > 0 ? "USER" : "ADMIN",
    });

    const userObject = user.toObject();
    Reflect.deleteProperty(userObject, "password");

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30 day",
    });

    return res.status(201).json({ user: userObject, accessToken });
};

exports.login = async (req, res) => {
    const { identifier, password } = req.body;

    const user = await userModel.findOne({
        $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
        return res
            .status(401)
            .json({ message: "No account exists with this email or username" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "password is not valid !!" });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30 day",
    });

    return res.json({ accessToken });
};
