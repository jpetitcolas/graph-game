var levels = [
    { nodes: "{ 1 -> 2 ; 1 -> 3 }", maximumSwitchedOnNodes: 0 },
    { nodes: "{ 1 -> 2 ; 1 -> 3 ; 2 -> 4 ; 2 -> 6 ; 2 -> 8 ; 3 -> 5 ; 3 -> 7 }", maximumSwitchedOnNodes: 4 },
    { nodes: "{ 1 -> 2 ; 2 -> 3 ; 2 -> 5 ; 1 -> 4 ; 4 -> 5 ; 4 -> 6 ; 4 -> 8 ; 1 -> 7 ; 7 -> 8 ; 7 -> 9 ; 1 -> 10 ; 10 -> 11 ; 11 -> 12 }", maximumSwitchedOnNodes: 5 }
];

var container = document.getElementById('canvas');

var currentLevel = 0;

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
