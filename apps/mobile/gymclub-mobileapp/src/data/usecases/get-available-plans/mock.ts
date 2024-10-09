import { MembershipPlan } from '@/domain/models/membership-plan';
import { GetAvailablePlans } from '@/domain/usecases/get-available-plans';

export class MockGetAvailablePlans implements GetAvailablePlans {
	run(): Promise<MembershipPlan[]> {
		return Promise.resolve([
			{
				id: '1',
				price: '26',
				name: 'Prata',
				sku: 'silver-plan',
				description:
					'Um plano básico, focado no essencial para quem está começando ou quer acesso às funcionalidades principais.',
			},
			{
				id: '2',
				price: '35',
				name: 'Ouro',
				sku: 'gold-plan',
				description:
					'Um plano intermediário, que oferece mais recursos e suporte para quem quer melhorar seu desempenho.',
			},
			{
				id: '3',
				price: '48',
				name: 'Esmeralda',
				sku: 'sapphire-plan',
				description:
					'Um plano avançado para quem busca resultados expressivos e um acompanhamento mais detalhado.',
			},
			{
				id: '4',
				price: '56',
				name: 'Diamante',
				sku: 'diamond-plan',
				description:
					'O melhor plano com acesso total a todas as funcionalidades, incluindo benefícios e suporte personalizado.',
			},
		]);
	}
}
