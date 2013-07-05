exports.BattleFormats = {
  pokemon: {
		effectType: 'Banlist',
      validateSet: function(set, format) {
  		var item = this.getItem(set.item);
			var template = this.getTemplate(set.species);
			var problems = [];

			if (set.species === set.name) delete set.name;
			if (template.gen > this.gen) {
				problems.push(set.species+' does not exist in gen '+this.gen+'.');
			} else if (template.isNonstandard) {
				problems.push(set.species+' is not a real Pokemon.');
			}
			if (set.ability) {
				var ability = this.getAbility(set.ability);
				if (ability.gen > this.gen) {
					problems.push(ability.name+' does not exist in gen '+this.gen+'.');
				} else if (ability.isNonstandard) {
					problems.push(ability.name+' is not a real ability.');
				}
			}
			if (set.moves) for (var i=0; i<set.moves.length; i++) {
				var move = this.getMove(set.moves[i]);
				if (move.gen > this.gen) {
					problems.push(move.name+' does not exist in gen '+this.gen+'.');
				} else if (move.isNonstandard) {
					problems.push(move.name+' is not a real move.');
				}
			}
      if (set.moves && set.moves.length > 4) {
  			problems.push((set.name||set.species) + ' has more than four moves.');
			}
			if (set.level && set.level > 100) {
				problems.push((set.name||set.species) + ' is higher than level 100.');
			}
      // ----------- legality line ------------------------------------------
  		if (!format.banlistTable || !format.banlistTable['illegal']) return problems;
			// everything after this line only happens if we're doing legality enforcement

			// limit one of each move
			var moves = [];
			if (set.moves) {
				var hasMove = {};
				for (var i=0; i<set.moves.length; i++) {
					var move = this.getMove(set.moves[i]);
					var moveid = move.id;
					if (hasMove[moveid]) continue;
					hasMove[moveid] = true;
					moves.push(set.moves[i]);
				}
			}
			set.moves = moves;

			if (template.num == 351) { // Castform
				set.species = 'Castform';
			}
			if (template.num == 421) { // Cherrim
				set.species = 'Cherrim';
			}
			if (template.num == 493) { // Arceus
				if (set.ability === 'Multitype' && item.onPlate) {
					set.species = 'Arceus-'+item.onPlate;
				} else {
					set.species = 'Arceus';
				}
			}
			if (template.num == 555) { // Darmanitan
				set.species = 'Darmanitan';
			}
			if (template.num == 487) { // Giratina
				if (item.id === 'griseousorb') {
					set.species = 'Giratina-Origin';
					set.ability = 'Levitate';
				} else {
					set.species = 'Giratina';
					set.ability = 'Pressure';
				}
			}
			if (template.num == 647) { // Keldeo
				if (set.species === 'Keldeo-Resolution' && set.moves.indexOf('Secret Sword') < 0) {
					set.species = 'Keldeo';
				}
			}
			if (template.num == 648) { // Meloetta
				set.species = 'Meloetta';
			}
      
			// Let's manually delete items.
			set.item = '';
			
			// Automatically set ability to None
			set.ability = 'None';
			
			return problems;
		}
	}
};
