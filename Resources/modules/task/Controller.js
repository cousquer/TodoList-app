function Controller(dic) {
    var self = {};

    /**
     * Opens a task creation window in the current tab
     */
    self.openCreateWindow = function(tasklist_id) {
        // create a blank new record and set its tasklist_id
        var model = dic.joli.models.get('task');
        var task = model.newRecord();
        task.set('tasklist_id', tasklist_id);

        // create a window and pass the new record to this window
        var CreateWindow = require('modules/task/EditionWindow');
        var win = new CreateWindow(dic, task);
        dic.application.activeTab.open(win);

        // pre-select the right tasklist row in the picker
        var picker = win.picker;
        picker.setSelectedRow(0, picker.mustSelectRowId, true);
    };

    /**
     * Open a task edition window in the current tab
     */
    self.openEditWindow = function(task_id) {
        var model = dic.joli.models.get('task');
        var task = model.findOneById(task_id);

        if (!task) {
            return;
        }

        var EditionWindow = require('modules/task/EditionWindow');
        var win = new EditionWindow(dic, task);
        dic.application.activeTab.open(win);

        // pre-select the right tasklist row in the picker
        var picker = win.picker;
        picker.setSelectedRow(0, picker.mustSelectRowId, true);
    }

    /**
     * Saves a new task
     */
    self.saveTask = function(task, values) {
        // get the old tasklist_id
        var old_tasklist_id = task.tasklist_id;

        // saves the task
        task.set('name', values.name);
        task.set('description', values.description);
        task.set('tasklist_id', values.tasklist_id);
        task.save();

        Titanium.App.fireEvent('joli.task.saved', {
            tasklist_id: values.tasklist_id,
            old_tasklist_id: old_tasklist_id
        });
    };
    /**
     * Update the content of the taskslist window
     */
    self.update = function(view) {
        // 1- get the lists to display
        var model = dic.joli.models.get('tasklist');
        var tasklists = model.all();
        var tasklistBlockRows = [];

        // display a list block for each of these tasklists
        var List = require('modules/task/List');

        dic.joli.each(tasklists, function(tasklist, key) {
            tasklistBlockRows.push(new List(dic, tasklist));
        });

        view.setData(tasklistBlockRows);
    };
    /**
     * Update the content for a given task list tableview
     */
    self.updateList = function(tableview, tasklist) {
        // 1- select the tasks to display
        var tasks = tasklist.getTasks();

        // 2- create the Ti.UI.tableViewRow objects
        var rows = [];
        var Row = require('modules/task/Row');

        dic.joli.each(tasks, function(task, key) {
            rows.push(new Row(dic, task));
        });

        // add it to the tableview
        tableview.setData(rows);
        tableview.parent.height = 50 + rows.length * 50;
    };

    /**
     * Updates the choices of the picker + pre-selects a tasklist from its id
     *
     * @param picker a Ti.UI.Picker object
     * @param tasklist_id an id of tasklist to pre-select
     */
    self.updatePickerChoices = function(picker, tasklist_id) {
        var data = [];

        // 1- get the lists to display
        var model = dic.joli.models.get('tasklist');
        var tasklists = model.all();
        var rowId = 0;

        // 2- add them to the picker
        dic.joli.each(tasklists, function(tasklist, key) {
            data.push(Ti.UI.createPickerRow({
                title: tasklist.name,
                id: tasklist.id
            }));

            // the tasklist that we are adding to the picker is the one
            // which must be preselected
            if (tasklist_id == tasklist.id) {
                rowId = key;
            }
        });

        picker.add(data);
        picker.mustSelectRowId = rowId;
    }

    return self;
}

module.exports = Controller;
