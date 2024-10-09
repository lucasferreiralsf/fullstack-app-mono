import { CompanyModel } from '@/domain/models/company';
import { GetCompanies } from '@/domain/usecases/get-companies';

export class MockGetCompanies implements GetCompanies {
	private delayTime = 1000;

	private mockResponse: CompanyModel[] = [
		{ name: 'Uber', city: 'Portugal', tenantId: '1' },
		{ name: 'Uber Eats', city: 'Portugal', tenantId: '2' },
		{ name: 'Google', city: 'EUA', tenantId: '3' },
		{ name: 'Apple', city: 'EUA', tenantId: '4' },
		{ name: 'Spotify', city: 'Suécia', tenantId: '5' },
		{ name: 'Samsung', city: 'Coreia do Sul', tenantId: '6' },
		{ name: 'Nokia', city: 'Finlândia', tenantId: '7' },
		{ name: 'Airbnb', city: 'EUA', tenantId: '8' },
		{ name: 'Amazon', city: 'EUA', tenantId: '9' },
		{ name: 'Tencent', city: 'China', tenantId: '10' },
		{ name: 'Toyota', city: 'Japão', tenantId: '11' },
		{ name: 'Siemens', city: 'Alemanha', tenantId: '12' },
		{ name: 'Ikea', city: 'Suécia', tenantId: '13' },
		{ name: 'Nestlé', city: 'Suíça', tenantId: '14' },
		{ name: 'Renault', city: 'França', tenantId: '15' },
		{ name: 'BP', city: 'Reino UntenantIdo', tenantId: '16' },
		{ name: 'Globo', city: 'Brasil', tenantId: '17' },
		{ name: 'Vale', city: 'Brasil', tenantId: '18' },
		{ name: 'Santander', city: 'Espanha', tenantId: '19' },
		{ name: 'Volkswagen', city: 'Alemanha', tenantId: '20' },
	];

	async run(search?: string): Promise<CompanyModel[]> {
		return new Promise((resolve) => {
			setTimeout(() => {
				if (search) {
					const lowercasedTerm = search.toLowerCase();
					const filteredCompanies = this.mockResponse.filter((company) =>
						company.name.toLowerCase().includes(lowercasedTerm),
					);
					resolve(filteredCompanies);
				} else {
					resolve(this.mockResponse);
				}
			}, this.delayTime);
		});
	}
}
