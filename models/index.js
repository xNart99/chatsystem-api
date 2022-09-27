const user = require('./user.model');
const group = require('./group.model');
module.exports = {
    ...user,
    ...group
}