export interface PasswordFieldsProps {
	password: string;
	confirmPassword: string;
	onPasswordChange: (password: string) => void;
	onConfirmPasswordChange: (confirmPassword: string) => void;
}
