const db = require('./db');
const container = require('./container');
const auth = require('./auth');
module.exports = {
    ...db,
    ...container,
    ...auth
}