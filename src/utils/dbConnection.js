const mongoose = require('mongoose')

const connectorDb = (databaseURL) => {
    mongoose.connect(databaseURL)
    const db = mongoose.connection

    db.on('error', (error) => {
        console.error('Connection error:', error)
    })
    db.on('connection', () => {
        console.log('Connection established...')
    })
    db.on('disconnected', () => {
        console.log('DB Disconnected..')
    })
}

module.exports = connectorDb;
