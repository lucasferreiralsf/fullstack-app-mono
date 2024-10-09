import Geolocation from '@react-native-community/geolocation';

import {
	LocationPermissionDeniedError,
	LocationTimeoutError,
	LocationUnavailableError,
	LocationUnexpectedError,
} from '@/domain/errors';

import { DefaultGeolocationService } from './default-geolocation-service';

const setupGeolocationSpy = () => {
	const geolocationSpy = jest.spyOn(Geolocation, 'getCurrentPosition');
	const result = {
		coords: {
			latitude: 1,
			longitude: 1,
			altitude: 0,
			accuracy: 0,
			altitudeAccuracy: 0,
			heading: 0,
			speed: 0,
		},
		timestamp: 1,
	};
	geolocationSpy.mockImplementation((success) => {
		success(result);
	});
	return geolocationSpy;
};

const makeErrorResult = (code: number) => ({
	code,
	message: 'any_message',
	PERMISSION_DENIED: 1,
	POSITION_UNAVAILABLE: 2,
	TIMEOUT: 3,
});

const makeSut = () => new DefaultGeolocationService(Geolocation);

describe('DefaultGeolocationService', () => {
	beforeAll(setupGeolocationSpy);

	test('should return a location', async () => {
		const sut = makeSut();
		const result = await sut.getCurrentPosition();
		expect(result).toEqual({ latitude: 1, longitude: 1 });
	});

	test.each([
		[1, new LocationPermissionDeniedError()],
		[2, new LocationUnavailableError()],
		[3, new LocationTimeoutError()],
		[0, new LocationUnexpectedError()],
	])(
		'should throw when Geolocation client error thrown iss %s',
		async (test, expected) => {
			const geolocationSpy = jest.spyOn(Geolocation, 'getCurrentPosition');
			geolocationSpy.mockImplementation((_, error) => {
				if (error) error(makeErrorResult(test));
			});

			const sut = makeSut();
			const promise = sut.getCurrentPosition();
			await expect(promise).rejects.toThrow(expected);
		},
	);
});
