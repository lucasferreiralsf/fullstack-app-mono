import { PasswordResetTokenTable } from '@gymclub/db';

export interface PasswordResetTokenRepository {
	create: (userId: string, token: string) => Promise<void>;
	findByUserId: (userId: string) => Promise<PasswordResetTokenTable | null>;
}
