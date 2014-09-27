var LevelView = Backbone.View.extend({
    network: null,

    initialize: function() {
        _.bindAll(this, 'onClick', 'onNodeChange');
        this.model.on("change", this.onNodeChange);
    },

    render: function() {
        var me = this;
        var preparedNodes = [], preparedEdges = [];
        this.model.get("nodes").each(function(node) {
            preparedNodes.push(me.toVisNode(node));
            node.get("children").each(function(child) {
                preparedEdges.push({
                    from: node.get("id"),
                    to: child.get("id"),
                    width: 1,
                    hoverWidth: 1,
                    widthSelectionMultiplier: 1,
                    color: "gray"
                });
            });
        });

        this.network = new vis.Network(this.el, {
            nodes: preparedNodes,
            edges: preparedEdges
        }, {
            zoomable: false,
            hover: true
        });

        this.network.on("click", this.onClick);

        this.network.on("hoverNode", function () {
            document.body.style.cursor = "pointer";
        });

        this.network.on("blurNode", function () {
            document.body.style.cursor = "default";
        });
    },

    onClick: function(e) {
        if (!e.nodes.length) {
            return;
        }

        var clickedId = parseInt(e.nodes[0]);
        var clickedNode = this.model.get("nodes").where({ id: clickedId })[0];

        if (clickedNode.isSwitchable()) {
            clickedNode.toggleSwitch();
        }
    },

    onNodeChange: function(changedNode) {
        this.network.nodesData.update(this.toVisNode(changedNode.model));
    },

    toVisNode: function(node) {
        return {
            id: node.get("id"),
            color: {
                background: node.get("switchedOn") ? "yellow": "silver",
                border: node.get("main") ? "orange" : "#555"
            },
            borderWidth: 3,
            borderWidthSelected: 3,
            label: ""
        };
    }
});
