var LevelView = Backbone.View.extend({
    network: null,

    render: function() {
        var preparedNodes = [], preparedEdges = [];
        this.model.get("nodes").each(function(node) {
            preparedNodes.push(node.toJSON());
            node.get("children").each(function(child) {
                preparedEdges.push({
                    from: node.get("id"),
                    to: child.get("id")
                });
            });
        });

        this.network = new vis.Network(this.el, {
            nodes: preparedNodes,
            edges: preparedEdges
        }, {
            zoomable: false,
            nodes: {
                color: "#ccc"
            }
        });
    }
});
