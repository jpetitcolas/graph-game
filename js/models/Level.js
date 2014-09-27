var Level = Backbone.Model.extend({
    number: 1,
    nodes: null,

    initialize: function() {
        this.set("nodes", new NodeCollection());
        this.get("nodes").bind("change", function(model) {
            this.trigger("change", { model: model });
        }, this);
    },

    load: function(dotSchema) {
        var nodes = [];
        var parsedSchema = vis.network.dotparser.parseDOT(dotSchema);
        parsedSchema.nodes.forEach(function(visNode) {
            nodes.push(new Node(visNode));
        });

        // Consider first node as main.
        nodes[0].set("main", true);

        this.get("nodes").add(nodes);

        var me = this;
        parsedSchema.edges.forEach(function(edge) {
            var fromNode = me.get("nodes").where({ id: edge.from })[0];
            var nextNode = me.get("nodes").where({ id: edge.to })[0];

            fromNode.addChild(nextNode);
        });

        return this;
    }
});
