const app = require('./app');

const config = require('./config');
const mongoose = require('mongoose');

mongoose.connect(config.DB.URL, config.DB.CONFIG)
    .then(() => console.log('Mongodb connected'))
    .catch(err => console.log(err));

    
app.listen(5000,() =>{
    console.log(`server running!`);
})