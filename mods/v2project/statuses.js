function clampIntRange(num, min, max) {
	num = Math.floor(num);
	if (num < min) num = min;
	if (typeof max !== 'undefined' && num > max) num = max;
	return num;
}
exports.BattleStatuses = {
	typhoon: {
		effectType: 'Weather',
		duration: 5,
		durationCallback: function(source, effect) {
			if (source && source.item === 'razorfeather') {
				return 8;
			}
			return 5;
		},
		onBasePower: function(basePower, attacker, defender, move) {
			if (move.type === 'Flying') {
				this.debug('Typhoon Flying Boost');
				return basePower * 1.5;
			}
			if (move.type === 'Electric') {
				this.debug('Typhoon Electric Suppress');
				return basePower * .5;
			}
		},
		onStart: function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'Typhoon', '[from] ability: '+effect, '[of] '+source);
			} else {
				this.add('-weather', 'Typhoon');
			}
		},
		onResidualOrder: 1,
		onResidual: function() {
			this.add('-weather', 'Typhoon', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd: function() {
			this.add('-weather', 'none');
		}
	},
    	clearance: {
  		effectType: 'Weather',
			duration: 5,
			durationCallback: function(source, effect) {
			if (source && source.item === 'clearancefan') {
				return 8;
			}
			return 5;
		},
		onBasePower: function(basePower, attacker, defender, move) {
			if (move.type === 'Flying') {
				this.debug('Clearance Neutralize');
				return basePower * 1;
			}
			if (move.type === 'Electric') {
				this.debug('Clearance Neutralize');
				return basePower * 1;
			}
		},
		onStart: function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'none', '[from] ability: '+effect, '[of] '+source);
			} else {
				this.add('-weather', 'none');
			}
		},
		onResidualOrder: 1,
		onResidual: function() {
			this.add('-weather', 'none', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd: function() {
			this.add('-weather', 'none');
		}
	}
};
