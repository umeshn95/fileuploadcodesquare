'use strict';
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileRoutes = require('./routes/file-upload-routes');

const port = process.env.PORT || 8080;
const app = express();
app.use(cors());

const name = "var"
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'catalog')));
console.log(path.join(__dirname));
app.use('/api', fileRoutes.routes);

app.listen(port, () => console.log(`server is listening on url http://localhost:${port}`));