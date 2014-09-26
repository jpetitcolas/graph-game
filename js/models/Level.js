var Level = Backbone.Model.extend({
    number: 1,
    nodes: null,

    load: function(dotSchema) {
        var parsedSchema = vis.network.dotparser.parseDOT(dotSchema);

        var nodes = new NodeCollection();
        parsedSchema.nodes.forEach(function(visNode) {
            nodes.add(new Node(visNode));
        });
        this.set("nodes", nodes);

        var me = this;
        parsedSchema.edges.forEach(function(edge) {
            var fromNode = me.get("nodes").where({ id: edge.from })[0];
            var nextNode = me.get("nodes").where({ id: edge.to })[0];

            fromNode.addChild(nextNode);
        });

        return this;
    }
});
