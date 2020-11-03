const express = require('express');

const dotenv = require('dotenv');

const cors = require('cors');
const router = require('./router');

const app = express();
dotenv.config();

const port = 3000;

app.use(cors());
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// // get

app.use('/', router);
app.use('/login', router);
app.use('/banner', router);
app.use('/forgot-password', router);

module.exports = app;
