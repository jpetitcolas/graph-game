var levels = [
    "{1 -- 2 ; 1 -- 3}",
    "{1 -- 2 ; 1 -- 3 ; 2 -- 4 ; 2 -- 6 ; 2 -- 8 ; 3 -- 5 ; 3 -- 7 }",
    "{1 -- 2 ; 1 -- 3 ; 1 -- 4 ; 1 -- 5 ;  }",
];

var container = document.getElementById('playfield');

var currentLevel = 0;

function startLevel() {
    var level = new Level({ number: currentLevel }).load(levels[currentLevel]);
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
