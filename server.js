const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const session = require('express-session');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
   secret: 'keyboard cat',
   cookie: { maxAge: 86400000 }
}));

const models = require('./models');

//Sync db
models.sequelize.sync().then(function () {
    console.log('Database connected')
}).catch(function (err) {
    console.log(err, "Something went wrong with the db connection")
});

require('./routes/userRoute')(app);
require('./routes/bookRoute')(app);

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
console.log('API rodando na porta: ', port);

//Models

module.exports = app;