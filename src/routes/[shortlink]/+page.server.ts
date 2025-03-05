import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/database/supabase';
import geoip from 'geoip-lite';

export const load: PageServerLoad = async (event) => {
	const { params, request } = event;
	const { shortlink } = params;

	const { data, error } = await supabase.from('redirects').select().match({ id: shortlink });

	if (error) {
		console.error(error);
		return { error: 'Server failed to retrieve the redirect' };
	}
	if (data.length === 0) {
		return { error: 'No redirect found' };
	}

	// Don't await these, let them run in the background so the user gets their redirect faster
	(async () => {
		await supabase.from('interactions').insert({
			url: shortlink,
			created_on: new Date().toISOString(),
			country: geoip.lookup(
				request.headers.get('x-forwarded-for')?.split(',')[0] || request.headers.get('remote_addr')
			)?.country
		});
		await supabase.rpc('IncrementVisits', { url_id: shortlink });
	})();

	console.log(data[0].destination);
	throw redirect(308, data[0].destination);
};
