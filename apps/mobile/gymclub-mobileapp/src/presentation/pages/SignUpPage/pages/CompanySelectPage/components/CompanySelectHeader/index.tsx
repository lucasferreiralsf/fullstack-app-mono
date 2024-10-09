import Text from '@/presentation/components/Text';
import SignUpHeader from '@/presentation/pages/SignUpPage/components/SignUpHeader';

export default function CompanySelectHeader() {
	return (
		<>
			<SignUpHeader />

			<Text className="mb-2 text-gymclub-black font-gymclub-extra-bold text-lg">
				Sua empresa já é nossa parceira?
			</Text>

			<Text className="mb-6 text-gymclub-gray-500 font-gymclub-regular text-base">
				Vamos verificar se a empresa onde trabalhas atualmente tem parceria com
				o{' '}
				<Text className="text-gymclub-primary font-gymclub-bold text-base">
					gymclub
				</Text>
				.
			</Text>
		</>
	);
}
