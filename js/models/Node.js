var Node = Backbone.Model.extend({
    defaults: {
        main: false,
        switchedOn: false,
        parents: null,
        children: null
    },

    initialize: function() {
        this.set("parents", new NodeCollection());
        this.set("children", new NodeCollection());
    },

    addChild: function(node) {
        this.get("children").add(node);
        node.get("parents").add(this);

        return this;
    },

    isSwitchableOn: function() {
        var children = this.get("children");
        for (i = 0, c = children.length ; i < c ; i++) {
            if (!children.at(i).get("switchedOn")) {
                return false;
            }
        }

        return true;
    },

    switchOn: function() {
        this.set("switchedOn", true);
    },

    switchOff: function() {
        this.set("switchedOn", false);
    }
});
