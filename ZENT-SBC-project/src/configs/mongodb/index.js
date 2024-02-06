const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://phamvietbaohung1511:POZpttsRTMeE8TuU@cluster0.fcrfowa.mongodb.net/scb-api?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log('Database - Connect successfully !!!');
    } catch (error) {
        console.log('Database - Connect failure!!!');
    }
}

module.exports = {connect};