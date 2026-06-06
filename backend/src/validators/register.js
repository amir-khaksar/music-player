const validator = require("fastest-validator");

const v = new validator();

const schema = {
    username: { type: "string", min: 3, max: 100 },
    email: { type: "email", min: 10, max: 100 },
    phone: { type: "string", min: 11, max: 11 },
    password: { type: "string", min: 8, max: 24 },
    confirmPassword: { type: "equal", field: "password" },
    $$strict: true,
};

const check = v.compile(schema);

module.exports = check;
