import { SignUpFormData } from '../../pages/SignUpPage/pages/FormPage/types';

export const validateForm = ({
	firstName,
	lastName,
	email,
	password,
	confirmPassword,
}: SignUpFormData) => {
	if (!firstName || !lastName || !email || !password || !confirmPassword) {
		throw new Error('Por favor, preencha corretamente todos os campos.');
	}
	if (password !== confirmPassword) {
		throw new Error('As senhas não coincidem.');
	}
};
