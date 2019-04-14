require('dotenv').config();

const
    express = require('express'),
    cors = require('cors'),
    app = express(),
    port = process.env.PORT || 8080,
    bodyParser = require('body-parser'),
    tvRoutes = require('./routes/tvs'),
    userRoutes = require('./routes/users');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.options('*', cors());

app.get('/', (req, res) => {
    res.send('Hello from the root route');
});

app.use('/api/tvs', tvRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () => console.info('CORS-enabled web server listening on port ' + port));
