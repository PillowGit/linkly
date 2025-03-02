import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import type { Url } from '$lib/types';

interface Data {
	urls: Url[];
}

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();
	if (!session?.user) throw redirect(303, '/');

	// Fetch data from server here somehow

	const data: Data = { urls: [] };

	data.urls.push({
		id: 'h-3n7Z',
		destination: 'https://linkly.sh',
		title: 'Linkly',
		owner_email: 'example@gmail.com',
		created_on: '2025-03-02T06:31:40.323Z'
	});
	data.urls.push({
		id: 'vhAfCy',
		destination: 'https://vercel.com/',
		title: 'Vercel',
		owner_email: 'example@gmail.com',
		created_on: '2025-03-02T06:32:25.945Z'
	});
	data.urls.push({
		id: '3j5rUn',
		destination: 'https://svelte.dev/',
		title: 'Svelte',
		owner_email: 'example@gmail.com',
		created_on: '2025-03-02T06:32:10.814Z'
	});
	data.urls.push({
		id: 'fh-csuf',
		destination: 'https://fullyhacks.acmcsuf.com/',
		title: 'FullyHacks',
		owner_email: 'example@gmail.com',
		created_on: '2025-03-02T06:31:04.578Z'
	});
	data.urls.push({
		id: 'cyls8b',
		destination: 'https://fullyhacks.acmcsuf.com/',
		title: 'Discord',
		owner_email: 'example@gmail.com',
		created_on: '2025-03-02T06:31:04.578Z'
	});
	data.urls.push({
		id: 'joel',
		destination: 'https://fullyhacks.acmcsuf.com/',
		title: 'jdr.sh',
		owner_email: 'example@gmail.com',
		created_on: '2025-03-02T06:31:04.578Z'
	});

	return data;
};

export const actions: Actions = {
	shorten: async ({ request }) => {
		const formData = await request.formData();
		const longUrl = formData.get('longUrl') as string;

		if (!longUrl) {
			return { error: 'Please enter a URL.' };
		}

		// URL shortening logic here

		return { success: true, shortUrl: 'your-short-url' };
	}
};
