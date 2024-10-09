import { SignUp } from '@/domain/usecases/signup';

export interface FormPageProps {
	signUp: SignUp;
}

export interface SignUpFormData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface SignUpFormRef {
	submitForm: () => void;
}
