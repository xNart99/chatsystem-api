const mongoose = require("mongoose");
const { stringify } = require("uuid");
const groupSchema = new mongoose.Schema({
    id: {
        type: String
    },
    members: {
        type: [String],
        default: ["admin"]
    },
    channels: {
        type: [
            {
                id: String,
                accessingUsers: [String],
                createdAt: Number,
                updatedAt: Number,
                messages: [{
                    id: String,
                    content: String,
                    createdAt: Number,
                    form: String,
                    type: String
                }],
                name: String,
                read: []
            }
        ],
        default: []
    },
    createdAt: {
        type: Number
    },
    updatedAt: {
        type: Number
    },
    name: {
        type: String
    },
    read: {
        type: [],
        default: []
    },

});

const Groups = mongoose.model("Groups", groupSchema, "Groups");
module.exports = {
    Groups
}