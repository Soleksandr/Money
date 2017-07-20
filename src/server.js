const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);
app.listen(port, () => console.log(`Server is running on port ${port}`));
