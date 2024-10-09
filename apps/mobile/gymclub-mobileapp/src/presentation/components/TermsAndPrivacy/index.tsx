import { Link } from 'expo-router';

import Text from '@/presentation/components/Text';

export default function TermsAndPrivacy() {
	return (
		<Text className="font-gymclub-regular text-gymclub-gray-500">
			Ao continuar você afirma que leu e concordou com nossos{' '}
			<Link
				className="text-gymclub-blue-600 font-gymclub-bold underline"
				href={'/'}
			>
				Termos e Condições
			</Link>{' '}
			e com a{' '}
			<Link
				className="text-gymclub-blue-600 font-gymclub-bold underline"
				href={'/'}
			>
				Política de Privacidade
			</Link>
			.
		</Text>
	);
}
