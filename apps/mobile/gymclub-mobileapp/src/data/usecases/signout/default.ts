import { DataStorage } from '@/data/interfaces/data-storage';

import { SignOut } from '@/domain/usecases/signout';

export class DefaultSignOut implements SignOut {
	constructor(private readonly dataStorage: DataStorage) {}

	async run(): Promise<void> {
		return this.dataStorage.delete('session-id');
	}
}
