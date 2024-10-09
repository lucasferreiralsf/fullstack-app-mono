export interface UserModel {
	id: string;
	email: string;
	username?: string;
	firstName: string;
	lastName: string;
	emailVerified: boolean;
}

export type UserAthleteModel = UserProfile<AthleteProfile>;

interface UserProfile<T> extends UserModel {
	profile: T;
}

interface AthleteProfile {
	id: string;
	providerCustomerId: string | null;
	docNumber: string | null;
	docType: string | null;
}
