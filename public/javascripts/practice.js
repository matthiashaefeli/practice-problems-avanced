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

function concatArray(arrayOne, arrayTwo) {
	var finalArray = arrayOne.concat(arrayTwo);
	return finalArray;
}

function countValue(array, value) {
	var count = 0;
	for (var i = 0; i < array.length; i++) {
		if (array[i] == value) {
			count++;
		}
	}
	if (count > 1) {
		return true;
	} else {
		return false;
	}
}

function sortNumber(a, b) {
	return a - b;
}

function buildResult(array) {
	var result = [];
	for (var check = 0; check < array.length; check++) {
		if (countValue(array, array[check]) === false) {
			result.push(array[check]);
		}
	}
	return result.sort(sortNumber);
}

function sym() {
	var arrayArrays = [];
	var newArray = [];
	for (var index = 0; index < arguments.length; index++) {
		arrayArrays.push([...new Set(arguments[index])]);
	}

	for (var i = 0; i < arrayArrays.length; i++) {
		newArray = buildResult(concatArray(newArray, arrayArrays[i]));
	}
	return newArray;
}

function checkCashRegister(price, cash, cid) {
	var dif = cash - price;
	var cidHash = {};
	for (var i = 0; i < cid.length; i++) {
		cidHash[cid[i][0]] = cid[i][1];
	}
	var valuesHash = Object.values(cidHash);
	var total = 0;
	for (var index = 0; index < valuesHash.length; index++) {
		total += valuesHash[index] * 100;
	}
	if (total / 100 < dif) {
		return 'Insufficient Funds';
	} else if (total / 100 === dif) {
		return 'Closed';
	}
}
// end of file
