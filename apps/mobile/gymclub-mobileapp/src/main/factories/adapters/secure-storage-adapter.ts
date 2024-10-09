import { DataStorage } from '@/data/interfaces/data-storage';

import { SecureStorageAdapter } from '@/infra/cache/secure-storage-adapter';

export const makeSecureStorageAdapter = (): DataStorage =>
	new SecureStorageAdapter();
