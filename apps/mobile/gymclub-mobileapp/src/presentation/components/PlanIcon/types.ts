import { PlanSku } from '@/domain/models/enums/plan-sku';

import { PropsWithClassName } from '@/presentation/interfaces/PropsWithClassName';

export interface PlanIconProp extends PropsWithClassName {
	planSku: PlanSku;
}
