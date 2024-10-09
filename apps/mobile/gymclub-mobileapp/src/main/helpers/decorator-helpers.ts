export type Decorator<T> = (instance: T) => T;

export function applyDecorators<T>(instance: T, decorators: Decorator<T>[]): T {
	return decorators.reduce(
		(decoratedInstance, decorator) => decorator(decoratedInstance),
		instance,
	);
}
