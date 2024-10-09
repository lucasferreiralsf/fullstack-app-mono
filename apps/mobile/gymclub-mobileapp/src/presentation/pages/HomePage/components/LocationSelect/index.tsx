import React, { useEffect, useMemo, useState } from 'react';

import { AddressModel } from '@/domain/models/address';
import { GymModel } from '@/domain/models/gym';

import { LocationIcon } from '@/presentation/components/icons';
import Select from '@/presentation/components/Select';

import { LocationSelectProps } from './types';

export default function LocationSelect({
	gyms,
	onValueChange,
}: LocationSelectProps) {
	// Todo: Use the geolocation service and define the largest city closest to the user?
	const DEFAULT_SELECT_VALUE = {
		key: 'all',
		value: 'Portugal',
	};

	const [gymAdresses, setGymAdresses] = useState<AddressModel[]>([]);

	const mapAddressSelectOptions = useMemo(
		() => [
			DEFAULT_SELECT_VALUE,
			...gymAdresses.map((address) => ({
				key: address.addressId.toString(),
				value: address.city,
			})),
		],
		[gymAdresses],
	);

	const setUniqueGymAdresses = (gymsReponse: GymModel[]) => {
		const uniqueAdresses: AddressModel[] = [];
		const addressIds = new Set();

		gymsReponse.forEach((gym) => {
			if (!addressIds.has(gym.address.addressId)) {
				addressIds.add(gym.address.addressId);
				uniqueAdresses.push(gym.address);
			}
		});

		setGymAdresses(uniqueAdresses);
	};

	useEffect(() => {
		setUniqueGymAdresses(gyms);
	}, []);

	return (
		<Select
			className="px-6"
			values={mapAddressSelectOptions}
			onValueChange={onValueChange}
			leftIcon={<LocationIcon className="h-6 w-6" />}
			defaultValue={DEFAULT_SELECT_VALUE}
		/>
	);
}
