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
		test = Math.round(change * 100);
		test -= 10000;
		change = test / 100;
		cidHash['ONE HUNDRED'] -= 100;
		resultHash['ONE HUNDRED'] += 100;
		changeMoney(cidHash, change, resultHash);
	} else if (change >= 20 && cidHash['TWENTY'] > 0) {
		test = Math.round(change * 100);
		test -= 2000;
		change = test / 100;
		cidHash['TWENTY'] -= 20;
		resultHash['TWENTY'] += 20;
		changeMoney(cidHash, change, resultHash);
	} else if (change >= 10 && cidHash['TEN'] > 0) {
		test = Math.round(change * 100);
		test -= 1000;
		change = test / 100;
		cidHash['TEN'] -= 10;
		resultHash['TEN'] += 10;
		changeMoney(cidHash, change, resultHash);
	} else if (change >= 5 && cidHash['FIVE'] > 0) {
		test = Math.round(change * 100);
		test -= 500;
		change = test / 100;
		cidHash['FIVE'] -= 5;
		resultHash['FIVE'] += 5;
		changeMoney(cidHash, change, resultHash);
	} else if (change >= 1 && cidHash['ONE'] > 0) {
		test = Math.round(change * 100);
		test -= 100;
		change = test / 100;
		cidHash['ONE'] -= 1;
		resultHash['ONE'] += 1;
		changeMoney(cidHash, change, resultHash);
	} else if (change >= 0.25 && cidHash['QUARTER'] > 0) {
		test = Math.round(change * 100);
		test -= 25;
		change = test / 100;
		cidHash['QUARTER'] -= 0.25;
		resultHash['QUARTER'] += 0.25;
		changeMoney(cidHash, change, resultHash);
	} else if (change >= 0.1 && cidHash['DIME'] > 0) {
		test = Math.round(change * 100);
		test -= 10;
		change = test / 100;
		cidHash['DIME'] -= 0.1;
		resultHash['DIME'] += 0.1;
		changeMoney(cidHash, change, resultHash);
	} else if (change >= 0.05 && cidHash['NICKEL'] > 0) {
		test = Math.round(change * 100);
		test -= 5;
		change = test / 100;
		cidHash['NICKEL'] -= 0.05;
		resultHash['NICKEL'] += 0.05;
		changeMoney(cidHash, change, resultHash);
	} else if (change >= 0.01 && cidHash['PENNY'] > 0) {
		test = Math.round(change * 100);
		test -= 1;
		change = test / 100;
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

function arrayToObject(array) {
	var object = {};
	for (var i = 0; i < array.length; i++) {
		object[array[i][1]] = array[i][0];
	}
	return object;
}

function objectToArray(object) {
	var keyArray = [];
	var finalArray = [];
	for (var key in object) {
		keyArray.push(key);
	}
	for (var i = 0; i < keyArray.length; i++) {
		finalArray.push([object[keyArray.sort()[i]], keyArray.sort()[i]]);
	}
	return finalArray;
}

function updateInventory(arrayOne, arrayTwo) {
	var objectOne = arrayToObject(arrayOne);
	var objectTwo = arrayToObject(arrayTwo);
	for (var key in objectTwo) {
		if (objectOne.hasOwnProperty(key)) {
			objectOne[key] += objectTwo[key];
		} else {
			objectOne[key] = objectTwo[key];
		}
	}
	return objectToArray(objectOne);
}

var permArr = [],
	usedChars = [];

function perm(input) {
	var i, ch;
	for (i = 0; i < input.length; i++) {
		ch = input.splice(i, 1)[0];
		usedChars.push(ch);
		if (input.length == 0) {
			permArr.push(usedChars.slice());
		}
		permute(input);
		input.splice(i, 0, ch);
		usedChars.pop();
	}
	return permAlone;
}

var Person = function(firstandlast) {
	var fullName = firstandlast;

	this.getFullName = function() {
		return fullName;
	};

	this.getFirstName = function() {
		return fullName.split(' ')[0];
	};

	this.getLastName = function() {
		return fullName.split(' ')[1];
	};

	this.setFullName = function(newfullName) {
		fullName = newfullName;
	};

	this.setFirstName = function(first) {
		fullName = first + ' ' + fullName.split(' ')[1];
	};

	this.setLastName = function(last) {
		fullName = fullName.split(' ')[0] + ' ' + last;
	};
};

function orbitalPeriod(arr) {
	var GM = 398600.4418;
	var earthRadius = 6367.4447;
	var a = 2 * Math.PI;
	var newArr = [];
	var getOrbPeriod = function(obj) {
		var c = Math.pow(earthRadius + obj.avgAlt, 3);
		var b = Math.sqrt(c / GM);
		var orbPeriod = Math.round(a * b);
		delete obj.avgAlt;
		obj.orbitalPeriod = orbPeriod;
		return obj;
	};

	for (var elem in arr) {
		newArr.push(getOrbPeriod(arr[elem]));
	}

	return newArr;
}
// Code Explanation:

// GM and earthRadius are both given to us.
// To make the code easier to edit and read, each part of the equation is written separately.
// Create newArr to store the orbPeriod's.
// a is 2 times pi. The part that is a constant is on the global scope while the rest is part of a function.
// Create a function, gerOrbPeriod() that will do the required work for any amount of objects.
// c is (earthRadius + avgAlt) to the cube.
// b is the square root of c divided by GM.
// Create orbPeriod to store the product of a and b, with the Math.round()
// function applied to round up to the next whole number.
// Then we delete the key avgAlt, and add the new key and its value.

function pairwise(array, arg) {
	var result = 0;
	for (var i = 0; i < array.length; i++) {
		for (var index = i + 1; index < array.length; index++) {
			if (array[i] + array[index] === arg) {
				result += i + index;
				array[i] = NaN;
				array[index] = NaN;
			}
		}
	}
	return result;
}
// end of file
