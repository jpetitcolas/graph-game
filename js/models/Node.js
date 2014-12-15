var Node = Backbone.Model.extend({
    defaults: {
        main: false,
        switchedOn: false,
        parents: null,
        children: null,
        alreadySwitchedOn: false
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
        if (this.get("alreadySwitchedOn")) {
            return false;
        }

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
        this.set("alreadySwitchedOn", true);
    },

    switchOff: function() {
        this.set("switchedOn", false);
    }
});
