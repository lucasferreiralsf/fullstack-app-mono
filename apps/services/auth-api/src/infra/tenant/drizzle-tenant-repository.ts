import { address, AddressTable, tenant, TenantTable } from '@gymclub/db';
import { DrizzleDbClient } from '@gymclub/db/db';
import { and, eq, ilike } from 'drizzle-orm';
import {
	GetTenantsParams,
	TenantRepository,
} from '../../data/tenant/tenant-repository';

type TenantWithAddress = TenantTable & { address: AddressTable };

export class DrizzleTenantRepository implements TenantRepository {
	constructor(private readonly client: DrizzleDbClient) {}

	async getTenantsWithAddress(
		params: GetTenantsParams,
	): Promise<TenantWithAddress[]> {
		const { search, type } = params;

		const searchCondition = search
			? ilike(tenant.name, `%${search}%`)
			: undefined;

		const result = await this.client
			.select()
			.from(tenant)
			.innerJoin(address, eq(tenant.addressId, address.id))
			.where(and(eq(tenant.type, type), searchCondition));

		return result.map((row) => ({
			...row.tenant,
			address: row.address,
		}));
	}
}
