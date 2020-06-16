const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const { generatePdf } = require("./PdfGenerator");
require('dotenv').config()

const { PORT } = process.env;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }), bodyParser.json());

app.use(express.static(path.join('Public')));

app.post('/api/statement', (req, res, next) => {
    generatePdf(req, res, next);
})

app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'Public', 'index.html'))
})

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))