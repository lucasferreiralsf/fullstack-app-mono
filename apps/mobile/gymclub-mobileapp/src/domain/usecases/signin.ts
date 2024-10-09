import { SignInModel } from '../models/signin';

export interface SignIn {
	run: (email: string, password: string) => Promise<SignInModel | null>;
}
