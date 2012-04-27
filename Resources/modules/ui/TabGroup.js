function TabGroup(dic) {
    var self = Ti.UI.createTabGroup();

    // add content to the TabGoup
    var TaskWindow = require('modules/task/ListWindow');
    var TasklistWindow = require('modules/tasklist/ListWindow');
    
    // create tab "Task" to add tasks to lists
    var tab1 = Titanium.UI.createTab({
        title: 'Tasks',
        window: new TaskWindow(dic)
    });
    self.addTab(tab1);

    // create tab "List" to add list of tasks
    var tab2 = Titanium.UI.createTab({
        title: 'Lists',
        window: new TasklistWindow(dic)
    });
    self.addTab(tab2);

    return self;
}

module.exports = TabGroup;