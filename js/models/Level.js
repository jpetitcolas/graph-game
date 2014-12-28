var Level = Backbone.Model.extend({
    defaults: {
        number: 1,
        nodes: null,
        maximumSwitchedOnNodes: 0
    },

    initialize: function() {
        this.set("nodes", new NodeCollection());

        this.get("nodes").bind("change", function(model) {
            this.trigger("change", { model: model });

            if (this.isFinished()) {
                this.trigger("finished");
            }
        }, this);
    },

    load: function(level) {
        var nodes = [];
        var parsedSchema = vis.network.dotparser.parseDOT(level.nodes);

        var unswitchableOffNodeIds = level.unswitchableOff || [];
        parsedSchema.nodes.forEach(function(visNode) {
            var node = new Node(visNode);
            if (unswitchableOffNodeIds.indexOf(visNode.id) != -1) {
                node.set('unswitchableOff', true);
            }
            nodes.push(node);
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

        this.set("maximumSwitchedOnNodes", level.maximumSwitchedOnNodes);

        return this;
    },

    isFinished: function() {
        return this.get("nodes").reduce(function(isFinished, node) {
            return isFinished && node.get("switchedOn");
        }, true);
    },

    canSwitchOnNewNode: function() {
        var maximumNodes = this.get("maximumSwitchedOnNodes");

        return maximumNodes == 0 || this.getNumberSwitchedOnNodes() < maximumNodes;
    },

    getNumberSwitchedOnNodes: function() {
        return this.get("nodes").filter(function(node) {
            return node.get("switchedOn");
        }).length;
    }
});
