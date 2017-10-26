// Setup
var collection = {
	'2548': {
		album: 'Slippery When Wet',
		artist: 'Bon Jovi',
		tracks: ['Let It Rock', 'You Give Love a Bad Name']
	},
	'2468': {
		album: '1999',
		artist: 'Prince',
		tracks: ['1999', 'Little Red Corvette']
	},
	'1245': {
		artist: 'Robert Palmer',
		tracks: []
	},
	'5439': {
		album: 'ABBA Gold'
	}
};

function updateRecords(id, prop, value) {
	if (prop === 'tracks') {
		if (value == '') {
			delete collection[id][prop];
			return collection[id];
		} else if (prop in collection[id]) {
			collection[id][prop].push(value);
			return collection[id];
		} else {
			collection[id][prop] = [];
			collection[id][prop].push(value);
			return collection[id];
		}
	} else if (prop in collection[id]) {
		if (value === '') {
			delete collection[id][prop];
			return collection[id];
		} else {
			collection[id][prop] = value;
			return collection[id];
		}
	} else {
		collection[id][prop] = value;
		return collection[id];
	}
}

