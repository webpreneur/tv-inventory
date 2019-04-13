require('dotenv').config();

const express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    bodyParser = require('body-parser');

const tvRoutes = require('./routes/tvs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello from the root route');
});

app.use('/api/tvs', tvRoutes);

app.listen(port, () => console.info('app is running on port ' + port));
