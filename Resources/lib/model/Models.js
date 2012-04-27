function Models(dic) {
  var m = {};
  var joli = dic.joli;

  m.task = new joli.model({
    table:    'task',
    columns:  {
      id:                 'INTEGER PRIMARY KEY AUTOINCREMENT',
      name:               'TEXT',
      description:        'TEXT',
      due_date:           'TEXT',
      is_completed:       'BOOLEAN',
      tasklist_id:        'INTEGER'
    }
  });

  m.tasklist = new joli.model({
    table:    'tasklist',
    columns:  {
      id:                 'INTEGER PRIMARY KEY AUTOINCREMENT',
      name:               'TEXT'
    },
    objectMethods: {
        /**
         * Get all the tasks associated to this tasklist
         */
        getTasks: function() {
            return m.task.all({
                where: {'tasklist_id = ?': this.id}
            });
        }
    }
  });

  return m;
}

module.exports = Models;