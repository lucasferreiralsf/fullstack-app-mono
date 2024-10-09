import { ChoosePlan } from '@/domain/usecases/choose-plan';

export class MockChoosePlan implements ChoosePlan {
	private delayTime = 1000;

	private availablePlans: string[] = ['plan1', 'plan2', 'plan3'];

	async run(planId: string): Promise<void> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (this.availablePlans.includes(planId)) {
					resolve();
				} else {
					reject(new Error('Invalid plan ID.'));
				}
			}, this.delayTime);
		});
	}
}
