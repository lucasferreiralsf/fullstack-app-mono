import { GeolocationService } from '@/data/interfaces/geolocation-service';

import { DefaultGetLocation } from './default';

const makeSut = () => {
	class MockGeolocationClient implements GeolocationService {
		async getCurrentPosition() {
			return { latitude: 0, longitude: 0 };
		}
	}

	const geolocationClient = new MockGeolocationClient();
	const sut = new DefaultGetLocation(geolocationClient);
	return {
		sut,
		geolocationClient,
	};
};

describe('DefaultGetLocation', () => {
	test('should call Geolocation', async () => {
		const { sut, geolocationClient } = makeSut();
		const getCurrentPositionSpy = jest.spyOn(
			geolocationClient,
			'getCurrentPosition',
		);
		await sut.getCurrentPosition();
		expect(getCurrentPositionSpy).toHaveBeenCalled();
	});

	test('should return a location on success', async () => {
		const { sut } = makeSut();
		const location = await sut.getCurrentPosition();
		expect(location).toEqual({
			latitude: 0,
			longitude: 0,
		});
	});

	test('should throw same error as GeolocationClient', async () => {
		const { sut, geolocationClient } = makeSut();
		const error = new Error('any_error');
		jest
			.spyOn(geolocationClient, 'getCurrentPosition')
			.mockImplementationOnce(() => {
				throw error;
			});
		const promise = sut.getCurrentPosition();
		expect(promise).rejects.toThrow(error);
	});
});
