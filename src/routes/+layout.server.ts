import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	return {
		session: await event.locals.auth()
	};
};

// See how to load an authenticated vs. unathenticated user here!
// https://authjs.dev/reference/sveltekit#handling-authorization
