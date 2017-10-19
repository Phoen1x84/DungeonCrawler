// level up
var levelUp = stats => {
    if (stats) {
      return (
        /*
          a class // race modifier could be added to this leveling system
          to give a different leveling buff / debuff
        */
        stats.strength += Math.round(stats.level / 0.5),
        stats.maxHealth += Math.round(stats.level / 0.5),
        stats.level += 1
      );
    }
  };

  module.exports = levelUp;