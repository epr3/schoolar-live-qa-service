const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
require('./config/bookshelf');
require('./models');

const sessionRoutes = require('./routes/session');
const answerRoutes = require('./routes/answer');
const questionRoutes = require('./routes/question');
const ratingRoutes = require('./routes/rating');

const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(methodOverride());
app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dir = path.join(__dirname, '..', 'uploads');
app.use(express.static(dir));

app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

app.use(sessionRoutes);
app.use(ratingRoutes);
app.use(answerRoutes);
app.use(questionRoutes);

// ALWAYS USE ERROR MIDDLEWARE LAST !!!!
app.use(errorMiddleware);

if (process.env.NODE_ENV !== 'TEST') {
  const server = app.listen(process.env.PORT || 3000, () => {
    const { port } = server.address();
    console.log('Listening on port ' + port);
  });
}

module.exports = app;
