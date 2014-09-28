var InfoView = Backbone.View.extend({
    model: null,

    initialize: function() {
        this.model.bind("change", this.render, this);
    },

    render: function() {
        this.$el.find("#numberLevel span").text(this.model.get("number"));
        this.updateSwitchedOnNodes();

        return this;
    },

    updateSwitchedOnNodes: function() {
        var switchedOnNodes = this.model.getNumberSwitchedOnNodes();

        var message = switchedOnNodes;
        var maximumSwitchedOnNodes = this.model.get("maximumSwitchedOnNodes");
        if (maximumSwitchedOnNodes > 0) {
            message += (" / " + maximumSwitchedOnNodes);
        }

        var switchedOnData = this.$el.find("#switchedOnNodes");
        switchedOnData[maximumSwitchedOnNodes && maximumSwitchedOnNodes == switchedOnNodes ? "addClass" : "removeClass"]("danger");
        this.$el.find("#switchedOnNodes span").text(message);
    }
});
