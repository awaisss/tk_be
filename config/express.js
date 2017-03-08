var express         =   require('express');
var glob            =   require('glob');
var favicon         =   require('serve-favicon');
var logger          =   require('morgan');
var cookieParser    =   require('cookie-parser');
var bodyParser      =   require('body-parser');
var compress        =   require('compression');
var methodOverride  =   require('method-override');
var routes          =   require('./../app/routes/index');

module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';
  
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  app.use('/',routes);

  /* Error Handling Middleware */
  app.use(function(err,req,res,next){
    if(err){
      console.log(err)
      return res.status(500).send('API end point ' + req.originalUrl + ' failed to execute or something went wrong...');
    }
    next();
  });

  app.use(function (req, res, next) {
    var err = new Error('API Url not found on server.');
    err.status = 404;
    next(err);
  });
  
  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error occured', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });

  return app;
};
