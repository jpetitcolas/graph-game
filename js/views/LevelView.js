var LevelView = Backbone.View.extend({
    network: null,

    infoView: null,

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
                    from: child.get("id"),
                    to: node.get("id"),
                    width: 1,
                    hoverWidth: 1,
                    widthSelectionMultiplier: 1,
                    color: "gray",
                    style: "arrow-center"
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

        this.infoView = new InfoView({
            model: this.model,
            el: $("#infos")
        }).render();
    },

    onClick: function(e) {
        if (!e.nodes.length) {
            return;
        }

        var clickedId = parseInt(e.nodes[0]);
        var clickedNode = this.model.get("nodes").where({ id: clickedId })[0];

        if (clickedNode.get("switchedOn")) {
            if (clickedNode.isSwitchableOff()) {
                clickedNode.switchOff();
            }
        } else {
            if (clickedNode.isSwitchableOn() && this.model.canSwitchOnNewNode()) {
                clickedNode.switchOn();
            }
        }
    },

    onNodeChange: function(changedNode) {
        this.network.nodesData.update(this.toVisNode(changedNode.model));
    },

    toVisNode: function(node) {
        var borderColor = '#555';
        if (node.get('main')) {
            borderColor = 'orange';
        } else if (node.get('unswitchableOff')) {
            borderColor = 'blue';
        }

        return {
            id: node.get("id"),
            color: {
                background: node.get("switchedOn") ? "yellow": "silver",
                border: borderColor
            },
            borderWidth: 3,
            borderWidthSelected: 3,
            label: ""
        };
    }
});
