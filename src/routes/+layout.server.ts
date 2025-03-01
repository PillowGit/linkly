import type { LayoutServerLoad } from './$types';

const excluded_cookies = ['next-auth.csrf-token', 'next-auth.callback-url', 'authjs.callback-url'];

export const load: LayoutServerLoad = async (event) => {
	return {
		session: await event.locals.auth(),
		cookies: event.cookies
			.getAll()
			.filter((cookie) => !excluded_cookies.includes(cookie.name))
			.reduce((obj, item) => Object.assign(obj, { [item.name]: item.value }), {})
	};
};

// See how to load an authenticated vs. unathenticated user here!
// https://authjs.dev/reference/sveltekit#handling-authorization
