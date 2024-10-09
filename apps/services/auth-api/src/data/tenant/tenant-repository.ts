import { AddressTable, TenantTable } from '@gymclub/db';
import { TenantType } from '../../domain/models/tenant';

type TenantWithAddress = TenantTable & { address: AddressTable };

export interface TenantRepository {
	getTenantsWithAddress: (
		params: GetTenantsParams,
	) => Promise<TenantWithAddress[]>;
}

export interface GetTenantsParams {
	type: TenantType;
	search?: string;
}
