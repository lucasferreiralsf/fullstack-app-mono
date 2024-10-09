export interface Usecase<I, O = void> {
	invoke: (input: I) => Promise<O>;
}
