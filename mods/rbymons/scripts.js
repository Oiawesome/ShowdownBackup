exports.BattleScripts = {
  getCategory: function(move) {
    move = this.getMove(move);
    // overwrite categories
    var specialTypes = {Fire:1, Water:1, Grass:1, Ice:1, Electric:1, Dark:1, Psychic:1, Dragon:1};
    if (move.category === 'Status') return 'Status';
    return specialTypes[move.type]?'Special':'Physical';
  }
};
