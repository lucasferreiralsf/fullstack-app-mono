export interface PaymentMethodProps {
	method: 'MbWay' | 'Multibanco';
	details: {
		phoneNumber?: string;
		entity?: string;
		reference?: string;
		amount: string;
	};
}
