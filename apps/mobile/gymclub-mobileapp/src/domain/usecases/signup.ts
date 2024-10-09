import { SignUpModel } from '../models/signup';

export interface SignUp {
	run: (payload: SignUpFormPayload) => Promise<SignUpModel | null>;
}

export interface SignUpFormPayload {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	docNumber: string;
	tenantId: string;
}
