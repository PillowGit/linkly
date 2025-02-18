/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				dark: '#252323',
				light: '#FFF8F0',
				complement: '#FF3A20'
			}
		}
	},

	plugins: []
};
