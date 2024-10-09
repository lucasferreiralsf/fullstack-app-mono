export function maskEmail(
	email: string = '',

	showedLength: number = 4,
): string {
	const [localPart, domainPart] = email.split('@');

	if (!localPart || !domainPart) {
		return email;
	}

	// If the local part has only one character, just show it
	if (localPart.length <= showedLength) {
		return `${localPart}@${domainPart}`;
	}

	// Show the first and last character of the local part and mask the rest
	const maskedLocalPart =
		localPart.charAt(0) +
		'*'.repeat(localPart.length - 2) +
		localPart.charAt(localPart.length - 1);

	return `${maskedLocalPart}@${domainPart}`;
}
