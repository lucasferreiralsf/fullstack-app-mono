import { PlanSku } from '@/domain/models/enums/plan-sku';

import {
	DiamondPlanIcon,
	GoldPlanIcon,
	SapphirePlanIcon,
	SilverPlanIcon,
} from '@/presentation/components/icons';

import { PlanIconProp } from './types';

export default function PlanIcon({ planSku, className }: PlanIconProp) {
	return {
		[PlanSku.SILVER]: <SilverPlanIcon className={className} />,
		[PlanSku.GOLD]: <GoldPlanIcon className={className} />,
		[PlanSku.DIAMOND]: <DiamondPlanIcon className={className} />,
		[PlanSku.SAPPHIRE]: <SapphirePlanIcon className={className} />,
	}[planSku];
}
