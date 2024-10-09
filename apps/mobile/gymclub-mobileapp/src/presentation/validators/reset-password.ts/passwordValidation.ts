export const validatePassword = (password: string, confirmPassword: string) => {
	if (!password || !confirmPassword) {
		throw new Error('Por favor, preencha todos os campos de senha.');
	}
	if (password !== confirmPassword) {
		throw new Error('As senhas não coincidem.');
	}
};
