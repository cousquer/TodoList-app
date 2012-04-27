function ListWindow(dic) {
    var self = Ti.UI.createWindow();

    var view = Ti.UI.createTableView({
        editable: false,
        moveable: true,
        allowsSelection: false,
        borderWidth: 0,
        top: 0,
        bottom: 0,
        rowBackgroundColor: 'transparent'
    });
    self.add(view);

    // load and instantiate the controller
    var Controller = require('modules/task/Controller');
    var controller = new Controller(dic);

    // use the controller to load the data in the view
    controller.update(view);

    Ti.App.addEventListener('joli.tasklist.saved', function(e) {
        controller.update(view);
    });

    return self;
}

module.exports = ListWindow;