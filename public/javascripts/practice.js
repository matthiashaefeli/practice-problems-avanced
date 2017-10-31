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

function changeMoney(cidHash, change, resultHash) {
	if (change >= 100 && cidHash['ONE HUNDRED'] > 0) {
		change -= 100;
		cidHash['ONE HUNDRED'] -= 100;
		resultHash['ONE HUNDRED'] += 100;
		changeMoney(cidHash, change, resultHash);
	} else if (change >= 20 && cidHash['TWENTY'] > 0) {
		change -= 20;
		cidHash['TWENTY'] -= 20;
		resultHash['TWENTY'] += 20;
		changeMoney(cidHash, change, resultHash);
	} else if (change >= 10 && cidHash['TEN'] > 0) {
		change -= 10;
		cidHash['TEN'] -= 10;
		resultHash['TEN'] += 10;
		changeMoney(cidHash, change, resultHash);
	} else if (change >= 5 && cidHash['FIVE'] > 0) {
		change -= 5;
		cidHash['FIVE'] -= 5;
		resultHash['FIVE'] += 5;
		changeMoney(cidHash, change, resultHash);
	} else if (change >= 1 && cidHash['ONE'] > 0) {
		change -= 1;
		cidHash['ONE'] -= 1;
		resultHash['ONE'] += 1;
		changeMoney(cidHash, change, resultHash);
	} else if (change >= 0.25 && cidHash['QUARTER'] > 0) {
		change -= 0.25;
		cidHash['QUARTER'] -= 0.25;
		resultHash['QUARTER'] += 0.25;
		changeMoney(cidHash, change, resultHash);
	} else if (change >= 0.1 && cidHash['DIME'] > 0) {
		change -= 0.1;
		cidHash['DIME'] -= 0.1;
		resultHash['DIME'] += 0.1;
		changeMoney(cidHash, change, resultHash);
	} else if (change >= 0.05 && cidHash['NICKEL'] > 0) {
		change -= 0.05;
		cidHash['NICKEL'] -= 0.05;
		resultHash['NICKEL'] += 0.05;
		changeMoney(cidHash, change, resultHash);
	} else if (change >= 0.01 && cidHash['PENNY'] > 0) {
		change -= 0.01;
		cidHash['PENNY'] -= 0.01;
		resultHash['PENNY'] += 0.01;
		changeMoney(cidHash, change, resultHash);
	}
	return resultHash;
}

function total(object) {
	var valuesHash = Object.values(object);
	var total = 0;
	for (var index = 0; index < valuesHash.length; index++) {
		total += valuesHash[index] * 100;
	}
	return total / 100;
}

function buildObject(array) {
	var cidHash = {};
	for (var i = 0; i < array.length; i++) {
		cidHash[array[i][0]] = array[i][1];
	}
	return cidHash;
}

function checkCashRegister(price, cash, cid) {
	var resultHash = {};
	resultHash['PENNY'] = 0;
	resultHash['NICKEL'] = 0;
	resultHash['DIME'] = 0;
	resultHash['QUARTER'] = 0;
	resultHash['ONE'] = 0;
	resultHash['FIVE'] = 0;
	resultHash['TEN'] = 0;
	resultHash['TWENTY'] = 0;
	resultHash['ONE HUNDRED'] = 0;

	var change = cash - price;
	var cidHash = buildObject(cid);
	if (total(cidHash) < change) {
		return 'Insufficient Funds';
	} else if (total(cidHash) === change) {
		return 'Closed';
	} else {
		var hash = changeMoney(cidHash, change, resultHash);
		if (total(hash) < change) {
			return 'Insufficient Funds';
		}
		var resArray = [];
		for (var key in hash) {
			if (hash[key] > 0) {
				resArray.push([key, hash[key]]);
			}
		}
		return resArray.reverse();
	}
}
// end of file
