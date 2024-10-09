import { GymModel } from '@/domain/models/gym';

import { SelectOption } from '@/presentation/components/Select/types';

export interface LocationSelectProps {
	gyms: GymModel[];
	onValueChange: (value: SelectOption) => void;
}
