function List(dic, tasklist) {
    // load and instantiate the controller
    var Controller = require('modules/task/Controller');
    var controller = new Controller(dic);

    // create the component
    var self = Ti.UI.createTableViewRow({
        height: 100,
        left: 10,
        right: 10,
        borderWidth: 1,
        borderColor: '#000'
    });

    // add a label for the name of the task list
    var label = Ti.UI.createLabel({
        top: 0,
        left: 0,
        height: 30,
        text: tasklist.name
    });
    self.add(label);

    // add a button for adding new tasks
    var button = Ti.UI.createButton({
        top: 0,
        right: 0,
        height: 30,
        title: 'add',
        width: 100
    });
    self.add(button);

    button.addEventListener('click', function(e) {
        // use the event listener to open the "new" window
        controller.openCreateWindow(tasklist.id);
    });

    // add a tableView
    var tableview = Ti.UI.createTableView({
        top: 50,
        bottom: 0,
        left: 0,
        right: 0,
        scrollable: false
    });
    tableview.parent = self;
    self.add(tableview);

    tableview.addEventListener('click', function(e) {
        controller.openEditWindow(e.row.id);
    });

    // use the controller to load the data in the view
    controller.updateList(tableview, tasklist);

    Ti.App.addEventListener('joli.task.saved', function(e) {
        if (tasklist.id === e.tasklist_id || tasklist.id === e.old_tasklist_id) {
            controller.updateList(tableview, tasklist);
        }
    });

    return self;
}

module.exports = List;