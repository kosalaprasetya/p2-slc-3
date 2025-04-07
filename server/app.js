if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('./router/index')); //routes
app.use(require('./middlewares/errorManagement')); //error handler

app.listen(port, () => console.log(`Server up and running at http://localhost:${port}`));
