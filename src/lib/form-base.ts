import { z } from 'zod';

export const MAX_LENGTH_SHORT_STRINGS = 255;
export const MAX_LENGTH_LARGE_STRINGS = 1000;

const messages = {
	required: 'Campo obrigatório',
	email: 'E-mail inválido',
	uppercase: 'Deve conter ao menos uma letra maiúscula',
	lowercase: 'Deve conter ao menos uma letra minúscula',
	numeric: 'Deve conter ao menos um número',
	symbol: 'Deve conter ao menos um caractere especial',
	url: 'URL inválida',
	max: (max: number) => `Máximo de ${max} caracteres`,
	min: (min: number) => `Mínimo de ${min} caracteres`,
	selects: {
		invalid: 'Selecione uma opção'
	},
	numbers: {
		invalid: 'Número inválido',
		integer: 'Deve ser um número inteiro',
		positive: 'Deve ser um número positivo'
	}
} as const;

const stringDefault = z
	.string({
		required_error: messages.required,
		invalid_type_error: messages.required
	})
	.min(1, messages.required);

const stringShort = stringDefault.max(
	MAX_LENGTH_SHORT_STRINGS,
	messages.max(MAX_LENGTH_SHORT_STRINGS)
);
const stringLarge = stringDefault.max(
	MAX_LENGTH_LARGE_STRINGS,
	messages.max(MAX_LENGTH_LARGE_STRINGS)
);
const stringShortOptional = z
	.string()
	.max(MAX_LENGTH_SHORT_STRINGS, messages.max(MAX_LENGTH_SHORT_STRINGS))
	.optional();
const stringLargeOptional = z
	.string()
	.max(MAX_LENGTH_LARGE_STRINGS, messages.max(MAX_LENGTH_LARGE_STRINGS))
	.optional();

export const urlPattern =
	/^(https?:\/\/|www\.)?(?!([0-9]{1,3}\.){3}[0-9]{1,3})([a-z0-9-]+(\.[a-z0-9-]+)+)(\/[^\s]*)?$/i;

export const base = {
	enums: {},
	booleans: {
		default: z.boolean().default(false)
	},
	selects: {
		default: z
			.string({
				required_error: messages.selects.invalid,
				invalid_type_error: messages.selects.invalid
			})
			.min(1, messages.selects.invalid)
			.max(255, messages.selects.invalid)
	},
	strings: {
		short: stringShort,
		large: stringLarge,
		shortOptional: stringShortOptional,
		largeOptional: stringLargeOptional,
		email: stringShort.email(messages.email),
		password: z
			.string()
			.min(8, messages.min(8))
			.max(255, messages.max(255))
			.refine((v) => /[A-Z]/.test(v), messages.uppercase)
			.refine((v) => /[a-z]/.test(v), messages.lowercase)
			.refine((v) => /[0-9]/.test(v), messages.numeric)
			.refine((v) => /[^A-Za-z0-9]/.test(v), messages.symbol),
		url: stringLarge.refine((v) => urlPattern.test(v), messages.url)
	},
	numbers: {
		default: z.number({
			invalid_type_error: messages.numbers.invalid,
			required_error: messages.required
		}),
		positive: z
			.number({
				invalid_type_error: messages.numbers.invalid,
				required_error: messages.required
			})
			.int(messages.numbers.integer)
			.positive(messages.numbers.positive),
		positiveIncludeZero: z
			.number({
				invalid_type_error: messages.numbers.invalid,
				required_error: messages.required
			})
			.int(messages.numbers.integer)
			.min(0, messages.numbers.positive)
	}
} as const;
