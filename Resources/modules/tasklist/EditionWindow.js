function EditionWindow(dic, tasklist) {
    // load and instantiate the controller
    var Controller = require('modules/tasklist/Controller');
    var controller = new Controller(dic);

    var self = Ti.UI.createWindow({
        layout: 'vertical'
    });

    var titleField = Ti.UI.createTextField({
        hintText : 'name of the tasklist',
        height: 35,
        top: 10,
        left: 10,
        right: 10,
        value: tasklist.name,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
    });
    self.add(titleField);

    // add a button for saving the tasklist
    var button = Titanium.UI.createButton({
        title : 'save'
    });
    button.addEventListener('click', function(e) {
        // use the event listener to open the "new" window
        controller.saveTasklist(tasklist, {
            name: titleField.value
        });
        self.close();
    });

    if (Titanium.Platform.osname != 'android') {
        self.setRightNavButton(button);
    } else {
        button.top = 20;
        button.right = 10;
        self.add(button);
    }

    return self;
}

module.exports = EditionWindow;