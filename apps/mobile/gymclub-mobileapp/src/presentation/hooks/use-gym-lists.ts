import { useState } from 'react';

import { GymListType } from '@/domain/models/enums/gym-list-type';
import { GymModel } from '@/domain/models/gym';
import { LocationModel } from '@/domain/models/location';
import { LoadGymList } from '@/domain/usecases/load-gym-list';

export const useGymLists = (loadGymList: LoadGymList) => {
	const [gymsNearby, setGymsNearby] = useState<GymModel[]>([]);
	const [gymsInYourPlan, setGymsInYourPlan] = useState<GymModel[]>([]);
	const [allGyms, setAllGyms] = useState<GymModel[]>([]);
	const [gymsTopRated, setGymsTopRated] = useState<GymModel[]>([]);

	const loadGymsNearby = async (location: LocationModel | null) => {
		if (!location) return [];
		const result = await loadGymList.loadGyms(
			GymListType.GYMS_NEARBY,
			location,
		);
		setGymsNearby(result);
	};

	const loadGymsInYourPlan = async () => {
		const result = await loadGymList.loadGyms(
			GymListType.GYMS_IN_YOUR_PLAN,
			null,
		);
		setGymsInYourPlan(result);
	};

	const loadAllGyms = async () => {
		const result = await loadGymList.loadGyms(GymListType.ALL, null);
		setAllGyms(result);
	};

	const loadGymsTopRated = async () => {
		const result = await loadGymList.loadGyms(GymListType.GYMS_TOP_RATED, null);
		setGymsTopRated(result);
	};

	return {
		allGyms,
		gymsNearby,
		gymsInYourPlan,
		gymsTopRated,
		loadGymsNearby,
		loadGymsInYourPlan,
		loadAllGyms,
		loadGymsTopRated,
	};
};
