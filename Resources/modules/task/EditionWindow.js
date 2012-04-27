function EditionWindow(dic, task) {
    // load and instantiate the controller
    var Controller = require('modules/task/Controller');
    var controller = new Controller(dic);

    var self = Ti.UI.createWindow({
        layout: 'vertical'
    });

    var titleField = Ti.UI.createTextField({
        hintText : 'title of the task',
        height: 35,
        top: 10,
        left: 10,
        right: 10,
        value: task.name,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
    });
    self.add(titleField);

    var descriptionField = Ti.UI.createTextArea({
        hintText : 'description of the task',
        height: 100,
        top: 10,
        left: 10,
        right: 10,
        borderWidth: 2,
        borderColor: '#bbb',
        borderRadius: 5,
        value: task.description,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
    });
    self.add(descriptionField);

    // add a picker
    var tasklistField = Ti.UI.createPicker({
        top: 10,
        left: 10,
        right: 10,
        selectionIndicator: true
    });
    self.add(tasklistField);

    // update the picker choices
    controller.updatePickerChoices(tasklistField, task.tasklist_id);

    // create a reference to the picker
    self.picker = tasklistField;

    // add a button for saving the task
    var button = Titanium.UI.createButton({
        title : 'sauver'
    });
    button.addEventListener('click', function(e) {
        // use the event listener to open the "new" window
        controller.saveTask(task, {
            name:        titleField.value,
            description: descriptionField.value,
            tasklist_id: tasklistField.getSelectedRow(0).id
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