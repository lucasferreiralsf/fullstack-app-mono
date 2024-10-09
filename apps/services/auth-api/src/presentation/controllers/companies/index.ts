import {
	CreationSuccessResponse,
	DefaultResponse,
} from '@gymclub/auth-api/utils/custom-responses';
import { Elysia, t } from 'elysia';
import { GetCompaniesUsecaseAdapter } from '../../../main/adapters/usecases/get-companies';
import { ValidateUserDocumentUsecaseAdapter } from '../../../main/adapters/usecases/validate-user-document';

export const companiesController = new Elysia({ prefix: '/companies' })
	.use(GetCompaniesUsecaseAdapter)
	.use(ValidateUserDocumentUsecaseAdapter)
	.get(
		'/',
		async ({ getCompanies, query }) => {
			const result = await getCompanies.invoke({ search: query.search });
			return new CreationSuccessResponse(result);
		},
		{
			query: t.Optional(
				t.Object({
					search: t.String(),
				}),
			),
		},
	)
	.get(
		'/:tenantId/documents/:docNumber',
		async ({ validateUserDocument, params }) => {
			const { docNumber, tenantId } = params;

			await validateUserDocument.invoke({ tenantId, docNumber });
			return new DefaultResponse();
		},
		{
			params: t.Object({
				docNumber: t.String(),
				tenantId: t.String(),
			}),
		},
	);
