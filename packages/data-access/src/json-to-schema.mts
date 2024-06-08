/* eslint-disable unicorn/prefer-module */
/* eslint-disable unicorn/no-process-exit */
/* eslint-disable unicorn/prefer-node-protocol */
/* eslint-disable no-console */
import * as fs from 'fs';
import * as path from 'path';
import { camel, snake } from 'radash';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const dataTypeMap = {
	boolean: 'boolean',
	number: 'integer',
	object: 'jsonb', // Assuming objects are stored as JSONB
	string: 'varchar',
	undefined: 'varchar', // Assuming undefined values are treated as strings
} as never;

function replaceImportsPlaceholder(input: string, replacement: string): string {
	const importsPlaceholderRegex = /\${imports}/g;
	return input.replace(importsPlaceholderRegex, replacement);
}

function changeFirstItem(arr: string[], newItems: string[] = []): string[] {
	const uniqueNewItems = [...new Set(newItems)];
	const newFirstItem = uniqueNewItems.join(', ');
	const importToUpdate =
		arr.findIndex((element) => element.includes(`drizzle-orm/pg-core`)) || 0;
	if (arr.length === 0) {
		return [replaceImportsPlaceholder(arr[importToUpdate], newFirstItem)];
	}

	const newArr = [...arr];
	newArr[importToUpdate] = replaceImportsPlaceholder(
		arr[importToUpdate],
		newFirstItem,
	);
	return newArr;
}

function addToIndexFile(indexFilePath: string, exportStatement: string): void {
	const indexContent = fs.readFileSync(indexFilePath, 'utf8');
	const exportsSet = indexContent
		.split('\n')
		.filter((line) => line.trim().startsWith('export * from'));

	if (!exportsSet.includes(exportStatement.trim())) {
		fs.appendFileSync(indexFilePath, exportStatement);
		console.log(`Export statement added to ${indexFilePath}`);
	}
}

function createSchemaFile(
	schemaName: string,
	schemaFolderPath: string,
	indexFilePath: string,
): void {
	if (!fs.existsSync(schemaFolderPath)) {
		fs.mkdirSync(schemaFolderPath, { recursive: true });
	}
	const schemaFilePath = path.join(
		schemaFolderPath,
		`${camel(schemaName)}Schema.ts`,
	);
	if (!fs.existsSync(schemaFilePath) && schemaName !== 'public') {
		fs.writeFileSync(
			schemaFilePath,
			`import { pgSchema } from 'drizzle-orm/pg-core';\n\nexport const ${camel(schemaName)}Schema = pgSchema('${snake(schemaName)}');\n`,
		);
		const exportStatement = `\nexport * from './${snake(schemaName)}/${camel(schemaName)}Schema';`;
		addToIndexFile(indexFilePath, exportStatement);
		console.log(`Schema file created at ${schemaFilePath}`);
	}
}

function convertToTypescript(
	jsonObject: Record<string, never>,
	tableName: string,
	schemaName?: string,
): string {
	const lines: string[] = [];
	const imports: string[] = [];

	if (schemaName && schemaName !== 'public') {
		const schemaFileName = `${camel(schemaName)}`;
		lines.push(
			`import { ${camel(schemaName)}Schema } from './${schemaFileName}Schema';`,
		);
	} else {
		imports.push('pgTable');
	}

	lines.push(
		// eslint-disable-next-line no-template-curly-in-string
		"import { ${imports} } from 'drizzle-orm/pg-core';",
		'',
		`export const ${camel(tableName)} = ${schemaName && schemaName !== 'public' ? `${camel(schemaName)}Schema.table` : 'pgTable'}('${snake(tableName)}', {`,
	);

	for (const key in jsonObject) {
		if (Object.hasOwn(jsonObject, key)) {
			const value = jsonObject[key];
			const dataType = key === 'id' ? 'uuid' : dataTypeMap[typeof value];
			imports.push(dataType);
			const line = `  ${camel(key)}: ${dataType}('${key}')${dataType === 'uuid' ? '.primaryKey().defaultRandom()' : ''},`;
			lines.push(line);
		}
	}
	lines.push('});');

	return changeFirstItem(lines, imports).join('\n');
}

// Function to find and process all matching JSON files
const files = fs.readdirSync(__dirname);

let createdSchemas = 0;

files.forEach((file) => {
	if (file.endsWith('.to-schema.json')) {
		let [schemaName, tableName] = file.split('.').slice(0, -2);
		const jsonFilePath = path.join(__dirname, file);
		let jsonData: Record<string, never>;

		if (!tableName) {
			tableName = schemaName;
			schemaName = 'public';
		}

		try {
			const fileContent = fs.readFileSync(jsonFilePath, 'utf8');
			jsonData = JSON.parse(fileContent) as Record<string, never>;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.error(`Error reading file '${file}': ${error.message}`);
			throw error;
			// process.exit(1);
		}

		if (Array.isArray(jsonData)) {
			jsonData = jsonData[0] as Record<string, never>;
		}

		const schemaFolderPath = path.join(__dirname, 'schema', snake(schemaName));

		const indexFilePath = path.join(schemaFolderPath, '../', 'index.ts');

		createSchemaFile(schemaName, schemaFolderPath, indexFilePath);

		const typescriptCode = convertToTypescript(jsonData, tableName, schemaName);

		const outputFilePath = path.join(
			schemaFolderPath,
			`${snake(tableName)}.ts`,
		);
		fs.writeFileSync(outputFilePath, typescriptCode);

		console.log(`TypeScript code written to ${outputFilePath}`);
		createdSchemas += 1;
		const exportStatement = `\nexport * from './${snake(schemaName)}/${snake(tableName)}';`;

		addToIndexFile(indexFilePath, exportStatement);
	}
});

if (createdSchemas > 0) {
	console.log(`Were created '${createdSchemas}' schema(s).`);
} else {
	console.error(
		`There is no file found with this pattern: schema_name.table_name.json or just table_name.json, in the last case the table will be created on the public schema.`,
	);
	process.exit(1);
}
