const express = require('express');

const userRoutes = require('./src/routes/user.route');

const constant = require('./src/utils/constant');
const connectorDb = require('./src/utils/dbConnection');

const app = express();
app.use(express.json());

connectorDb(constant.mongoDbPath)

app.use('/api', userRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
