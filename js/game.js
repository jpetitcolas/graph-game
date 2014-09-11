var levels = [
    "{1 -- 2 ; 1 -- 3}",
    "{1 -- 2 ; 1 -- 3 ; 2 -- 4 ; 2 -- 6 ; 2 -- 8 ; 3 -- 5 ; 3 -- 7 }",
    "{1 -- 2 ; 1 -- 3 ; 1 -- 4 ; 1 -- 5 ;  }",
];

// create a network
var container = document.getElementById('playfield');
var data = {
    dot: levels[1]
};
var options = {
    zoomable: false,
    nodes: {
        color: "#ccc"
    }
};

var network = new vis.Network(container, data, options);

network.on("click", function(e) {
    var clickedNode = e.nodes[0];
})