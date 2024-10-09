export interface HttpResponse<T> {
	status: number;
	body: T;
}

export interface HttpRequest<T> {
	body?: T;
}
