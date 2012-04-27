function Controller(dic) {
    var self = {};

    /**
     * Opens a task creation window in the current tab
     */
    self.openCreateWindow = function(tasklist_id) {
        // create a blank new record
        var model = dic.joli.models.get('tasklist');
        var tasklist = model.newRecord();

        // create a window and pass the new record to this window
        var CreateWindow = require('modules/tasklist/EditionWindow');
        var win = new CreateWindow(dic, tasklist);
        dic.application.activeTab.open(win);
    };

    /**
     * Open a task edition window in the current tab
     */
    self.openEditWindow = function(tasklist_id) {
        var model = dic.joli.models.get('tasklist');
        var tasklist = model.findOneById(tasklist_id);

        if (!tasklist) {
            return;
        }

        var EditionWindow = require('modules/tasklist/EditionWindow');
        var win = new EditionWindow(dic, tasklist);
        dic.application.activeTab.open(win);
    }

    /**
     * Saves a new tasklist
     */
    self.saveTasklist = function(tasklist, values) {
        // saves the tasklist
        tasklist.set('name', values.name);
        tasklist.save();

        Titanium.App.fireEvent('joli.tasklist.saved', {
            tasklist: tasklist
        });
    };

    /**
     * Update the of the tasklist tableview
     */
    self.update = function(tableview) {
        // 1- select the tasklists to display
        var model = dic.joli.models.get('tasklist');
        var tasklists = model.all();

        // 2- create the Ti.UI.tableViewRow objects
        var rows = [];
        var Row = require('modules/tasklist/Row');

        dic.joli.each(tasklists, function(tasklist, key) {
            rows.push(new Row(dic, tasklist));
        });

        // add it to the tableview
        tableview.setData(rows);
    };

    return self;
}

module.exports = Controller;
