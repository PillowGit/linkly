import { json, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/database/supabase';

export const GET = async (event) => {
	// Verify request info
	const { params } = event;
	const { shortlink } = params;
	if (!shortlink) {
		return json({ error: 'Shortlink is required' }, { status: 400 });
	}

	// Verify session
	const session = await event.locals.auth();
	if (!session) {
		return json({ error: 'You must be logged in' }, { status: 401 });
	}

	// Verify ownership
	const { data: redirectData, error: redirectError } = await supabase
		.from('redirects')
		.select('owner_email, total_visits')
		.match({ id: shortlink });
	if (redirectError) {
		console.error(redirectError);
		return json({ error: 'Server failed to retrieve the redirect' }, { status: 500 });
	}
	if (redirectData.length === 0) {
		return json({ error: 'No redirect found' }, { status: 404 });
	}
	if (redirectData[0].owner_email !== session?.user?.email) {
		return json({ error: 'You do not own this redirect' }, { status: 403 });
	}

	// Get interactions
	const { data, error } = await supabase
		.from('interactions')
		.select('created_on, country')
		.match({ url: shortlink })
		.order('created_on', { ascending: false });

	// Error check
	if (error) {
		console.error(error);
		return json({ error: 'Server failed to retrieve the interactions' }, { status: 500 });
	}

	return json({ data, total_visits: redirectData[0].total_visits }, { status: 200 });
};
