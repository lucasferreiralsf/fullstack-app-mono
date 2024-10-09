import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';

import { DataStorage } from '@/data/interfaces/data-storage';

export class SecureStorageAdapter implements DataStorage {
	async get(key: string): Promise<string | null> {
		const value = await getItemAsync(key);
		return value;
	}

	async set(key: string, value: string): Promise<void> {
		await setItemAsync(key, value);
	}

	async delete(key: string): Promise<void> {
		await deleteItemAsync(key);
	}
}
