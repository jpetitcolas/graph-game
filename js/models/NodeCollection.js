var NodeCollection = Backbone.Collection.extend({
    model: Node,
    dataSet: null,

    initialize: function() {
        this.dataSet = new vis.DataSet();
    },

    add: function(model, options) {
        Backbone.Collection.prototype.add.call(this, model);

        this.dataSet.add({
            id: model.get("id"),
            main: model.get("main")
        });
    },

    linkNodes: function(links) {
        for (var i = 0, c = links.length ; i < c ; i++) {
            var fromNode = this.where({ id: links[i].from })[0];
            var toNode = this.where({ id: links[i].to })[0];

            if (!fromNode || !toNode) {
                console.error("Unable to link nodes: node not found.");

                return;
            }

            fromNode.addChild(toNode);
        }
    }
}, {
    createByLength: function(length) {
        var collection = new NodeCollection();
        for (var i = 0 ; i < length ; i++) {
            collection.add(new Node({ id: (i + 1) }));
        }

        return collection;
    }
});
