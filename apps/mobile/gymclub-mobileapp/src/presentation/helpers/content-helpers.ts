import { GymListType } from '@/domain/models/enums/gym-list-type';

import { AppPage } from '@/presentation/enums/app-page';

export const titlePageMap = (listType: AppPage | GymListType) =>
	({
		[GymListType.ALL]: '',
		[GymListType.GYMS_NEARBY]: 'Ginásios por perto',
		[GymListType.GYMS_IN_YOUR_PLAN]: 'No seu plano',
		[GymListType.GYMS_TOP_RATED]: 'Melhores avaliações',
		[AppPage.HOME]: 'GymClub',
		[AppPage.CHECK_IN]: 'Realizar Check-in',
		[AppPage.SEARCH]: 'Buscar',
		[AppPage.PROFILE]: 'Perfil',
	})[listType] ?? '';

export const titleTabMap = (listType: AppPage) =>
	({
		[AppPage.HOME]: 'Início',
		[AppPage.CHECK_IN]: 'Check-in',
		[AppPage.SEARCH]: 'Buscar',
		[AppPage.PROFILE]: 'Perfil',
	})[listType] ?? '';
