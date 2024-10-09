/* eslint-disable no-console */
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';
import { makeDbClient } from './db';
import {
	address,
	companyEmployee,
	companyProfile,
	gymEmployeeProfile,
	gymPlans,
	gymProfile,
	openingHours,
	permissions,
	plan,
	roles,
	rolesPermissions,
	tenant,
	user,
	userRoles,
} from './schema';

dotenv.config();

export const dbClient = makeDbClient(
	'postgres://postgres:postgres@localhost:5432/gymclubdb',
);

const GYMS_PER_PLAN = 10;
const EMPLOYEES_PER_PLAN = 2;
const COMPANIES_AMOUNT = 5;
const DEFAULT_PASSWORD = 'Senha@123';

async function generateAddress() {
	const fakeAddress = await dbClient
		.insert(address)
		.values({
			street: faker.location.streetAddress(),
			number: faker.location.buildingNumber(),
			complement: faker.location.secondaryAddress(),
			locality: faker.location.city(),
			municipality: faker.location.city(),
			region: faker.location.state(),
			country: faker.location.country(),
			postalCode: faker.location.zipCode(),
			latitude: faker.location.latitude().toString(),
			longitude: faker.location.longitude().toString(),
			createdAt: new Date(),
		})
		.returning();

	return fakeAddress[0].id;
}

async function generatePlans() {
	const plans = [
		{
			name: 'Prata',
			price: '26',
			sku: 'PLN-SILVER',
			providerProductId: 'prod_QrPWn9eopdnqDi',
		},
		{
			name: 'Ouro',
			price: '35',
			sku: 'PLN-GOLD',
			providerProductId: 'prod_QrPWJATUy7Nxab',
		},
		{
			name: 'Diamante',
			price: '48',
			sku: 'PLN-DIAMOND',
			providerProductId: 'prod_QrPX6OLIR71cn0',
		},
		{
			name: 'Safira',
			price: '56',
			sku: 'PLN-SAPPHIRE',
			providerProductId: 'prod_QrPXFlflarBssM',
		},
	];

	const planIds = await dbClient.transaction(async (transaction) => {
		const insertedPlans = await transaction
			.insert(plan)
			.values(
				plans.map((newPlan) => ({
					name: newPlan.name,
					price: newPlan.price,
					sku: newPlan.sku,
					provider_product_id: newPlan.providerProductId,
					createdAt: new Date(),
					updatedAt: new Date(),
				})),
			)
			.returning({ id: plan.id });

		return insertedPlans.map((newPlan) => newPlan.id);
	});

	return planIds;
}

async function generatePermission(name: string) {
	const fakePermission = await dbClient
		.insert(permissions)
		.values({ name })
		.returning();

	return fakePermission[0].id;
}

async function generateRolesAndPermissions() {
	const roleList = [
		{
			name: 'gym employee',
			description: 'Role for gym employee',
			permissions: 'partner_hub',
		},
		{
			name: 'athlete',
			description: 'Role for athlete',
			permissions: 'mobile_app',
		},
	];

	const roleIds = await dbClient.transaction(async (transaction) => {
		const roleMap: Record<string, string> = {};

		for (const role of roleList) {
			const [insertedRole] = await transaction
				.insert(roles)
				.values({
					name: role.name,
					description: role.description,
				})
				.returning({ id: roles.id, name: roles.name });

			roleMap[insertedRole.name] = insertedRole.id;

			const permissionId = await generatePermission(role.permissions);
			await transaction
				.insert(rolesPermissions)
				.values({ roleId: insertedRole.id, permissionId });
		}

		return roleMap;
	});

	return roleIds;
}

async function generateTenant(addressId: string, type: 'COMPANY' | 'GYM') {
	const fakeTenant = await dbClient
		.insert(tenant)
		.values({
			name: faker.company.name(),
			docId: faker.string.numeric(9),
			docType: 'NIF',
			addressId,
			type,
			createdAt: new Date(),
			updatedAt: new Date(),
		})
		.returning();

	return fakeTenant[0].id;
}

async function generateUser(tenantId: string) {
	const hashedPassword = await Bun.password.hash(DEFAULT_PASSWORD);

	const fakeUser = await dbClient
		.insert(user)
		.values({
			tenantId,
			email: faker.internet.email(),
			password: hashedPassword,
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			emailVerified: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		})
		.returning();

	return fakeUser[0].id;
}

async function generateOpeningHours(tenantId: string) {
	const weekdays = [1, 2, 3, 4, 5, 6, 7];
	const openTimes = ['07:00', '08:00', '09:00'];
	const closeTimes = ['20:00', '21:00', '22:00'];

	for (const weekday of weekdays) {
		await dbClient.insert(openingHours).values({
			gymId: tenantId,
			weekday,
			opensAt: faker.helpers.arrayElement(openTimes),
			closesAt: faker.helpers.arrayElement(closeTimes),
		});
	}
}

async function generateGym(planId: string, roleId: string) {
	const addressId = await generateAddress();
	const tenantId = await generateTenant(addressId, 'GYM');

	await dbClient.insert(gymProfile).values({
		tenantId,
		rating: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
		createdAt: new Date(),
		updatedAt: new Date(),
	});

	const userId = await generateUser(tenantId);

	await dbClient.insert(gymEmployeeProfile).values({
		userId,
		createdAt: new Date(),
		updatedAt: new Date(),
	});

	await dbClient.insert(userRoles).values({
		userId,
		roleId,
		name: `gym employee ${userId}`,
	});

	await dbClient.insert(gymPlans).values({
		gymId: tenantId,
		planId,
	});

	await generateOpeningHours(tenantId);

	console.log(`GYM created for tenant ${tenantId} with plan ${planId}`);
}

async function generateCompany(totalEmployees: number) {
	const addressId = await generateAddress();
	const tenantId = await generateTenant(addressId, 'COMPANY');

	const [createdCompany] = await dbClient
		.insert(companyProfile)
		.values({
			tenantId,
			createdAt: new Date(),
			updatedAt: new Date(),
		})
		.returning({ id: companyProfile.id });

	for (let i = 0; i < totalEmployees; i++) {
		await dbClient.insert(companyEmployee).values({
			companyId: createdCompany.id,
			docNumber: faker.string.numeric(9),
		});
	}

	console.log(`Company ${createdCompany.id} created`);
}

async function generateFakeData() {
	const planIds = await generatePlans();
	const roleIds = await generateRolesAndPermissions();

	for (const planId of planIds) {
		for (let index = 0; index < GYMS_PER_PLAN; index++) {
			await generateGym(planId, roleIds['gym employee']);
		}
	}

	const totalEmployees = planIds.length * EMPLOYEES_PER_PLAN;
	for (let companyIndex = 0; companyIndex < COMPANIES_AMOUNT; companyIndex++) {
		await generateCompany(totalEmployees);
	}
}

try {
	await generateFakeData();
	console.log('Data generated successfully');
} catch (error) {
	console.error(error);
}
