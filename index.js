const express = require('express');
const path = require('path');
const cors = require('cors');
const router = express.Router();
const es6Renderer = require('express-es6-template-engine');

const app = express();

// Enable CORS
app.use(cors());

// Middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());

app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

// Routes
router.get('/', (req, res) =>
  res.render('index')
);

app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App started on port ${PORT}`));