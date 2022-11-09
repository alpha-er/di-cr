function get_hell(level) {
  if (level < 30) {
    return 'Hell I';
  } else if (level < 80) {
    return 'Hell II';
  } else if (level < 150) {
    return 'Hell III';
  } else if (level < 240) {
    return 'Hell IV';
  } else {
    return 'Hell V';
  }
}

function get_cr(level) {
  if (level > 240) {
    return '5025++';
  }

  const levelCrCheckpoints = new Map([
    [1, 520],
    [30, 1220],
    [80, 2120],
    [150, 3250],
    [240, 5025]
  ]);

  const levelCheckpoints = Array.from(levelCrCheckpoints.keys());

  var recommendedCrs = new Map();

  levelCheckpoints.forEach(lowerBoundLevel => {
    var index = levelCheckpoints.indexOf(lowerBoundLevel)
    if (index < (levelCheckpoints.length - 1)) {
      var upperBoundLevel = levelCheckpoints[index + 1];
      var levels = upperBoundLevel - lowerBoundLevel;
      var lowerBoundCr = levelCrCheckpoints.get(lowerBoundLevel);
      var upperBoundCr = levelCrCheckpoints.get(upperBoundLevel);
      var crRange = upperBoundCr - lowerBoundCr;
      var crPerLevel = crRange/levels;

      var levelRange = [...Array(levels).keys()].map(i => i + lowerBoundLevel);
      for (const level of levelRange) {
        var levelDiff = level - lowerBoundLevel;
        var levelCr = lowerBoundCr + Math.ceil(levelDiff * crPerLevel);
        recommendedCrs.set(level, levelCr);
      }
    } else {
      recommendedCrs.set(lowerBoundLevel, levelCrCheckpoints.get(lowerBoundLevel));
    }
  })

  return recommendedCrs.get(level);
}

function display() {
  var level = parseInt(document.paragon.level.value);
  document.getElementById('paragon_level').innerHTML = "<b>Paragon Level:</b> " + level;
  document.getElementById('hell').innerHTML = "<b>Hell Level:</b> " + get_hell(level);
  document.getElementById('cr').innerHTML = "<b>Combat Rating:</b> " + get_cr(level);
}
