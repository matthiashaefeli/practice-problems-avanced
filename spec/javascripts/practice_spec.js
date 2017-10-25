// There are several rules for handling incomplete data:

// If prop is "tracks" but the album doesn't have a "tracks" property, create an empty array before adding the new value to the album's corresponding property.

// If prop is "tracks" and value isn't empty (""), push the value onto the end of the album's existing tracks array.

// If value is empty (""), delete the given prop property from the album.

describe('updateRecords', function() {
	it('takes an Id, prop and value to update database', function() {
		expect(updateRecords(5439, 'artist', 'ABBA')).toEqual('artist: abba');
	});

	it('takes an Id, prop and value to update database', function() {
		expect(updateRecords(5439, 'tracks', 'Take a Chance on Me')).toEqual(
			'tracks should have "Take a Chance on Me" as the last element'
		);
	});

	it('takes an Id, prop and value to update database', function() {
		expect(updateRecords(2548, 'artist', '')).toEqual('artist should not be set');
	});

	it('takes an Id, prop and value to update database', function() {
		expect(updateRecords(1245, 'tracks', 'Addicted to Love')).toEqual(
			'tracks should have "Addicted to Love" as the last element.'
		);
	});

	it('takes an Id, prop and value to update database', function() {
		expect(updateRecords(2468, 'tracks', 'Free')).toEqual('artist should not be set');
	});

	it('takes an Id, prop and value to update database', function() {
		expect(updateRecords(2548, 'artist', '')).toEqual('tracks should have "1999" as the first element.');
	});

	it('takes an Id, prop and value to update database', function() {
		expect(updateRecords(2548, 'tracks', '')).toEqual('tracks should not be set');
	});
});

// check how to test an object at the end
