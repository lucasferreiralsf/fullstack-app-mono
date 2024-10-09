import { useRoute } from '@react-navigation/native';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { IntentCreationCallbackParams } from '@stripe/stripe-react-native/lib/typescript/src/types/PaymentSheet';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';

import { PAYMENT_PROVIDER_PUBLIC_KEY } from '@/data/constants';

import { PaymentMethodNotSetError } from '@/domain/errors';

import Button from '@/presentation/components/Button';
import Text from '@/presentation/components/Text';

import PaymentHeader from './components/PaymentHeader';
import { PlanDetails } from './components/PlanDetails';
import { PaymentPageProps, PaymentRouteProp } from './types';

export default function PaymentPage({
	choosePlan,
	setPaymentMethod,
}: PaymentPageProps) {
	const { initPaymentSheet, presentPaymentSheet } = useStripe();

	const route = useRoute<PaymentRouteProp>();
	const { backUrl, ...plan } = route.params;

	const publishableKey = PAYMENT_PROVIDER_PUBLIC_KEY;

	const initializePaymentSheet = async () => {
		await initPaymentSheet({
			merchantDisplayName: 'GymClub',
			returnURL: 'gymclub://payment',
			intentConfiguration: {
				confirmHandler: (res, shouldSave, cb) => confirmHandler(cb),
				mode: {
					setupFutureUsage: 'OffSession',
				},
			},
		});
	};

	const confirmHandler = async (
		intentCreationCallback: (result: IntentCreationCallbackParams) => void,
	) => {
		const { clientSecret } = await setPaymentMethod.run();
		if (clientSecret) intentCreationCallback({ clientSecret });
	};

	useEffect(() => {
		initializePaymentSheet();
	}, []);

	const didTapCheckoutButton = async () => {
		try {
			await choosePlan.run(plan.id);
		} catch (error) {
			if (error instanceof PaymentMethodNotSetError) {
				const result = await presentPaymentSheet();
				if (result.error) {
					return;
				}
				await choosePlan.run(plan.id);
			}
		}

		return void router.push({
			pathname: '/success',
			params: {
				title: 'Pagamento realizado com sucesso',
				subtitle: 'Acessa o app e aproveita todos os nossos recursos.',
				buttonText: 'Acessar minha conta',
				onPressDestination: '/home',
			},
		});
	};

	return (
		<StripeProvider publishableKey={publishableKey} urlScheme="gymclub">
			<SafeAreaView className="flex-1 bg-gymclub-white">
				<View className="flex-1 p-6 gap-7">
					<PaymentHeader backUrl={backUrl} />

					<PlanDetails plan={plan} />

					<View className="flex-1 gap-4" />

					<Button onPress={didTapCheckoutButton}>
						<Text className="text-gymclub-white">Realizar Pagamento</Text>
					</Button>
				</View>
			</SafeAreaView>
		</StripeProvider>
	);
}
