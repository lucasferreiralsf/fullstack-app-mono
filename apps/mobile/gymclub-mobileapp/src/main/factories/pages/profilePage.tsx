import { DefaultSignOut } from '@/data/usecases/signout/default';

import ProfilePage from '@/presentation/pages/ProfilePage';

import { makeSecureStorageAdapter } from '../adapters/secure-storage-adapter';

export const MakeProfilePage = (): React.JSX.Element => {
	const secureStorage = makeSecureStorageAdapter();
	const signOut = new DefaultSignOut(secureStorage);

	return <ProfilePage signOut={signOut} />;
};
