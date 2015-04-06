'use strict';

//dependencies
var path = require('path');
var _ = require('lodash');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var requireAll = require('require-all');
var ejsEngine = require('ejs-mate');
var methodOverride = require('method-override');

//setup mongoose
var mongoose = require(path.join(__dirname, '..', 'mongoose'));

// load all models recursively
require('require-all')({
    dirname: __dirname + '/models',
    filter: /(.+_model)\.js$/,
    excludeDirs: /^\.(git|svn|md)$/
});

//create an express application
var app = express();

// view engine setup
// use ejs-mate for all ejs templates:
app.engine('html', ejsEngine);
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

//request logger
app.use(logger('dev'));

//parsing body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(methodOverride('_method'));

//setup public directory
app.use(express.static(path.join(__dirname, '..', 'public')));

//setup mongoose pagination middleware
app.use(require('express-paginate').middleware(10, 50));

//load application locals
require('require-all')({
    dirname: __dirname + '/locals',
    filter: /(.+_locals)\.js$/,
    excludeDirs: /^\.(git|svn|md)$/,
    resolve: function(local) {
        if (_.isPlainObject(local)) {
            _.keys(local)
                .forEach(function(localKey) {
                    app.locals[localKey] = local[helperKey];
                });
        }
    }
});

// load all routers recursively
require('require-all')({
    dirname: __dirname + '/routers',
    filter: /(.+_router)\.js$/,
    excludeDirs: /^\.(git|svn|md)$/,
    resolve: function(router) {
        app.use(router);
    }
});

// catch 404 and forward to error handler
app.use(function(request, response, next) {
    var error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(error, request, response, next) {
        response.status(error.status || 500);
        response.render('errors', {
            title: 'Error',
            message: error.message,
            error: error
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(error, request, response, next) {
    response.status(error.status || 500);
    response.render('errors', {
        title: 'Error',
        message: error.message,
        error: {}
    });
});

//export express application
module.exports = app;