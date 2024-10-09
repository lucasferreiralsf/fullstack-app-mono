/* eslint-disable import/no-import-module-exports */
import { colors } from './src/presentation/styles/colors';
import { fontFamily } from './src/presentation/styles/font-family';

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{ts,tsx}'],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			colors,
			fontFamily,
			boxShadow: {
				'gymclub-1': '0px 4px 26px 0px rgba(0, 0, 0, 0.13)',
				'gymclub-2': '0px 10px 10px -100px rgba(196, 196, 196, 0.3)',
			},
			borderWidth: {
				'0/5': '0.5px',
				1.5: '1.5px',
			},
			spacing: {
				74: '19rem',
				18: '4.5rem',
			},
			flex: {
				2: '2 2 0%',
				3: '3 3 0%',
				4: '4 4 0%',
				5: '5 5 0%',
			},
		},
	},
	plugins: [],
};
