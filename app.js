const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = process.env.PORT || 3000;

/**
 * Create Express app
 */
const app = express();

/**
 * Middlewares
 */
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


/**
 * Controller
 */
app.get('/', (req, res) => res.send('App works'));

/**
 * Run server
 */
app.listen(PORT, () => console.log(`App started on port ${PORT}`));