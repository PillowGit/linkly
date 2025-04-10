import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/database/supabase';

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
		const ip = request.headers.get('x-forwarded-for') || event.getClientAddress();
		const req = await fetch(`http://ip-api.com/json/${ip}`);
		const geo = await req.json();
		const country = geo?.status === 'fail' ? 'Unknown' : geo?.country;
		await supabase.from('interactions').insert({
			url: shortlink,
			created_on: new Date().toISOString(),
			country,
			ip
		});
		await supabase.rpc('IncrementVisits', { url_id: shortlink });
	})();

	throw redirect(307, data[0].destination);
};
