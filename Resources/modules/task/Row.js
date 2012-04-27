function Row(dic, task) {
    var self = Ti.UI.createTableViewRow({
        height: 48,
        id: task.id
    });

    var label = Ti.UI.createLabel({
       text: task.name
    });
    self.add(label);

    return self;
}

module.exports = Row;