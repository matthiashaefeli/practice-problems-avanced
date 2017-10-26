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


