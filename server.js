var express         = require('express')
    , bodyParser    = require('body-parser')  
    , morgan        = require('morgan')
    , mongoClient   = require('mongodb').MongoClient
    , assert        = require('assert')
    , mongo         = require('./mongo/mongodb.js');

var app = express();
var BD = mongo();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, resp) {
    resp.sendFile(__dirname + '/index.html');
});

app.post('/getDocs', function(req, resp, data) {
    BD.readDocs()
    .then(function(response) {
        resp.send(response);
    }, function(err) {
        console.info(err);
        resp.send(err);
    });
});

app.post('/insertDoc', function (req, resp) {
    resp.send(BD.insertDoc( req.body )); 
});

app.listen(9191);