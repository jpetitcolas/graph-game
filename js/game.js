var levels = [
    "{1 -- 2 ; 1 -- 3}",
    "{1 -- 2 ; 1 -- 3 ; 2 -- 4 ; 2 -- 6 ; 2 -- 8 ; 3 -- 5 ; 3 -- 7 }",
    "{1 -- 2 ; 1 -- 3 ; 1 -- 4 ; 1 -- 5 ;  }",
];

var container = document.getElementById('playfield');

var level = new Level({ number: 1 }).load("{1 -- 2 ; 1 -- 3}");
var levelView = new LevelView({
    el: container,
    model: level
});
levelView.render();
