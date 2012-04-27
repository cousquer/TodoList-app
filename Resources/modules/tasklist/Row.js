function Row(dic, tasklist) {
    var self = Ti.UI.createTableViewRow({
        height: 48,
        id: tasklist.id
    });

    var label = Ti.UI.createLabel({
       text: tasklist.name
    });
    self.add(label);

    return self;
}

module.exports = Row;