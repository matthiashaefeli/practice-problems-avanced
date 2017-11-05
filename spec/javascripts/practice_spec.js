// There are several rules for handling incomplete data:

// If prop is "tracks" but the album doesn't have a "tracks" property, create an empty array before adding the new value to the album's corresponding property.

// If prop is "tracks" and value isn't empty (""), push the value onto the end of the album's existing tracks array.

// If value is empty (""), delete the given prop property from the album.

describe('updateRecords', function() {
	it('takes an Id, prop and value to update database', function() {
		expect(updateRecords(5439, 'artist', 'ABBA')).toEqual({ album: 'ABBA Gold', artist: 'ABBA' });
	});

	it('takes an Id, prop and value to update database', function() {
		expect(updateRecords(5439, 'tracks', 'Take a Chance on Me')).toEqual({
			album: 'ABBA Gold',
			artist: 'ABBA',
			tracks: ['Take a Chance on Me']
		});
	});

	it('takes an Id, prop and value to update database', function() {
		expect(updateRecords(2548, 'artist', '')).toEqual({
			album: 'Slippery When Wet',
			tracks: ['Let It Rock', 'You Give Love a Bad Name']
		});
	});

	it('takes an Id, prop and value to update database', function() {
		expect(updateRecords(1245, 'tracks', 'Addicted to Love')).toEqual({
			artist: 'Robert Palmer',
			tracks: ['Addicted to Love']
		});
	});

	it('takes an Id, prop and value to update database', function() {
		expect(updateRecords(2468, 'tracks', 'Free')).toEqual({
			album: '1999',
			artist: 'Prince',
			tracks: ['1999', 'Little Red Corvette', 'Free']
		});
	});

	it('takes an Id, prop and value to update database', function() {
		expect(updateRecords(2548, 'tracks', '')).toEqual({ album: 'Slippery When Wet' });
	});
});

describe('sym', function() {
	it('takes two or more arrays and returns an array of the symmetric difference (△ or ⊕) of the provided arrays', function() {
		expect(sym([1, 2, 3], [5, 2, 1, 4])).toEqual([3, 4, 5]);
	});

	it('takes two or more arrays and returns an array of the symmetric difference (△ or ⊕) of the provided arrays', function() {
		expect(sym([1, 2, 5], [2, 3, 5], [3, 4, 5])).toEqual([1, 4, 5]);
	});

	it('takes two or more arrays and returns an array of the symmetric difference (△ or ⊕) of the provided arrays', function() {
		expect(sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5])).toEqual([1, 4, 5]);
	});

	it('takes two or more arrays and returns an array of the symmetric difference (△ or ⊕) of the provided arrays', function() {
		expect(sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3])).toEqual([2, 3, 4, 6, 7]);
	});

	it('takes two or more arrays and returns an array of the symmetric difference (△ or ⊕) of the provided arrays', function() {
		expect(sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1])).toEqual([
			1,
			2,
			4,
			5,
			6,
			7,
			8,
			9
		]);
	});
});

describe('checkCashRegister', function() {
	it('return change in coin and bills, sorted in highest to lowest order', function() {
		expect(
			checkCashRegister(19.5, 20.0, [
				['PENNY', 1.01],
				['NICKEL', 2.05],
				['DIME', 3.1],
				['QUARTER', 4.25],
				['ONE', 90.0],
				['FIVE', 55.0],
				['TEN', 20.0],
				['TWENTY', 60.0],
				['ONE HUNDRED', 100.0]
			])
		).toEqual([['QUARTER', 0.5]]);
	});
	it('return change in coin and bills, sorted in highest to lowest order', function() {
		expect(
			checkCashRegister(3.26, 100.0, [
				['PENNY', 1.01],
				['NICKEL', 2.05],
				['DIME', 3.1],
				['QUARTER', 4.25],
				['ONE', 90.0],
				['FIVE', 55.0],
				['TEN', 20.0],
				['TWENTY', 60.0],
				['ONE HUNDRED', 100.0]
			])
		).toEqual([
			['TWENTY', 60.0],
			['TEN', 20.0],
			['FIVE', 15.0],
			['ONE', 1.0],
			['QUARTER', 0.5],
			['DIME', 0.2],
			['PENNY', 0.04]
		]);
	});
	it('should return "Insufficient Funds"', function() {
		expect(
			checkCashRegister(19.5, 20.0, [
				['PENNY', 0.01],
				['NICKEL', 0],
				['DIME', 0],
				['QUARTER', 0],
				['ONE', 0],
				['FIVE', 0],
				['TEN', 0],
				['TWENTY', 0],
				['ONE HUNDRED', 0]
			])
		).toEqual('Insufficient Funds');
	});
	it('should return "Closed"', function() {
		expect(
			checkCashRegister(19.5, 20.0, [
				['PENNY', 0.5],
				['NICKEL', 0],
				['DIME', 0],
				['QUARTER', 0],
				['ONE', 0],
				['FIVE', 0],
				['TEN', 0],
				['TWENTY', 0],
				['ONE HUNDRED', 0]
			])
		).toEqual('Closed');
	});
	it('should return "Closed"', function() {
		expect(
			checkCashRegister(19.5, 20.0, [
				['PENNY', 0.01],
				['NICKEL', 0],
				['DIME', 0],
				['QUARTER', 0],
				['ONE', 1.0],
				['FIVE', 0],
				['TEN', 0],
				['TWENTY', 0],
				['ONE HUNDRED', 0]
			])
		).toEqual('Insufficient Funds');
	});
});

describe('updateInventory', function() {
	it('Compare and update the inventory stored in a 2D array against a second 2D array of a fresh delivery', function() {
		expect(
			updateInventory(
				[[21, 'Bowling Ball'], [2, 'Dirty Sock'], [1, 'Hair Pin'], [5, 'Microphone']],
				[[2, 'Hair Pin'], [3, 'Half-Eaten Apple'], [67, 'Bowling Ball'], [7, 'Toothpaste']]
			)
		).toEqual([
			[88, 'Bowling Ball'],
			[2, 'Dirty Sock'],
			[3, 'Hair Pin'],
			[3, 'Half-Eaten Apple'],
			[5, 'Microphone'],
			[7, 'Toothpaste']
		]);
	});
	it('Compare and update the inventory stored in a 2D array against a second 2D array of a fresh delivery', function() {
		expect(updateInventory([[21, 'Bowling Ball'], [2, 'Dirty Sock'], [1, 'Hair Pin'], [5, 'Microphone']], [])).toEqual([
			[21, 'Bowling Ball'],
			[2, 'Dirty Sock'],
			[1, 'Hair Pin'],
			[5, 'Microphone']
		]);
	});
	it('Compare and update the inventory stored in a 2D array against a second 2D array of a fresh delivery', function() {
		expect(
			updateInventory(
				[[0, 'Bowling Ball'], [0, 'Dirty Sock'], [0, 'Hair Pin'], [0, 'Microphone']],
				[[1, 'Hair Pin'], [1, 'Half-Eaten Apple'], [1, 'Bowling Ball'], [1, 'Toothpaste']]
			)
		).toEqual([
			[1, 'Bowling Ball'],
			[0, 'Dirty Sock'],
			[1, 'Hair Pin'],
			[1, 'Half-Eaten Apple'],
			[0, 'Microphone'],
			[1, 'Toothpaste']
		]);
	});
});

describe('permAlone', function() {
	it('Return the number of total permutations of the provided string that dont have repeated consecutive letters', function() {
		expect(permAlone('aab')).toEqual(2);
	});

	it('Return the number of total permutations of the provided string that dont have repeated consecutive letters', function() {
		expect(permAlone('aaa')).toEqual(0);
	});

	it('Return the number of total permutations of the provided string that dont have repeated consecutive letters', function() {
		expect(permAlone('aabb')).toEqual(8);
	});

	it('Return the number of total permutations of the provided string that dont have repeated consecutive letters', function() {
		expect(permAlone('abcdefa')).toEqual(3600);
	});

	it('Return the number of total permutations of the provided string that dont have repeated consecutive letters', function() {
		expect(permAlone('abfdefa')).toEqual(2640);
	});

	it('Return the number of total permutations of the provided string that dont have repeated consecutive letters', function() {
		expect(permAlone('zzzzzzzz')).toEqual(0);
	});

	it('Return the number of total permutations of the provided string that dont have repeated consecutive letters', function() {
		expect(permAlone('a')).toEqual(1);
	});

	it('Return the number of total permutations of the provided string that dont have repeated consecutive letters', function() {
		expect(permAlone('aaabb')).toEqual(12);
	});
});

describe('Person', function() {
	it('Fill in the object constructor with the following methods below:', function() {
		var bob = new Person('Bob Ross');
		expect(bob.getFirstName()).toEqual('Bob');
	});
	it('Fill in the object constructor with the following methods below:', function() {
		var rob = new Person('Rob Red');
		expect(rob.getLastName()).toEqual('Red');
	});
	it('Fill in the object constructor with the following methods below:', function() {
		var rob = new Person('Rob Red');
		expect(rob.getFullName()).toEqual('Rob Red');
	});
	it('Fill in the object constructor with the following methods below:', function() {
		var rob = new Person('Rob Red');
		rob.setFirstName('Bob');
		expect(rob.getFirstName()).toEqual('Bob');
	});
	it('Fill in the object constructor with the following methods below:', function() {
		var rob = new Person();
		rob.setFullName('Bob Rob');
		expect(rob.getFullName()).toEqual('Bob Rob');
	});
});
