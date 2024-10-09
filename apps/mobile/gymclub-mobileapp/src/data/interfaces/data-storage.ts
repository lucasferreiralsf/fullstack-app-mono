export interface DataStorage {
	get: (key: string) => Promise<string | null>;
	set: (key: string, value: string) => Promise<void>;
	delete: (key: string) => Promise<void>;
}
