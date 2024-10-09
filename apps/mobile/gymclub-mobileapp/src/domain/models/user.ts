export interface UserModel {
	id: string;
	profileId: string;
	planId: string | null;
	firstName: string;
	lastName: string;
	emailVerified: boolean;
	email: string;
}
