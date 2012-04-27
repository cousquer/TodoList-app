function ListWindow(dic) {
    // load and instantiate the controller
    var Controller = require('modules/tasklist/Controller');
    var controller = new Controller(dic);

    var self = Ti.UI.createWindow();

    // add a button for adding new lists
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
        controller.openCreateWindow();
    });

    var tableview = Ti.UI.createTableView({
        top: 40,
        left: 0,
        right: 0,
        scrollable: false
    });
    self.add(tableview);

    tableview.addEventListener('click', function(e) {
        controller.openEditWindow(e.row.id);
    });

    // use the controller to load the data in the view
    controller.update(tableview);

    Ti.App.addEventListener('joli.tasklist.saved', function(e) {
        controller.update(tableview);
    });

    return self;
}

module.exports = ListWindow;