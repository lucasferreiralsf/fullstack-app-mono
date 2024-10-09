import { DataStorage } from '@/data/interfaces/data-storage';

import { DefaultSignOut } from './default';

const makeFakeSecureStore = (): DataStorage => {
	class FakeSecureStore implements DataStorage {
		async get(key: string): Promise<string | null> {
			return 'some_value';
		}

		async set(key: string, value: string): Promise<void> {}

		async delete(key: string): Promise<void> {}
	}
	return new FakeSecureStore();
};

const makeSut = () => {
	const secureStore = makeFakeSecureStore();
	const sut = new DefaultSignOut(secureStore);
	return { sut, secureStore };
};

describe('SignOut', () => {
	it('should call secure store with correct values', async () => {
		const { sut, secureStore } = makeSut();
		const requestSpy = jest.spyOn(secureStore, 'delete');

		await sut.run();

		expect(requestSpy).toHaveBeenCalledWith('session-id');
	});
});
