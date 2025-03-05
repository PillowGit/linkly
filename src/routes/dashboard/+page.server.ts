import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import type { Url } from '$lib/types';
import { supabase } from '$lib/database/supabase';
import { generateNewUrl } from '$lib/database/shorten';

interface Data {
	urls: Url[];
}

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();
	if (!session?.user) throw redirect(303, '/');

	const { data, error } = await supabase
		.from('redirects')
		.select()
		.match({ owner_email: session.user.email })
		.order('created_on', { ascending: false });
	if (error) {
		console.error(error);
		return { error: 'An error occurred' };
	}

	return { urls: data };
};

export const actions: Actions = {
	shorten: async (event) => {
		// Get form data
		const { request } = event;
		const session = await event.locals.auth();
		if (!session?.user) throw redirect(303, '/');
		const formData = await request.formData();
		const longUrl = formData.get('longUrl') as string;

		// Verify URL was given
		if (!longUrl) {
			return { error: 'Please enter a URL.' };
		}

		// Check that it's a valid URL
		try {
			new URL(longUrl);
		} catch {
			return { error: 'Please enter a valid URL.' };
		}

		// Get a new url from the database
		const shortUrl = await generateNewUrl(6);

		const url_title = longUrl.split('://')[1].split('/')[0];

		// Insert the new URL into the database
		const { error } = await supabase.from('redirects').insert({
			id: shortUrl,
			destination: longUrl,
			owner_email: session.user.email,
			created_on: new Date().toISOString(),
			title: url_title,
			total_visits: 0
		});

		if (error) {
			console.error(error);
			return { error: `An error occured: ${error.message}` };
		}

	  throw redirect(303, '/dashboard');
	}
};
