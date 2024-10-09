export interface SetPaymentMethod {
	run: () => Promise<SetPaymentMethodResult>;
}

export interface SetPaymentMethodResult {
	clientSecret: string;
}
