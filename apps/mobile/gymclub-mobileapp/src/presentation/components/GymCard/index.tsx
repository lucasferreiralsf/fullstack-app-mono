import { useMemo } from 'react';

import GymCardCompact from './compact';
import GymCardFull from './full';
import { GymCardProps } from './types';

export default function GymCard(props: GymCardProps) {
	const { distanceInMeters, isCompact } = props;
	const distance = useMemo(() => `${distanceInMeters} m`, [distanceInMeters]);

	const sharedProps = { ...props, distance };

	return isCompact ? (
		<GymCardCompact {...sharedProps} />
	) : (
		<GymCardFull {...sharedProps} />
	);
}
