import { router } from 'expo-router';

import LeftTextHeader from '@/presentation/components/LeftTextHeader';
import Text from '@/presentation/components/Text';

export default function ForgotMyPasswordHeader() {
	return (
		<>
			<LeftTextHeader
				title="Esqueci minha senha"
				onPress={() => void router.back()}
			/>

			<Text className="mb-2 text-gymclub-black font-gymclub-medium text-lg">
				Digite o seu e-mail
			</Text>

			<Text className="mb-6 text-gymclub-gray-500 font-gymclub-regular text-base">
				Enviaremos-te um código de verificação por e-mail para te ajudar a
				redefinir a senha.
			</Text>
		</>
	);
}
