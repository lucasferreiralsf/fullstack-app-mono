import { z } from 'zod';
import { generateEnv } from '@gymclub/utils';

const envSchema = z.object({
	DB_URL: z.string().min(1),
});

export const env = generateEnv(envSchema);
