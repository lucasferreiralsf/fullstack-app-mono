import Text from '@/presentation/components/Text';
import SignUpHeader from '@/presentation/pages/SignUpPage/components/SignUpHeader';

import { VerifyCodeHeaderProps } from './types';

export default function VerifyCodeHeader({ userEmail }: VerifyCodeHeaderProps) {
	return (
		<>
			<SignUpHeader goToLogin />

			<Text className="mb-2 text-gymclub-black font-gymclub-medium text-lg">
				Enviamos-te um e-mail com um{' '}
				<Text className="text-gymclub-black font-gymclub-extra-bold text-lg">
					código de verificação
				</Text>
			</Text>

			<Text className="mb-6 text-gymclub-gray-500 font-gymclub-regular text-base">
				Cola o código enviado para “{userEmail}” no campo abaixo para avançar.
			</Text>
		</>
	);
}
