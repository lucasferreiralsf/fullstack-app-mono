import { RemoteSignUp } from '@/data/usecases/signup/default';

import FormPage from '@/presentation/pages/SignUpPage/pages/FormPage';

import { makeSecureStorageAdapter } from '../adapters/secure-storage-adapter';
import { makeHttpClient } from '../http/http-client';

export function MakeSignUpFormPage(): React.JSX.Element {
	const httpClient = makeHttpClient();
	const secureStorage = makeSecureStorageAdapter();
	const signUp = new RemoteSignUp(httpClient, secureStorage);

	return <FormPage signUp={signUp} />;
}
