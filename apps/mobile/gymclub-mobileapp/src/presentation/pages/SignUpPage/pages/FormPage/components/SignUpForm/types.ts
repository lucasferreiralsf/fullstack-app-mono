import { SignUpFormData } from '../../types';

export interface SignUpFormProps {
	onSubmit: (data: SignUpFormData) => void;
}
