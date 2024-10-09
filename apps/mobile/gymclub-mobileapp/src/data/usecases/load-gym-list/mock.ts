import { GymModel } from '@/domain/models/gym';
import { LoadGymList } from '@/domain/usecases/load-gym-list';

export class MockLoadGymList implements LoadGymList {
	loadGyms(): Promise<GymModel[]> {
		return Promise.resolve([
			{
				picture:
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJJ7GznlLLsRsFSrQVSO351H2XD08Vlo9FpQ&s',
				name: 'Armazém do Fitness',
				address: {
					city: 'Arcozelo',
					countryCode: 'PT',
					addressId: 1,
				},
				category: {
					name: 'Musculação',
					categoryId: 1,
				},
				distance: 200,
				isOpen: true,
				closingTime: '21:00',
				rating: 3.4,
			},
			{
				picture:
					'https://antonovich-design.com/uploads/gallery/2022/5/2022KGrx71Dtlk5k.jpg',
				name: 'Fitness UP',
				address: {
					city: 'Vila nova de Gaia',
					countryCode: 'PT',
					addressId: 2,
				},
				category: {
					name: 'Crosstraining',
					categoryId: 2,
				},
				distance: 100,
				isOpen: true,
				closingTime: '21:00',
				rating: 5,
			},
			{
				picture:
					'https://5.imimg.com/data5/BM/DF/NP/SELLER-1082603/gym-interior-designers.jpg',
				name: 'Armazém do Fitness com nome mais longoaaaaaaaaaa',
				address: {
					city: 'Arcozelo',
					countryCode: 'PT',
					addressId: 1,
				},
				category: {
					name: 'Pilates',
					categoryId: 3,
				},
				distance: 50,
				isOpen: true,
				closingTime: '21:00',
				rating: 4.9,
			},
		]);
	}
}
