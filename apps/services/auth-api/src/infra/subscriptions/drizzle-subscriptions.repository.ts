import { subscriptions, SubscriptionsTable } from '@gymclub/db';
import { DrizzleDbClient } from '@gymclub/db/db';
import { eq, getTableColumns } from 'drizzle-orm';
import { SubscriptionRepository } from '../../data/subscription/subscription-repository';
import { SubscriptionStatus } from '../../domain/enums/subscription-status';
import { SubscriptionModel } from '../../domain/models/subscription';

export class DrizzleSubscriptionRepository implements SubscriptionRepository {
	constructor(private readonly client: DrizzleDbClient) {}

	async create(
		profileId: string,
		planId: string,
		providerSubscriptionId: string,
	): Promise<SubscriptionModel> {
		const result = await this.client.transaction(async (transaction) => {
			await transaction
				.delete(subscriptions)
				.where(eq(subscriptions.athleteProfileId, profileId));

			const [createdSubscription] = await transaction
				.insert(subscriptions)
				.values({
					athleteProfileId: profileId,
					planId,
					startDate: new Date(),
					status: 'INACTIVE',
					providerSubscriptionId,
				})
				.returning(getTableColumns(subscriptions));
			return createdSubscription;
		});

		return this.toSubscriptionModel(result);
	}

	async updateStatusByProviderId(
		id: string,
		status: SubscriptionStatus,
	): Promise<void> {
		await this.client
			.update(subscriptions)
			.set({ status: this.toStatusDto(status) })
			.where(eq(subscriptions.providerSubscriptionId, id));
	}

	async findByAthleteProfileId(
		athleteProfileId: string,
	): Promise<SubscriptionModel | null> {
		const record = await this.client.query.subscriptions.findFirst({
			where: eq(subscriptions.athleteProfileId, athleteProfileId),
		});

		return record ? this.toSubscriptionModel(record) : null;
	}

	private toSubscriptionModel(table: SubscriptionsTable): SubscriptionModel {
		const statusMap: Record<SubscriptionsTable['status'], SubscriptionStatus> =
			{
				ACTIVE: SubscriptionStatus.ACTIVE,
				INACTIVE: SubscriptionStatus.INACTIVE,
				PAYMENT_PENDING: SubscriptionStatus.PAYMENT_PENDING,
			};

		return {
			id: table.id,
			athleteProfileId: table.athleteProfileId,
			planId: table.planId,
			providerSubscriptionId: table.providerSubscriptionId!,
			startDate: table.startDate!,
			endDate: table.endDate!,
			status: statusMap[table.status],
		};
	}

	private toStatusDto(
		status: SubscriptionStatus,
	): SubscriptionsTable['status'] {
		const statusMap: Record<SubscriptionStatus, SubscriptionsTable['status']> =
			{
				[SubscriptionStatus.ACTIVE]: 'ACTIVE',
				[SubscriptionStatus.INACTIVE]: 'INACTIVE',
				[SubscriptionStatus.PAYMENT_PENDING]: 'PAYMENT_PENDING',
			};

		return statusMap[status];
	}
}
