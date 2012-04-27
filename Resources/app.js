// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#fff');

// fix some parameters
Ti.include('lib/parameters.js');

// load the dependancies (dic = dependancies injection container)
var dic = {};
dic.joli = require('lib/vendor/joli.js/joli').connect(Titanium.App.Properties.getString('database.name'));
var Models = require('lib/model/Models');
var models = new Models(dic);

// initialization
dic.joli.models.initialize();

// populate database with fixtures data (remove in production)
// var Fixtures = require('lib/model/Fixtures');
// var fixtures = new Fixtures(dic);
// fixtures.load();

// launch the application
var Application = require('modules/ui/TabGroup');
dic.application = new Application(dic);
dic.application.open();