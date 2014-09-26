var LevelCollection = Backbone.Collection.extend({
    model: Level,

    initialize: function() {
        var collection = NodeCollection.createByLength(3);
        collection.linkNodes([
            { from: 1, to: 2 },
            { from: 1, to: 3 }
        ]);

        this.add(new Level({
            number: 1,
            nodes: collection
        }))
    }
});