var levels = [
    { nodes: "{ 1 -> 2 ; 1 -> 3 }", maximumSwitchedOnNodes: 0 },
    { nodes: "{ 1 -> 2 ; 1 -> 3 ; 2 -> 4 ; 2 -> 6 ; 2 -> 8 ; 3 -> 5 ; 3 -> 7 }", maximumSwitchedOnNodes: 4 },
    { nodes: "{ 1 -> 2 ; 2 -> 3 ; 2 -> 5 ; 1 -> 4 ; 4 -> 5 ; 4 -> 6 ; 4 -> 8 ; 1 -> 7 ; 7 -> 8 ; 7 -> 9 ; 1 -> 10 ; 10 -> 11 ; 11 -> 12 }", maximumSwitchedOnNodes: 5 },
    { nodes: "{ 1 -> 2 ; 2 -> 3 ; 1 -> 4 ; 2 -> 4 ; 1 -> 5 ; 5 -> 6 ; 5 -> 7 ; 7 -> 4 }", maximumSwitchedOnNodes: 4 },
    { nodes: "{ 1 -> 2 ; 2 -> 3 ; 3 -> 4 ; 3 -> 5 ; 3 -> 6 ; 2 -> 7 ; 7 -> 8 ; 7 -> 9 ; 1 -> 10 ; " +
             "  10 -> 11 ; 11 -> 13 ; 13 -> 16 ; 13 -> 17 ; 11 -> 14 ; 14 -> 18 ; 14 -> 19 ; 11 -> 15 ; " +
             "  15 -> 20 ; 15 -> 21 }", maximumSwitchedOnNodes: 5 },
    { nodes: "{ 1 -> 2 ; 1 -> 3 ; 1 -> 4 ; 3 -> 10 ; 2 -> 5 ; 2 -> 6 ; 2 -> 7 ; 4 -> 5 ; 4 -> 6 ; 4 -> 7 ; 4 -> 8 ; 6 -> 8 ; 6 -> 9 ; 7 -> 9 }", maximumSwitchedOnNodes: 5},
    { nodes: "{ 1 -> 2 ; 2 -> 4 ; 1 -> 3 ; 3 -> 5 ; 3 -> 6 ; 5 -> 7 ; 5 -> 8 ; 9 -> 8 ; 6 -> 9 }", maximumSwitchedOnNodes: 3},
    { nodes: "{ 1 -> 2 ; 1 -> 5 ; 1 -> 3 ; 2 -> 4 ; 2 -> 5 ; 3 -> 6 ; 3 -> 9 ; 3 -> 12 ; 5 -> 4 ; 5 -> 6 ; 4 -> 7 ; 7 -> 10 ; " +
             " 10 -> 13 ; 10 -> 14 ; 13 -> 16 ; 14 -> 16 ; 16 -> 19 ; 14 -> 17 ; 17 -> 19 ; 6 -> 8 ; 8 -> 11 ; 11 -> 15 ;" +
             " 15 -> 17 ; 15 -> 18 ; 11 -> 12 ; 12 -> 18 ; 9 -> 12 }", maximumSwitchedOnNodes: 5}
];

var container = document.getElementById('canvas');

var currentLevel = 7;

function startLevel() {
    var level = new Level({ number: currentLevel + 1 }).load(levels[currentLevel]);
    var levelView = new LevelView({
        el: container,
        model: level
    });
    levelView.render();

    level.on("finished", function() {
        currentLevel++;
        startLevel();
    });
}

startLevel();
