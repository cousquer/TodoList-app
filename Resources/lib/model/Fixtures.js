function Fixtures(dic) {
  var m = {};
  var joli = dic.joli;

  m.load = function() {
      // create a table with all the task lists that we want to create
      var data = [
          { name: 'Professionnel'},
          { name: 'Maison'},
          { name: 'Divertissement'},
      ];

      // get the tasklists model object
      var model = joli.models.get('tasklist');

      // empty the table when launching the app
      model.truncate();

      // foreach of these data to insert,
      joli.each(data, function(tasklist, key) {
          // instanciate a new Record object
          var tasklistObject = model.newRecord(tasklist);

          // persist this object in the database
          tasklistObject.save();
      });
  };

  return m;
}

module.exports = Fixtures;