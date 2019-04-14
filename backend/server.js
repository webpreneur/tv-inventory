require('dotenv').config();

const
    port            = process.env.PORT || 8080,

    express         = require('express'),
    bodyParser      = require('body-parser'),
    session         = require('express-session'),
    MongoDBStore    = require('connect-mongodb-session')(session),

    { DB_URI }      = require('./models'),

    tvRoutes        = require('./routes/tvs'),
    userRoutes      = require('./routes/users'),
    authRoutes      = require('./routes/auth');

const app = express();
const store = new MongoDBStore({
    uri: DB_URI,
    collection: 'sessions',
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(session({
    store,
    secret: '$D_Jq*+zGufkpbYh&vc2A_ejh_&T3#w_*2acTJLgBx@kPGLLP2',
    resave: false,
    saveUninitialized: false,
}));

app.get('/', (req, res) => {
    res.send('Hello from the root route');
});

app.use('/api/tvs', tvRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// 404
app.use((req, res, next) => {
    res.status(404).send(
        JSON.stringify({
            errorMessage: 'The requested route does not exist on the server!'
        })
    )
});

app.listen(port, () => console.info('CORS-enabled web server listening on port ' + port));
