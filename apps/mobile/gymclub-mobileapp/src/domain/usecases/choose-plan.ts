export interface ChoosePlan {
	run: (planId: string) => Promise<ChoosePlanResult>;
}

export interface ChoosePlanResult {
	clientSecret: string;
}
