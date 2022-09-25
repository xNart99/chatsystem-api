const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    role: {
        type: String
    }
});

const Users = mongoose.model("Users", userSchema, "Users");
module.exports = {
    Users
}